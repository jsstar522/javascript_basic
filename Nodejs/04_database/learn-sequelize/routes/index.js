var express = require('express');
//데이터베이스 내용
var User = require('../models').User;

var router = express.Router();

// async/await로 작성
router.get('/', async(req, res, next) => {
  try{
      const users = await User.findAll();
      res.render('sequelize', {users});
  }catch(err){
      console.error(err);
      next(err);
  }
});

module.exports = router;
