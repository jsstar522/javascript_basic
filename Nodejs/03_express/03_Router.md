# 라우터, Router

익스프레스의 가장 큰 무기 중에 하나가 라우터를 편하게 정리하고 편하게 사용할 수 있다는 점입니다.

```javascript
//app.js
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use('/', indexRouter);
app.use('/users', usersRouter);
```

라우팅 미들웨어는 첫번째 인자로 주소를 받고 있습니다. `aap.use('/', indexRouter);`는 `/`주소에 해당하는 요청이 들어왔을 때, `indexRouter`라는 미들웨어가 동작한다는 뜻입니다. `indexRouter`는 `./routes/index`를 불러오고 있습니다. `app.use()`는 해당 URL을 요청할 때 미들웨어가 동작하지만 `app.get()`, `app.post()`…은 HTTP 요청 메서드까지 일치해야 미들웨어가 동작합니다.

```javascript
//routes/index.js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

`index.js`에는 `Get 메서드 '/' 주소`의 요청을 받는 라우터가 있습니다. **주소창에 `localhost:3000/`을 치면 요청이 `app.js`에 있는 미들웨어를 지나 `app.use('/', indexRouter);`에 걸리게 되고  `index.js`의 내용이 나오게 됩니다.**



### next('route')

`next()`중에서도 라우터 미들웨어에서만 사용할 수 있는 `next('route')`가 있습니다. 라우터에 연결된 나머지 미들웨어들을 건너뛰고 URL과 HTTP메서드가 일치하는 라우터로 넘어갑니다. 

```javascript
router.get('/', function(req, res, next){console.log('실행');next('route');}, 
           function(req, res, next){console.log('실행X');next();},		//실행 X 
           function(req, res, next){console.log('실행X');next();});		//실행 X

router.get('/', function(req,res, next){
    console.log('실행');
    res.render('index', { title: 'Express' });
})
```

### :id 패턴

```javascript
router.get('/users/:id', function(req, res){
    console.log(req.params, req.query);
})
```

`/users/`까지 일치하는 모든 요청을 받아들입니다. `/users/12345`, `/users/1`과 같은 모든 요청을 받아들이고 querystring을 포함한 요청도 받아들입니다.

### redirect

redirect는 다른 라우터로 보내는 역할을 합니다. 로그인 완료 후 메인페이지로 가고 싶을 때 자주 사용되는 메서드입니다.

```javascript
router.get('/login', function(req,res){
    console.log('로그인 성공');
    res.redirect('/');    
})
```

