# 몽고디비, MongoDB

몽고디비는 자바스크립트 언어를 사용하는 NoSQL의 대표적인 데이터베이스입니다. 몽고디비는 MySQL과는 다르게 컬렉션(MySQL의 테이블과 상응합니다.)에서 컬럼을 정의하지 않습니다. 즉, 스키마를 정의할 필요가 없습니다. 그렇기 때문에 **하나의 컬렉션에는 어떠한 자료형이나 어떠한 데이터가 들어가도 상관 없습니다.** 



## 몽고디비 설치하고 사용하기

```bash
$ brew install mongodb
$ sudo mkdir -p /data/db
$ sudo mongod
```

```bash
$ brew services start mongodb
$ mongo
> use admin
> db.createUser({user: '사용자 이름', pwd: '비밀번호', roles: ['root']})
```

```bash
$ brew services stop mongodb
$ vi /usr/local/etc/mongod.conf
```

`/usr/local/etc/mongod.conf` 파일에서

```text
security:
	authorization: enabled
```

를 추가합니다.

```bash
$ brew services start mongodb
$ mongo admin -u [사용자 이름] -p [비밀번호]
```

**MySQL은 테이블을 만들 때 어떤 컬럼이 들어가고 자료형은 어떻게 되는지 `CREATE TABLE`로 미리 지정해줬습니다. 하지만 몽고디비는 테이블에 상응하는 컬렉션을 만들어 두기만 하면 document를 넣을 때 자유롭게 넣을 수 있습니다.** 데이터베이스 역시 `CREATE SCHEMA nodejs`처럼 스키마를 따로 생성하지 않아도 `use 데이터베이스`를 사용하고 안에 컬렉션을 저장하면 자동으로 생성됩니다.

```bash
$ mongo
> use nodejs;
> db.users.save({name:'park', age: 26, married: false, comment: '자기소개 입니다.'})
```



## Node에서 몽고디비 사용하기

### 몽구스, Mongoose

MySQL에서 Sequelize를 썼다면 Node에서 몽고디비를 편리하게 사용하기 위해서 몽구스 라이브러리를 사용해야합니다.

```bash
$ express learn-mongoose --view=pug
$ cd learn-mongoose && npm i
$ npm i mongoose
```

몽고디비에서는 스키마가 없어도 되지만 스키마가 없다면 불편한 점이 많기 때문에 스키마를 설정하는 것이 좋습니다. 스키마 폴더를 만들고 먼저 `index.js` 파일에 연결 설정하는 내용을 넣겠습니다.

```javascript
// schemas/index.js

const mongoose = require('mongoose');

module.exports = () => {
  const connect = () => {
    //개발환경이 아닐 때, 몽구스가 생성하는 쿼리내용을 콘솔에 나타냄
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }
    //몽구스와 몽고디비 연결
    mongoose.connect('mongodb: //jsstar522:Js1067827@@@localhost:27017/admin', {
      dbName: 'nodejs',
    }, (error) => {
      if (error) {
        console.log('db연결에러', error);
      } else {
        console.log('db연결성공')
      }
    });
  };
  connect();
  //이벤트 리스너
  mongoose.connection.on('error', (error) => {
    console.error('db연결에러', error);
  });
  mongoose.connection.on('disconnected', () => {
    console.error('연결이 끊어졌습니다. 재연결 합니다.');
    connect();
  });
  //스키마 연결
  require('./user');
  require('./comment');
};

```

이제 미리 연결시켜놓은 user와 comment 스키마를 작성하겠습니다.

```javascript
// schemas/user.js

const mongoose = require('mongoose');

const {Schema} = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  married: {
    type: Boolean,
    required: true,
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
```

```javascript
// schemas/comment.js

const mongoose = require('mongoose');

//ES6비구조화 할당, const Schema = mongoose.Schema;
const {Schema} = mongoose;
//ES6비구조화 할당, const ObjectId = Schema.Types.ObjectId;
const {Types: {ObjectId}} = Schema;
const commentSchema = new Schema({
  commenter: {
    //자료형은 ObjectId, 참조는 User
    type: ObjectId,
    required: true,
    ref: 'User',
    //User의 스키마가 ObjectId로 참조됨
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', commentSchema);
```

