# API

**API(Application Programming Interface)는 다른 어플리케이션에서 현재 프로그램의 기능을 사용할 수 있게 해줍니다.** 특히 `웹 API`는 다른 웹 서비스의 기능을 사용하거나 자원을 가져올 수 있게 해줍니다. 자신이 만든 웹페이지에서 카카오 계정으로 로그인을 할 수 있게 만드는건  카카오API가 존재하기 때문입니다. API는 특정 기능만 사용할 수 있도록 열어놓을 수도 있고 특정 사람들만 정보를 가져가게 열어둘 수도 있습니다. 

## API 만들기

여기서 만들 API 서버는 토큰 인증을 통해서 JSON파일 형태로 데이터베이스에 있는 내용을 전달할 예정입니다. 설치해야할 모듈을 `package.json`에 넣고 `npm i`로 한번에 설치합니다.

```json
{
  "name": "sns_app-api",
  "version": "0.0.1",
  "description": "sns_app API 서버",
  "main": "app.js",
  "scripts": {
    "start": "nodemon app",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "jsstar522",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^2.0.1",
    "connect-flash": "^0.1.1",
    "cookie-parser": "^1.4.3",
    "dotenv": "^5.0.1",
    "express": "^4.16.2",
    "express-session": "^1.15.6",
    "morgan": "^1.9.0",
    "mysql2": "^1.5.1",
    "passport": "^0.4.0",
    "passport-kakao": "0.0.5",
    "passport-local": "^1.0.0",
    "pug": "^2.0.1",
    "sequelize": "^4.31.2",
    "uuid": "^3.1.0"
  },
  "devDependencies": {
    "nodemon": "^1.14.11"
  }
}
```

SNSApp을 만들었던 config, models, passport 폴더를 모두 복사해서 옮겨옵니다. routes폴더에는 `auth.js`와 `middlewares.js`만 복사해서 옮겨옵니다. 그리고 `.env`파일도 복사해서 옮겨옵니다. 이제 views 폴더를 만들고 에러를 띄우는 `error.pug` 를 생성합니다.

```jade
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const { sequelize } = require('./models');
const passportConfig = require('./passport');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes');

const app = express();
sequelize.sync();
passportConfig(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8002);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/', indexRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
```

이제 도메인 주소를 받아서 저장하는 시퀄라이즈를 작성하겠습니다. **도메인을 사용하는 이유는 등록한 도메인에서만 API를 사용할 수 있게 하기 위해서 입니다.**

```javascript
// models/domain.js

module.exports = (sequelize, DataTypes) => (
  sequelize.define('domain', {
    host: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    clientSecret: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
  }, {
    validate: {
      unknownType() {
        console.log(this.type, this.type !== 'free', this.type !== 'premium');
        if(this.type !== 'free' && this.type !== 'premium'){
          throw new Error('type 컬럼은 free나 premium이어야 합니다.');
        }
      },
    },
    timestamps: true,
    paranoid: true,
  })
);
```

도메인의 모델을 정의했습니다. `validation`은 데이터를 검증하는 속성입니다. unknownType이라는 함수를 만들어서 Type이 지정되어 있지 않을 때 오류를 띄웁니다. 이제 모델을 정리하는 `models/index.js`에 도메인 모델을 추가합니다.

```javascript
// models/index.js

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Domain = require('./domain')(sequelize, Sequelize);

//관계정의(User-Post)
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);
//관계정의(Post-Hashtag)
db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'});
//관계정의(Following-Follower) N:M
db.User.belongsToMany(db.User, {
  foreignKey: 'followingId',
  as: 'Followers',
  through: 'Follow',
});
db.User.belongsToMany(db.User, {
  foreignKey: 'followerId',
  as: 'Followings',
  through: 'Follow',
});

//관계정의(도메인)
db.User.hasMany(db.Domain);
db.Domain.belongsTo(db.User);

module.exports = db;
```

사용자 한명이 많은 도메인을 갖을 수 있으므로 일대다 관계를 갖습니다. 이제 로그인 창을 템플릿 엔진으로 만듭니다.

