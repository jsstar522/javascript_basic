# MySQL

## MySQL 설치하고 사용하기

```bash
$ brew install mysql
$ brew services start mysql
$ mysql_secure_installation
```

데이터베이스에 접근하는 비밀번호를 설정한 뒤 mysql 콘솔을 실행시킵니다.

```bash
$ mysql -h localhost -u root -p
```

`Workbench`를 설치하면 GUI를 사용할 수 있습니다.



## Node에서 MySQL 사용하기

Node에서 MySQL을 쉽게 사용할 수 있도록 도와주는 `Sequelize(시퀄라이즈)` 라이브러리를 사용합니다. 시퀄라이즈는 자바스크립트 문법을 SQL 예약어로 자동으로 바꿔줍니다. 먼저 시퀄라이즈를 사용할 프로젝트를 Express-generator로 생성합니다.

```javascript
$ express learn-sequelize --view=pug
```

생성된 `learn-sequelize`로 이동해서 패키지를 설치합니다. 패키지는 `npm i`를 통해 `package.json`을 참고해서 자동으로 설치하게끔 합니다. 이제 시퀄라이즈에서 MySQL을 사용할 수 있는 패키지와 커맨드사용설정, 호출까지 진행합니다.

```bash
$ npm i sequelize mysql2
$ npm i -g sequelize-cli
$ sequelize init
```

이제 시퀄라이저와 서버 앱을 연동합니다.

```javascript
//app.js
//...
var sequelize = require('./models').sequelize;
sequelize.sync();
//...
//추가
```

다음과 같은 연동은 config파일을 기반으로 MySQL에 접근합니다.

```json
{
  "development": {
    "username": "root",
    "password": "비밀번호",
    "database": "데이터베이스 이름",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "비밀번호",
    "database": "데이터베이스 이름",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "비밀번호",
    "database": "데이터베이스 이름",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```

세가지 모드는 `index.js`에서 변경할 수 있습니다.

```javascript
//index.js
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';		//모드 설정
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

//config 파일의 정보를 인자로 받아와서 시퀄라이저 객체를 만듦
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
```



### 모델(Table) 정의

이제 MySQL에서 만들었던 Table을 작성해보겠습니다. Table은 시퀄라이저에서 모델로 정의할 수 있습니다. `models` 폴더에 `user.js` 와 `comment.js` 파일을 만듭니다.

```javascript
//user.js

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    married: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('now()'),
    },
  },{
    tiemstamps: false,      //시간 자동생성 해제(create_at을 만들었으므로)
  })
}
```

```javascript
//comment.js

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    comment: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('now()'),
    },
  },{
    tiemstamps: false,      //시간 자동생성 해제(create_at을 만들었으므로)
  })
}
```

**시퀄라이저에서 `user`와 `comment`로 모델을 정의했으면 MySQL 테이블에서는 `users`와 `comments`로 생성됩니다.** 이제 app과 연결되어 있는 파일 `index.js`와 연결합니다. 

```javascript
//index.js
//...
//추가
db.User = require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
//...
```

이제 앱에서 `db.User`와 `db.Comment`로 DB에 접근할 수 있습니다. 

### 관계 정의

#### 일대다(1:N)

MySQL에서는 Primary Key와 Foreign Key를 통해서 관계를 정의했습니다. 시퀄라이저에서 이를 한번에 정리할 수 있고, 일대다(1:N)를 정의할 수 있습니다. **한명이 댓글을 여러개 작성할 수 있지만 하나의 댓글을 여러명이 작성할 수 없습니다(하나의 댓글에 작성자가 여러명일 수 없습니다).** 이를 `일대다(1:N)` 관계라고 합니다. 즉, **user 테이블에서 하나의 row는 comment 테이블의 많은 row를 참조할 수 있습니다.** 일대다 관계는 `hasMany`와 `belongsTo` 메서드를 이용합니다.

```javascript
//index.js
//...
//추가
//모델(테이블)정의
db.User = require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

//관계정의
db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});
db.Comment.belongsTo(db.User, {foreignKey: 'commenter', targetKey: 'id'});
//...
```

* `db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});`는 'users' 테이블의 하나의 row를 불러올 때, 'comments' 테이블의 많은 row를 불러올 수 있음을 의미합니다. 그리고 foreignKey를 'commenter'로 설정하고 'users'의 id가 commenter에 들어갑니다.
* `db.Comment.belongsTo(db.User, {foreignKey: 'commenter', targetKey: 'id'});`는 'comments' 테이블의 row을 불러올 때, 'users' 테이블의 row를 불러올 수 있음을 의미합니다. foreignKeys는 'commenter'고 'users'의 id를 가르키고 있습니다.

*`Client does not support authentication protocol requested by server; consider upgrading MySQL client` 에러가 뜨는 경우, MySQL 콘솔을 띄우고 database를 선택한 뒤 https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server 참고*

이제 `npm start`를 실행하면 DB에 연동되었음을 확인할 수 있습니다.

#### 일대일(1:1)

`hasOne` 와 `belongsTo`메서드를 사용합니다.

#### 다대다(N:M)

다대다의 가장 좋은 예시는 태그입니다. **하나의 게시글은 많은 태그를 가질 수 있고, 하나의 태그는 많은 게시글을 가르킬 수 있습니다.** `belogsToMany`메서드를 사용합니다.

```javascript
//관계정의
db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'});
//...
```