몽구스 모듈이 내장하고 있는 `Schema` 생성자 함수를 통해 스키마를 정의했습니다. 이제 CRUD를 수행해보도록 하겠습니다.

## 쿼리 수행하기

먼저 프론트엔드 코드를 작성합니다.

```jade
<!-- view/mongoose.pug -->

doctype html
html
  head
    meta(charset='utf-8')
    title 몽구스 서버
    style.
      table {
        border: 1px solid black;
        border-collapse: collapse;
      }

      table th, table td {
        border: 1px solid black;
      }
  body
    div
      form#user-form
        fieldset
          legend 사용자 등록
          div
            input#username(type="text" placeholder="이름")
          div
            input#age(type="number" placeholder="나이")
          div
            input#married(type="checkbox")
            label(for="married") 결혼 여부
          button(type="submit") 등록
    br
    table#user-list
      thead
        tr
          th 아이디
          th 이름
          th 나이
          th 결혼여부
      tbody
        for user in users
          tr
            td= user._id
            td= user.name
            td= user.age
            td= user.married ? '기혼' : '미혼'
    br
    div
      form#comment-form
        fieldset
          legend 댓글 등록
          div
            input#userid(type="text" placeholder="사용자 아이디")
          div
            input#comment(type="text" placeholder="댓글")
          button(type="submit") 등록
    br
    table#comment-list
      thead
        tr
          th 아이디
          th 작성자
          th 댓글
          th 수정
          th 삭제
      tbody
    script(src='/mongoose.js')
```

이제 버튼에 따라서 요청을 보내는 자바스크립트 코드를 작성하겠습니다.

```javascript
// public/mongoose.js

// 사용자 이름 눌렀을 때 댓글 로딩
document.querySelectorAll('#user-list tr').forEach(function (el) {
  el.addEventListener('click', function () {
    var id = el.querySelector('td').textContent;
    getComment(id);
  });
});
// 사용자 로딩
function getUser() {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      var users = JSON.parse(xhr.responseText);
      console.log(users);
      var tbody = document.querySelector('#user-list tbody');
      tbody.innerHTML = '';
      users.map(function (user) {
        var row = document.createElement('tr');
        row.addEventListener('click', function () {
          getComment(user._id);
        });
        var td = document.createElement('td');
        td.textContent = user._id;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.name;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.age;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.married ? '기혼' : '미혼';
        row.appendChild(td);
        tbody.appendChild(row);
      });
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('GET', '/users');
  xhr.send();
}
// 댓글 로딩
function getComment(id) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 200) {
      var comments = JSON.parse(xhr.responseText);
      var tbody = document.querySelector('#comment-list tbody');
      tbody.innerHTML = '';
      comments.map(function (comment) {
        var row = document.createElement('tr');
        var td = document.createElement('td');
        td.textContent = comment._id;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = comment.commenter.name;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = comment.comment;
        row.appendChild(td);
        var edit = document.createElement('button');
        edit.textContent = '수정';
        edit.addEventListener('click', function () { // 수정 클릭 시
          var newComment = prompt('바꿀 내용을 입력하세요');
          if (!newComment) {
            return alert('내용을 반드시 입력하셔야 합니다');
          }
          var xhr = new XMLHttpRequest();
          xhr.onload = function () {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
              getComment(id);
            } else {
              console.error(xhr.responseText);
            }
          };
          xhr.open('PATCH', '/comments/' + comment._id);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify({ comment: newComment }));
        });
        var remove = document.createElement('button');
        remove.textContent = '삭제';
        remove.addEventListener('click', function () { // 삭제 클릭 시
          var xhr = new XMLHttpRequest();
          xhr.onload = function () {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
              getComment(id);
            } else {
              console.error(xhr.responseText);
            }
          };
          xhr.open('DELETE', '/comments/' + comment._id);
          xhr.send();
        });
        td = document.createElement('td');
        td.appendChild(edit);
        row.appendChild(td);
        td = document.createElement('td');
        td.appendChild(remove);
        row.appendChild(td);
        tbody.appendChild(row);
      });
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('GET', '/comments/' + id);
  xhr.send();
}
// 사용자 등록 시
document.getElementById('user-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var name = e.target.username.value;
  var age = e.target.age.value;
  var married = e.target.married.checked;
  if (!name) {
    return alert('이름을 입력하세요');
  }
  if (!age) {
    return alert('나이를 입력하세요');
  }
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 201) {
      console.log(xhr.responseText);
      getUser();
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('POST', '/users');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ name: name, age: age, married: married }));
  e.target.username.value = '';
  e.target.age.value = '';
  e.target.married.checked = false;
});
// 댓글 등록 시
document.getElementById('comment-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var id = e.target.userid.value;
  var comment = e.target.comment.value;
  if (!id) {
    return alert('아이디를 입력하세요');
  }
  if (!comment) {
    return alert('댓글을 입력하세요');
  }
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status === 201) {
      console.log(xhr.responseText);
      getComment(id);
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('POST', '/comments');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ id: id, comment: comment }));
  e.target.userid.value = '';
  e.target.comment.value = '';
});
```