```jade
<!--views/login-->
doctype
html
  head
    meta(charset='utf-8')
    title SNS APP 로그인
    style.
      .input-group label {
        width: 200px;
        display: inline-block;
      }
  body
    if user && user.id
      span.user-name= '안녕하세요! ' + user.nick + '님'
      a(href='/auth/logout'): button 로그아웃
      fieldset
        legend 도메인 등록
        form(action='/domain' method='post')
          div
            label(for='type-free') 무료
            input#type-free(type='radio' name='type' value='free')
            label(for='type-premium') 프리미엄
            input#type-premium(type='radio' name='type' value='premium')
          div
            label(for='host') 도메인
            input#host(name='host' placeholder="ex) zerocho.com")
          button 저장
      table
        tr
          th 도메인 주소
          th 타입
          th 클라이언트 비밀키
        for domain in user.domains
          tr
            td= domain.host
            td= domain.type
            td= domain.clientSecret

    else
      form#login-form(action='/auth/login' method='post')
        h2 SNS APP 계정으로 로그인하세요.
        .input-group
          label(for='email') 이메일
          input#email(type='email' name='email' required autofocus)
        .input-group
          label(for='password') 비밀번호
          input#password(type='password' name='password' required)
        if loginError
          .error-message= loginError
        a(href='/auth/join'): button#join(type='button') 회원가입
        button#login(type='submit') 로그인
```

이어서 요청을 처리하는 라우터를 만들겠습니다.

```javascript
// routes/index.js

const express = require('express');
const uuidv4 = require('uuid/v4');
const { User, Domain } = require('../models');

const router = express.Router();

router.get('/', (req, res, next) => {
  User.find({
    where: { id: req.user & req.user.id },
    include: { model: Domain },
  })
    .then((user) => {
      res.render('login', {
        user,
        loginError: req.flash('loginError'),
        domain: user && user.domains,
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/domain', (req, res, next) => {
  Domain.create({
    userId: req.user.id,
    host: req.body.host,
    type: req.body.type,
    clientSecret: uuidv4(),
  })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
```

메인페이지(`/`)를 보여주는 라우터와 도메인을 받는(POST) 라우터까지 설정했습니다. **`uuid` 모듈은 `범용 고유 식별자`로  고유한 문자열을 만들어 줍니다. 이제 서버를 실행하고 로그인 한 후 도메인을 부여받으면 됩니다.** 로그인을 하면 다음과 같은 창이 뜹니다.

![API_login](API_login.png)



무료 도메인과 프리미엄 도메인은 나중에 사용량 제한을 구현할 때 사용됩니다. 위와 같이 로그인 이후에 `localhost:8003`을 도메인으로 등록합니다.

## 토큰 인증

**데이터베이스의 데이터를 다른 클라이언트(API)에서 가져가기 때문에 별도의 인증이 필요합니다.** JSON Web Token, `JWT토큰`을 이용합니다. JWT는 각각 다른 내용을 담고 있는 `헤더(토큰 종류와 해쉬 알고리즘)`, `페이로드(인코딩 된 토큰의 내용물)`, `시그니처(변조 여부를 확인할 수 있는 일련의 문자열)`로 나뉩니다. JWT 토큰은 비밀키로 되어 있습니다. https://jwt.io에서 비밀키로 되어 있는 JWT 토큰의 내용을 볼 수 있습니다. 매 요청시 데이터베이스를 매번 조회할 필요 없이, JWT토큰을 통해 권한, 사용자 이름 등을 조회합니다. **하지만 매번 random string을 부여해서 데이터베이스를 매번 조회하는 것이 때때로 효과적일 때도 있습니다.** 

```bash
$ npm i jsonwebtoken
```

`./env`에 JWT토큰 내용을 추가합니다.

```text
COOKIE_SECRET=SNSappsecret
KAKAO_ID=0b334c621057bdd690dda7c02d49a795
JWT_SECRET=jwtSecret
```

이제 사용자가 API를 사용하려면 JWT토큰을 발급받아야 합니다. **모든 사용자가 미들웨어를 거쳐 토큰을 발급받도록 합니다.**

```javascript
// routes/middlewares.js

const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
      next();
  }else{
      res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){
      next();
  }else{
      res.redirect('/');
  }
};

exports.verifyToken = (req, res, next) => {
    try{
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch(error){
        if(error.name === 'TokenExpiredError'){ //유효기간 초과
            return res.status(419).json({
                code: 419,
                message: '토큰 만료',
            });
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다',
        });
    }
};
```

