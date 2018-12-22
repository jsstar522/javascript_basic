const fs = require('fs');

// blocking
setInterval(() => {
  console.log('시작');
  throw new Error('에러발생');

}, 1000);

// non blocking
setInterval(() => {
  console.log('시작');
  try {
    throw new Error('에러발생');
  } catch (err) {
    console.error(err);
  }
}, 1000);