AJAX로 요청을 보냅니다. 이제 이 자바스크립트 코드를 통해 요청이 라우터로 이동합니다. 이제 요청이 통과할 라우터를 작성합니다. 먼저 `/`경로에 GET요청을 받는 라우터를 `index.js`파일에 작성하겠습니다. `/`경로에는 위에서 작성한 `view/mongoose.pug` 템플릿 파일을 보여줄겁니다.

```javascript
// routes/index.js

var express = require('express');
var User = require('../schemas/user');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //User에서 find, users를 넘겨받아서 mongoose에 대입
  User.find({})
    .then((users) => {
      res.render('mongoose', {users});
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
```

`User.find`가 쿼리를 만드는 부분입니다. 이제 사용자를 등록하고 불러오는 `/users`경로의 라우터를 만들겠습니다.

```javascript
// routes/users.js

var express = require('express');
var User = require('../schemas/user');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.post('/', function(req, res, next) {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married,
  });
  user.save()
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports= router;
```

`/users` 경로에 GET과 POST 메서드로 요청이 들어왔을 때 처리하는 내용입니다. `/comments` 경로에 대한 라우터도 작성합니다.

```javascript
// routes/comments.js

var express = require('express');
var Comment = require('../schemas/comment');

var router = express.Router();

router.get('/:id', function(req, res, next) {
  //JOIN하는 부분, ref('User')로 되어 있으므로 id와 commenter를 합쳐서 새로운 다큐먼트를 만든다.
  Comment.find({ commenter: req.params.id }).populate('commenter')
    .then((comments) => {
      console.log(comments);
      res.json(comments);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
router.post('/', function(req, res, next){
  const comment = new Comment({
    commenter: req.body.id,
    comment: req.body.comment,
  });
  comment.save()
    .then((result) => {
      return Comment.populate(result, {path: 'commenter'});
    })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
router.patch('/:id', function(req, res, next) {
  Comment.update({_id: req.params.id}, {comment: req.body.comment})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
router.delete('/:id', function(req, res, next) {
  Comment.delete({_id: req.params.id})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
```

이제 라우터를 서버에 부착해야합니다.

```javascript
//app.js

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentsRouter = require('./routes/comments');
var connect = require('./schemas');

var app = express();
//디비연결
connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

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

module.exports = app;
```

이제 디비를 켠 뒤, 서버를 실행합니다.

```bash
$ mongod
```



#### Error Note

* Comment Post 에러: users id를 그대로 긁어서 복사했더니 뒤에 //t(공백)가 붙어서 id를 찾을 수 없다는 오류 발생