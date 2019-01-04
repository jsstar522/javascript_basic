var express = require('express');
var router = express.Router();

// //next('route') 예시
// router.get('/', function(req, res, next){console.log('실행');next('route');}, 
//            function(req, res, next){console.log('실행X');next();},		//실행 X 
//            function(req, res, next){console.log('실행X');next();});		//실행 X

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('실행');
  // res.render('index', { title: 'Express' });
  res.render('test');
});

module.exports = router;
