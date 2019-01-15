# MySQL App 만들기

## 시퀄라이저 쿼리

MySQL 예약어를 다음과 같은 시퀄라이즈 쿼리로 작성할 수 있습니다.

```javascript
//MySQL
//INSERT INTO nodejs.users(name, age, married, comment) VALUES ('park', 26, 0, '자기소개하기');

const{User} = require('../models')
User.create({
    name: 'park',
    age: 26,
    married: false,
    comment: '자기소개하기',
})
```

```javascript
//MySQL
//SELECT * FROM nodejs.users;

const{User} = require('../models')
User.findAll({});
```

```javascript
//MySQL
//SELECT * FROM nodejs.users LIMIT 1;
//하나만 가져오기

const{User} = require('../models')
User.find({});
```

```javascript
//MySQL
//SELECT name,married FROM nodejs.users;

const{User} = require('../models')
User.find({
    attributes: ['name', 'married'],
});
```

```javascript
//MySQL
//SELECT name,married FROM nodejs.users WHERE age>25;

const{User, Sequelize: {Op}} = require('../models')
User.find({
    attributes: ['name', 'married'],
    where: {
        age: {[Op.gt]: 25},
    },
});
```

```javascript
//MySQL
//SELECT name,married FROM nodejs.users WHERE married =0 or age>25;

const{User, Sequelize: {Op}} = require('../models')
User.find({
    attributes: ['name', 'married'],
    where: {
        [Op.or]: [{married: 0}, {age: {[Op.gt]: 25}}],
    },
});
```

`[Op.or]:...`와 `[Op.gt]:25`는 ES6에서 유효한 문법입니다. 객체 내부에서 새로운 속성을 정의할 수 있습니다.



## CRUD 구현하기

먼저 프론트엔드 코드를 작성합니다.

```jade
<!-- views/sequelize.pug -->

doctype html
html
  head
    meta(charset='utf-8')
    title 시퀄라이즈 서버
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
            td= user.id
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
    script(src='/sequelize.js')
```

**프론트엔드 코드를 작성했다면 프론트엔드에서 버튼을 누르거나 text를 작성하면 동작하는(요청을 보내는) 자바스크립트 코드를 작성합니다.**

```javascript
//public/sequelize.js

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
          getComment(user.id);
        });
        var td = document.createElement('td');
        td.textContent = user.id;
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
        td.textContent = comment.id;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = comment.user.name;
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
          xhr.open('PATCH', '/comments/' + comment.id);
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
          xhr.open('DELETE', '/comments/' + comment.id);
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

AJAX 요청을 보내는 코드입니다. **버튼을 누르면 요청이 서버의 라우터로 이동합니다.** 브라우저에서 `<script>~</script>`로 접근하는 파일이므로 `public`폴더에 넣어줬습니다. 이제 요청들이 통과할 라우터들을 서버파일인  `app.js`에 미리 등록합니다.

```javascript
//app.js
//...
//추가
var commentsRouter = require('./routes/comments');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/comments', commentsRouter);
//..
```

이제 메인페이지(`/`)에 접속하면 사용자가 뜨도록 `index.js` 라우터를 작성합니다.

```javascript
// routes/index.js

var express = require('express');
//데이터베이스 내용
var User = require('../models').User;

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  User.findAll()
    .then((users) => {
      res.render('sequelize', {users});		//view/sequelize.pug
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
```

**시퀄라이저는 프로미스를 반환하므로 프로미스를 사용할 수 있습니다. `User.findAll()`의 결과 반환되는 `users`를 매개변수로 `view/sequelize.pug`를 렌더링 합니다.** 프로미스를 사용할 수 있으므로 async/await로 사용할 수 있습니다.

```javascript
// async/await로 작성
router.get('/', function(req, res, next) {
    try{
        const users = await User.findAll();
        res.render('sequelize', {users});
    }catch(err){
        console.error(err);
        next(err);
    }
});
```

이제 `users` 페이지 요청을 받는 라우터를 작성하겠습니다.

```javascript
// routes/users.js

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
  })
  	.then((result => {
      console.log(result);
      res.status(201).json(result);
    }))
    .catch((err) => {
      console.error(err);
      next(err);
    });
})

module.exports = router;

```

`users` 페이지는 GET과 POST 방식으로 요청을 받을 수 있습니다. 이제 `comments`라우터만 작성하면 됩니다. `comments`페이지도 GET과 POST 방식으로 요청을 보낼 수 있습니다.(`sequelize.js` 파일 참고)

```javascript
// routes/comments.js
var express = require('express');
var {User, Comment} = require('../models');

var router = express.Router();

router.get('/:id', function(req, res, next) {
  Comment.findAll({
    include: {
      model: User,
      where: { id: req.params.id },		//id가 같은 comment를 전부 불러옴
    },
  })
    .then((comments) => {
      // console.log(comments);
      res.json(comments);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.post('/', function(req, res, next) {
  Comment.create({
    commenter: req.body.id,
    comment: req.body.comment,
  })
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
router.patch('/:id', function(req, res, next){
  Comment.update({ comment: req.body.comment}, {where: {id: req.params.id}})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
router.delete('/:id', function(req, res, next){
  Comment.destroy({where: {id: req.params.id}})
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

이제 웹 어플리케이션이 완성됐습니다. `comments`는 id와 comment를 가지고 있습니다. id가 같으면 해당 comments를 모두 불러옵니다. 만약 해당 id를 가진  `users`가 없는 댓글을 단다면 DB에 저장은 되지만 표시되지 않습니다.



