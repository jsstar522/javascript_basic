const http = require('http');

const parseCookies = (cookie = '') => 
	cookie
		.split(';')
    .map(v => v.split('='))
    .map(([k, ...vs]) => [k, vs.join('=')])
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

http.createServer((req,res) => {
  const cookies = parseCookies(req.headers.cookie);
  // console.log('raw cookie : ', req.headers.cookie);
  console.log('cookie : ',req.url, '+', cookies);
  res.writeHead(200, {'Set-Cookie': 'mycookie=test'});
  res.end('Hello Cookie')
}).listen(8080, () => {
  console.log('8080번 포트에서 대기중');
})