인증과정을 미들웨어에 장착했습니다. `jwt.verify`는 토큰을 검증하는 메서드입니다. 첫번째 인자는 토큰정보, 두번째 인자는 토큰의 비밀키입니다. `req.headers.authorization`로 토큰정보를 뽑아내므로 요청의 header에 토큰을 심어주면 되겠죠. 토큰의 내용은 `req.decoded`에 넣어뒀습니다. 이제 토큰 발급 라우터를 작성합니다. 

```javascript
// routes/v1.js

const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken } = require('./middlewares');
const { Domain, User, Post, Hashtag } = require('../models');

const router = express.Router();

router.post('/token', async (req, res) => {
  const { clientSecret } = req.body;
  try{
    const domain = await Domain.find({		//도메인 등록 확인
      where: { clientSecret },
      include: {
        model: User,
        attribute: ['nick', 'id'],
      },
    });
    if(!domain){
      return res.status(401).json({
        code: 401,
        message: '등록되지 않은 도메인입니다. 도메인을 등록하세요.',
      });
    }
    const token = jwt.sign({		//토큰발급
      id: domain.user.id,
      nick: domain.user.nick,
    }, process.env.JWT_SECRET, {
      expiresIn: '1m',  //1분
      issuer: 'SNSApp',
    });
    return res.json({
      code: 200,
      message: '토큰발급이 완료되었습니다.',
      token,
    });
  } catch(error){
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '서버 에러',
    });
  }
});

router.get('/test', verifyToken, (req, res) => {
  res.json(req.decoded);
});

module.exports = router;
```

라우터에 버전을 붙여서 기존에 API를 사용하고 있는 유저들에게 오작동을 일으키지 않도록 합니다. 

* 등록된 도메인인지 먼저 확인합니다(`Domain.find()`)
* 등록된 도메인이라면 토큰을 발급합니다(`jwt.sign()`)
  * 첫번째 인자: 토큰의 내용
  * 두번째 인자: 토큰의 비밀키
  * 세번째 인자: 토큰 설정 (만료일, 발급자)

* `/test`경로로 발급받은 토큰을 확인해볼 수 있습니다.

이제 서버에 연결합니다.

```javascript
// app.js
//...
//추가

const v1 = require('./routes/v1');

app.use('v1', v1);

//...
```

## 호출서버

API를 사용하는 호출서버를 만듭니다. 호출서버는 위에서 만들어 놓은 API를 이용해서 데이터를 가져오는 역할을 합니다(가상의 사용자를 만드는 것입니다). 아래의 `package.json`을 저장하고 `npm i`로 설치합니다.

```json
{
  "name": "sns_app-call",
  "version": "0.0.1",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "nodemon app",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "jsstar522",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.17.1",
    "cookie-parser": "^1.4.3",
    "dotenv": "^5.0.1",
    "express": "^4.16.2",
    "express-session": "^1.15.6",
    "morgan": "^1.9.0",
    "pug": "^2.0.0-rc.4"
  },
  "devDependencies": {
    "nodemon": "^1.14.11"
  }
}
```

서버를 만듭니다.

```javascript
// app.js

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

const indexRouter = require('./routes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8003);

app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use('/', indexRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.local.message = err.message;
  res.local.error = req.app.get('env') === 'development' ? err: {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트 대기 중');
});
```

에러를 표시할 템플릿 엔진을 만듭니다.

```jade
<!-- views/error.pug -->
h1= message
h2= error.status
pre #{error.stack}
```

비밀키를 넣어두는 `.env` 파일에 위에서 발급 받은 clientSecret을 넣습니다. 

```text
COOKIE_SECRET=SNSappsecret
CLIENT_SECRET=3eef7bf5-fde8-46fb-ab6e-f11a0779d059
```

**이렇게 내가 만드는 웹 페이지에서 다른 웹 페이지의 API를 사용할 수 있고 데이터도 가져올 수 있습니다.** 이제 토큰이 정상적으로 인증되는지 확인하기 위해서 라우터를 작성하겠습니다.

