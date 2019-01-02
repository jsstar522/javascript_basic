# 메인파일(Default)

**서버를 실행하는 커멘드 `npm start`를 사용하면 `bin/www`파일이 가장 먼저 실행됩니다.** 처음 존재하는 주석은 모두 지우고 자세한 설명들을 추가해보겠습니다.

```javascript
//www

#!/usr/bin/env node

var app = require('../app');				//app 모듈을 가져옵니다. app.js파일 안에는 app = express();로 익스프레스 모듈을 선언했습니다.
var debug = require('debug')('project1:server');	//콘솔에 로그를 남기는 모듈입니다. 프로젝트 이름과 함께 로그를 남깁니다.
var http = require('http');					//http모듈을 가져옵니다.

var port = normalizePort(process.env.PORT || '3000');		//process.env.PORT가 있다면 그 포트번호를 사용하고 아니면 3000번을 사용합니다.
app.set('port', port);						//서버가 실행되는 포트를 설정합니다. app.set(key,value)로 데이터를 저장합니다. app.get(key)로 value를 불러올 수 있습니다.

var server = http.createServer(app);		//app모듈과 함께 서버를 만듭니다. app모듈이 콜백함수 역할을 합니다.

server.listen(port);						//포트를 연결하고 서버를 실행합니다. 
server.on('error', onError);				//listen 메서드의 콜백함수 역할을 합니다.(이벤트 리스너)
server.on('listening', onListening);		//listen 메서드의 콜백함수 역할을 합니다.(이벤트 리스너)

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

```

`bin/www`파일은 확장자가 붙어 있지 않습니다. 대신 내용 맨 위에 `#!/usr/bin/env node`라는 주석이 달려있습니다. 이는 환경변수 경로에서 node를 찾아 node의 언어로 실행한다는 의미입니다. 이를 쉬뱅(shebang)이라고 합니다. 

이제 `www`파일 안에서 사용하는 사용하는 `app.js` 파일을 살펴보겠습니다. **서버를 만들 때(`http.createServer`) app 모듈이 콜백함 수 역할을 하므로 이 파일이 실질적인 서버 동작의 내용을 담고 있습니다.**

```javascript
//app.js

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();					//express 호출, app 변수객체로 express 기능사용

// view engine setup
app.set('views', path.join(__dirname, 'views'));		//app.set은 express 앱 설정
app.set('view engine', 'pug');

app.use(logger('dev'));									//app.use은 미들웨어 연결하는 부분
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;								//모듈화
```

`express`는 최상위 **함수**로 선언되어 있습니다. 따라서 express안에 있는 함수를 사용하기 위해서는 **변수객체**를 만들어서 사용해야 합니다.

```javascript
var app = express();
app.set();
app.use();
express().use();	// X
```

* `app.set`은 익스프레스 앱을 설정하는 함수입니다. `view engine`라는 앱으로 템플릿 파일들이 위치한  `views` 폴더를 가르키고 있습니다. 
* `app.use`은 익스프레스 미들웨어를 설정하는 함수입니다. **익스프레스 프레임워크는 이렇게 요청과 응답 사이에 미들웨어들을 거치도록 만들어줍니다.** 

