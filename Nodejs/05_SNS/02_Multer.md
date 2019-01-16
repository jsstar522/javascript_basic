# Multer

Multer는 이미지 업로드를 편리하게 가능하게 해주는 라이브러리입니다. 다음과 같이 설치할 수 있습니다.

```bash
$ npm i multer
```

로그인이 되면 게시글을 작성할 수 있는 템플릿 엔진, `main.pug`이 렌더링 됩니다. `main.pug`은 `/post`경로의 `post`메서드로 연결됩니다. 라우터를 작성하겠습니다.

```javascript
// routes/post.js

const fs = require('fs');

const { Post, Hashtag, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// uploads 폴더 생성(1)
fs.readdir('uploads', (error) => {
  if(error){
    console.error('uploads 폴더가 없어 upload 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
});

// 경로 설정 및 파일 이름 설정(2)
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb){
      cb(null, 'uploads/');
    },
    filename(req, file, cb){
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
// 이미지 업로드 처리(3)
router.post('/img', isLoggedIn, upload.single('img'), (req, res) =>{
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}`});
})
// 게시글 업로드 처리(4)
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async(req, res, next) =>{
  try{
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      userId: req.user.id,
    });
    //해쉬태그
    const hashtags = req.body.content.match(/#[^\s]*/g);
    if(hashtags){
      const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
        where: { title: tag.slice(1).toLowerCase() },
      })));
      await post.addHashtags(result.map(r => r[0]));
    }
    res.redirect('/');
  }catch(error){
    console.error(error);
    next(error);
  }
});

module.exports = router;
```

* (1): uploads 폴더가 있는지 확인하고 없다면 새롭게 생성합니다.
* (2): `const upload = multer()`에 옵션을 부여했습니다. `storage`와 `limits` 옵션 두가지를 줬습니다. storage에서는 경로와 저장방식, 파일이름을 설정할 수 있습니다. `diskStorage`는 서버디스크에 저장하겠다는 뜻입니다. `destination`으로 저장될 경로를 설정했습니다. `filename`은 파일명을 설정하는 메서드입니다. originalname을 받아온 뒤 날짜와 확장자(path.extname)을 붙이도록 설정했습니다. `limit`은 이미지 파일 허용치를 의미합니다.
* (3): 이미지 업로드를 처리하는 방식(메서드)은 여러가지가 있습니다.
  *  `single` : 하나의 이미지를 업로드할 때 사용합니다. 이미지는 생성된 `req.file` 객체로 가고, 나머지 정보는 `req.body`로 갑니다.
  *  `array` : 여러개의 이미지를 업로드할 때 사용됩니다. 이미지들은 생성된 `req.files` 객체로 가고, 나머지 정보들은 `req.body`로 갑니다.
  * `fields` : array와 같지만 body에 여러개의 정보가 한번에 들어가지 않고 각각 하나씩 따로 들어갑니다.
  * `none` : 데이터만 multipart 형식으로 저장할 때 사용합니다.
* (4): 게시글 업로드를 처리하는 방식은 `none`으로 처리합니다. `img: req.body.url`은 이미지의 경로를 의미합니다.

이제 라우터에 multer 기능을 추가합니다. 게시글을 담아둔 데이터베이스(/model/post)도 연결해서 화면에 보여줍니다.

```javascript
// routes/page.js

const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');

const router = express.Router();

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', {title: '내 정보', user: req.user});
})

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: '회원가입',
    user: req.user,
    joinError: req.flash('joinError')
  });
});       

router.get('/', (req, res, next) => {
  Post.findAll({
    include: {
      model: User,
      attributes: ['id', 'nick'],
    },
    order: [['createdAt', 'DESC']],
  })
    .then((posts) => {
      res.render('main', {
        title: 'SNSApp',
        twits: posts,
        user: req.user,
        loginError: req.flash('loginError'),
      });
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

module.exports = router;
```



## 해쉬태그 검색

게시글 부분에서 검색 후, 게시글을 검색어에 맞게 다시 업데이트 해야하므로 `/route/post.js`를 수정해줘야 합니다.

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// uploads 폴더 생성
fs.readdir('uploads', (error) => {
  if(error){
    console.error('uploads 폴더가 없어 upload 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
});

// 경로 설정 및 파일 이름 설정
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb){
      cb(null, 'uploads/');
    },
    filename(req, file, cb){
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
// 이미지 업로드 처리
router.post('/img', isLoggedIn, upload.single('img'), (req, res) =>{
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}`});
})
// 게시글 업로드 처리
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async(req, res, next) =>{
  try{
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      userId: req.user.id,
    });
    // 해쉬태그
    const hashtags = req.body.content.match(/#[^\s]*/g);
    if(hashtags){
      const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
        where: { title: tag.slice(1).toLowerCase() },
      })));
      await post.addHashtags(result.map(r => r[0]));
    }
    res.redirect('/');
  }catch(error){
    console.error(error);
    next(error);
  }
});

//해쉬태그 검색
router.get('/hashtag', async(req, res, next) => {
  const query = req.query.hashtag;
  if(!query){
    return res.redirect('/');
  }
  try{
    const hashtag = await Hashtag.find({ where: { title: query }});
    let posts = [];
    if (hashtag){
      posts = await hashtag.getPosts({ include: [{ model: User }]});
    }
    return res.render('main', {
      title: `${query} | SNSApp`,
      user: req.user,
      twits:posts,
    });
  }catch(error){
    console.error(error);
    return next(error);
  }
});

module.exports = router;
```

쿼리스트링으로 hashtag를 받습니다. 비어있는 경우 `/`으로 보내고 hashtag가 있는 경우 시퀄라이즈에서 제공하는 `getPosts` 메서드로 해당 게시글을 모두 불러옵니다. 그리고 해당 게시글만 렌더링합니다.

## 팔로우 기능

`/routes/user.js`에 라우터를 추가합니다.

```javascript
const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async(req, res, next) => {
  try{
    const user = await User.find({ where: { id: req.user.id }});
    await user.addFollowing(parseInt(req.params.id, 10));
    res.send('success');
  }catch(error){
    console.error(error);
    next(error);
    }
  }
});

module.exports = router;
```

팔로우할 사용자를 데이터베이스에서 검색한 뒤, 시퀄라이즈에서 만들어 둔 `addFollowing` 메서드로 나와의 관계를 지정합니다(https://github.com/jsstar522/javascript_basic/blob/master/Nodejs/05_SNS/01_SNSApp.md `models/index.js` 참고). 이제 관계를 설정했으니 팔로워와 팔로잉 목록을 req.user에 저장합니다. req.user을 바꾸려면 `deserializeUser`을 조작합니다.

```javascript
// passport/index.js

const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.find({ 
      where: { id },
      include: [{
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followers',
      },{
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followings',
      }],
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local(passport);
  kakao(passport);
};
```

세션에 있는 아이디로 사용자 정보를 조회할 때, 팔로잉 목록과 팔로워 목록을 함께 조회하는 것입니다. `id`와 `nick`으로 조회합니다.  이제 게시글 라우터(`routes/post.js`)와 팔로잉 라우터(`routes/user.js`)를 `app.js`에 연결합니다.

```javascript
// app.js
//..
//추가

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

app.use('/img', express.static(path.join(__dirname, 'uploads')));

app.use('/post', postRouter);
app.use('/user', userRouter);
```