```javascript
// routes/index.js

const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/test', async(req, res, next) => {
  try{
    if(!req.session.jwt){   //세션에 토큰이 없을 경우
      const tokenResult = await axios.post('http://localhost:8002/v1/token', {
        clientSecret: process.env.CLIENT_SECRET,
      });
      if (tokenResult.data && tokenResult.data.code == 200){
        req.session.jwt = tokenResult.data.token;   //세션에 토큰 저장
      }else{
        return res.json(tokenResult.data);        //토큰 발급 에러
      }
    }
    //발급받은 토큰 테스트
    const result = await axios.get('http://localhost:8002/v1/test', {
      headers: { authorization: req.session.jwt },
    });
    return res.json(result.data);
  }catch(error) {
    console.error(error);
    if(error.response.status === 419){    //토큰 만료시 에러
      return res.json(error.response.data);
    }
    return next(error);
  }
});

module.exports = router;
```

* `/test` 경로 요청 라우터입니다. 두가지로 나뉩니다. 첫번째는 세션에 토큰을 찾지 못하면 `http://localhost:8002/v1/token` 경로로 `POST` 요청을 보내고 결과값을 `tokenResult`에 저장합니다. `axios.post(경로, { 데이터 })`는 경로에 POST 요청을 보내면서 본문에 데이터를 함께 보냅니다. 이 경우는 **발급받은 clientSecret을 함께 보내면서 API 서버의 `v1.js`에서 해당 도메인이 있는지 clientSecret으로 확인합니다.**

* 세션에서 토큰을 찾아냈다면 `http://localhost:8002/v1/test`경로로 `GET` 요청을 보내고 결과값을 반환합니다. `axios.get(경로, { 헤더 })`는 경로에 GET 요청을 보내면서 헤더와 함께 보냅니다. 이 경우는 **헤더에 세션의 토큰을 담아서 요청하는 것입니다.** 

이제 서버를 실행시키고 `localhost:8003/test`으로 접근하면 토큰이 발급된 것을 확인할 수 있습니다.

![token](token.png)

1분 뒤에 새로고침을 하면 토큰이 사라진 것을 볼 수 있습니다. 이제 API를 이용해서 내가 올린 게시글과 해쉬태그를 받아오도록 하겠습니다. 다시 API 서버로 이동해서 데이터를 제공해주는 라우터를 추가하겠습니다.

```javascript
// sns_app-api/routes/v1.js
//...
//추가
router.get('/posts/hashtag/:title', verifyToken, async(req,res) => {
  try{
    const hashtag = await Hashtag.find({ where: { title: req.params.title }});
    if(!hashtag){
      return res.status(404).json({
        code: 404,
        message: '검색 결과가 없습니다',
      });
    }
    const posts = await hashtag.getPosts();
    return res.json({
      code: 200,
      payload: posts,
    });
  } catch(error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '서버 에러',
    });
  }
});
```

`localhost:8002/posts/hashtag/:title`에서 제공하는 게시글과 해쉬태그의 데이터를 `localhost:8003/mypost`와 `localhost:8003/search/[해쉬태그이름]`으로 각각 접근하면 데이터를 가져올 수 있도록 서버를 다시 설정합니다.

```javascript
// sns_app-call/routes/index.js

const express = require('express');
const axios = require('axios');

const router = express.Router();
const URL = 'http://localhost:8002/v1';

const request = async(req, api) => {
  try{
    if(!req.session.jwt){   //세션에 토크이 없을 경우
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      req.session.jwt = tokenResult.data.token;   //세션에 토큰 저장
    }
    return await axios.get(`${URL}${api}`, {
      headers: {authorization: req.session.jwt },
    }); //API 요청
  }catch(error){
    console.error(error);
    if(error.response.status < 500){
      return error.response;
    }
    throw error;
  }
};

router.get('/mypost', async(req, res, next) => {
  try{
    const result = await request(req, '/posts/my');
    res.json(result.data);
  }catch(error){
    console.error(error);
    next(error);
  }
});

router.get('/search/:hashtag', async(req, res, next) => {
  try{
    const result = await request(
      req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`,
    );
    res.json(result.data);
  }catch(error){
    if(error.code){
      console.error(error);
      next(error);
    }
  }
});

module.exports = router;
```

