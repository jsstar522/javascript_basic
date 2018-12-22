# 요청과 응답, Request & Response

## 서버와 클라이언트 통신, HTTP

웹에는 요청을 보내는 자(클라이언트)와 응답을 보내는 자(서버)가 있습니다. 이 두 객체가 상호작용 하면서 웹이 만들어집니다. **서버에는 `요청을 받는 부분(req)`과 `응답을 보내는 부분(res)`이 있습니다. 이 부분은 요청이 들어왔을 때 바로 응답할 수 있도록 이벤트 리스너를 등록해놔야 합니다.** http 서버가 있어야 브라우저의 요청을 처리할 수 있으므로 `http` 모듈을 사용합니다.

```javascript
const http = require('http');

http.createServer((req, res) => {
    res.write('<h1>This is Nodejs</h1>');
    res.end('<p>Hello</p>');	//응답종료
}).listen(8080,() => {
    console.log('8080번 포트에서 서버 대기 중입니다.')
})
```

**`createServer`는 클라이언트의 요청에 따라 응답을 받는 서버를 생성하는 메서드입니다.** `res`는 응답할 동작을 미리 설정해놓은 객체입니다. `listen`은 `createServer`에 포함된 이벤트 리스너입니다. `listen`에 callback을 빼고 등록된 이벤트 리스너를 나중에 붙여도 됩니다.

```javascript
//reqres.js
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
```

## Html 파일 불러오기

```html
//test.html

<!DOCTYPE html>
<html>
	<head>
    	<meta charset = "utf-8" />
        <title>Node Js</title>
    </head>
    <body>
    	<h1>
            안녕하십니까
        </h1>    
        <p>
            안녕히 계세요
        </p>
    </body>
</html>
```

```javascript
const http = require('http');
const fs = require('fs');

http.createServer((req,res) => {
    fs.readFile('./test.html', (err,data) => {
        if(err){
            throw err;
        }
        res.end(data);
    });
}).listen(8080, () => {
    console.log('8080번 포트에서 대기중');
})
```

`fs`모듈(파일시스템 모듈)을 통해서 html 파일의 버퍼를 data에 넣어서 가지고 옵니다.