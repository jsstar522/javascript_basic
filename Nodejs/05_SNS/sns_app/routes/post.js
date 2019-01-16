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