// //단방향
// const crypto = require('crypto');

// console.log('base64: ', crypto.createHash('sha512').update('비밀번호').digest('base64'));
// console.log('hex: ', crypto.createHash('sha512').update('비밀번호').digest('hex'));
// console.log('base64: ', crypto.createHash('sha512').update('비밀번호_2').digest('base64'));

// const crypto = require('crypto');

//양방향
//암호화
const crypto = require('crypto');
const cipher = crypto.createCipher('aes-256-cbc', '열쇠');	//알고리즘과 복호화를 할 수 있는 키가 들어간다.
let result = cipher.update('암호화할 문장', 'utf8', 'base64');
result += cipher.final('base64');
console.log('암호화', result);

//복호화
const decipher = crypto.createDecipher('aes-256-cbc', '열쇠');	//암호화 키와 같은 키가 들어가야한다.
let result2 = decipher.update(result, 'base64', 'utf8');
result2 += decipher.final('utf8');
console.log('복호화', result2);