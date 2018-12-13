# Node.js

## Node.js의 특징 

### 비동기 I/O처리 및 이벤트 Driven

비동기 I/O는 Step by Step으로 함수들이 실행되지 않습니다. **멈추지 않고 함수들이 실행되고 Callback함수들은 Background로 넘긴 뒤, 작동해야할 차례가 오면 그 때 작동합니다. **함수들의 작업을 미리 설정 해놓으면 시스템이 알아서 판단한 후 함수들을 동작시키는 것을 Event-Driven이라고 합니다.

### 빠른속도

구글 크롬의 V8 엔진을 사용합니다.

### 단일 thread

한번에 한가지 일만 처리합니다. **한번에 한가지의 일밖에 못하기 때문에 비효율적일 것 같지만 비동기 방식이 있기 때문에 오히려 남는 자원 없이 적절히 사용할 수 있다는 장점이 있습니다.** 업무의 양이 늘어나면 싱글 스레드의 프로세스를 늘려서 문제점을 보완합니다. 하지만 그래도 싱글스레드이기 때문에 CPU가 많이 요구되는 어플리케이션에서는 Node.js를 사용하지 않는 것이 좋습니다.



## Node.js 사용하기

모듈을 불러올 때 `require('모듈명')` 을 사용합니다. 

```javascript
var http = require("http");

http.createServer(function(request, response){
    /* 
        HTTP 헤더 전송
        HTTP Status: 200 : OK
        Content Type: text/plain
    */
    response.writeHead(200, {'Content-Type': 'text/plain'});
    
    /*
        Response Body 를 "Hello World" 로 설정
    */
    response.end("Hello World\n");
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081");

//출처 : velopert.com

```

더 다양한 모듈을 사용하기 위해서는 `npm` 을 사용할 수 있습니다. npm은 node package manager의 줄인말로 node.js의 대규모 오픈소스 라이브러리 입니다. **기존의 node.js에 포함된 모듈 또한 포함하고 있기 때문에 필수적으로 사용되는 패키지입니다.**





