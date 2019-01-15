// schemas/index.js

const mongoose = require('mongoose');

module.exports = () => {
  const connect = () => {
    //개발환경이 아닐 때, 몽구스가 생성하는 쿼리내용을 콘솔에 나타냄
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }
    //몽구스와 몽고디비 연결
    mongoose.connect('mongodb://jsstar522:Js1067827@localhost:27017/admin', {
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