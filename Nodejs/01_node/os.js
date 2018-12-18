//os module
const os = require('os');
console.log('cpu: ', os.cpus());
console.log('cpu core: ', os.cpus().length);	//1

//path module
const path = require('path');
console.log('path.join(): ', path.join(__dirname, '..', '..', '/users', '.', '/jongseokpark'));

//url module
const url = require('url');
const URL = url.URL;

const myURL = new URL('https://news.sbs.co.kr/news/endPage.do?news_id=N1005062618&plink=STAND&cooper=NAVER');

console.log(myURL.searchParams);
console.log(myURL.searchParams.getAll('news_id'));

//querystring
const querystring = require('querystring');

const parsedUrl = url.parse('https://news.sbs.co.kr/news/endPage.do?news_id=N1005062618&plink=STAND&cooper=NAVER');
const query = querystring.parse(parsedUrl.query);
console.log(query);