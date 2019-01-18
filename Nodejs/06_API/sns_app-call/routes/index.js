const express = require('express');
//axios: 다른주소로 요청을 보내는 모듈
const axios = require('axios');

const router = express.Router();
const URL = 'http://localhost:8002/v2';

const request = async(req, api) => {
  try{
    if(!req.session.jwt){    //(1): 현재 요청의 세션에 토큰이 없으면 발급
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      req.session.jwt = tokenResult.data.token;   //세션에 토큰 저장
    }
    return await axios.get(`${URL}${api}`, {
      headers: { authorization: req.session.jwt },
    });     //(2): 토큰확인(test), 게시글확인(posts), 해쉬태그확인(posts/hashtag/:title)에 따라서 다른 경로 접근
  }catch(error){
    console.error(error);
    if(error.response.status < 500){
      return error.response;
    }
    throw error;
  }
};

router.get('/test', async(req, res, next) => {
  try{
    const result = await request(req, '/test');
    res.json(result.data);
  }catch(error){
    console.error(error);
    next(error);
  }
})

//게시글을 확인하는 라우터
router.get('/mypost', async (req, res, next) => {
  try {
    const result = await request(req, '/posts/my');
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//해쉬태그를 확인하는 라우터
router.get('/search/:hashtag', async(req, res, next) => {
  try{
    const result = await request(req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`)   //(4): 요청중에서 쿼리스트링 중 hashtag에 해당하는 값을 포함해 요청을 보냄
    res.json(result.data);
  }catch(error) {
    if(error.code){
      console.log(error);
      next(error);
    }
  }
});

router.get('/', (req, res) => {
  res.render('main', { key: process.env.CLIENT_SECRET});
});

module.exports = router;