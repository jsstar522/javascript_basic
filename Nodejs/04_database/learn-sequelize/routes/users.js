var express = require('express');
var router = express.Router();
var User = require('../models').User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
/* POST users list */
router.post('/', function(req, res, next){

  User.create({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married,
  }).then((result => {
      console.log(result);
      res.status(201).json(result);
    }))
    .catch((err) => {
      console.error(err);
      next(err);
    });
})

module.exports = router;
