// const http = require('http');

// http.createServer((req, res) => {
//     res.write('<h1>This is Nodejs</h1>');
//     res.end('<p>Hello</p>');	//응답종료
// }).listen(8080,() => {
//     console.log('8080번 포트에서 서버 대기 중입니다.')
// })


//이벤트 리스너 직접 구현
const http = require('http');

const server = http.createServer((req, res) => {
    res.write('<h1>This is Nodejs</h1>');
    res.end('<p>Hello</p>');	//응답종료
});
server.listen(8080);

server.on('listening', () => {
    console.log('8080번 포트에서 서버 대기 중입니다.');
});
server.on('error', () => {
    console.error('error');
});