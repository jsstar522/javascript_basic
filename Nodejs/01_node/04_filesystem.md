# 파일시스템, File System

파일시스템은 자바스크립트 코드에서 파일을 생성하거나 삭제하고, 읽고 쓰는 것을 가능하게 합니다. 내장 모듈을 사용합니다.

```javascript
const fs = require('fs');

fs.readFile('./test.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});
```

`fs` 모듈에서 `readFile`이라는 파일을 읽는 메서드를 사용합니다. **readFile은 callback함수를 인자로 넣어주는데, 파일을 읽는 과정에서 에러가 생기면 에러(`err`)를 받아옵니다.** 정상적으로 실행되면 `data`를 받아와서 파일의 내용을 handling 할 수 있습니다. 파일을 읽는 것뿐만이 아닌 쓰는 것도 가능합니다.

```javascript
const fs = require('fs');

fs.writeFile('./test.txt','안녕하세요',(err)=>{
    if(err){
        throw err;
    }
    console.log('내용이 변경됐습니다.');
});
```

`readFile`과는 다르게 callback의 인자를 `err` 하나만 받아오고 가운데 파일에 덮어씌울 내용을 쓸 수 있습니다.



## 동기 메서드와 비동기 메서드, Syncmethod & Asyncmethod

노드의 메서드를 사용하다보면 대부분 비동기방식으로 작동하는 것을 볼 수 있습니다. 하지만 동기방식으로 사용할 수 있는 메서드도 있습니다. 아래와 같은 비동기 메서드를 동기식으로 바꿔보겠습니다.   

```javascript
const fs = require('fs');

fs.readFile('./test.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.log('첫번째');
});

fs.readFile('./test.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.log('두번째');
});

fs.readFile('./test.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.log('세번째');
});

fs.readFile('./test.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.log('네번째');
});
```

```javascript
첫번째
네번째
두번째
세번째
```

`readFile`은 파일시스템에서 대표적인 비동기 메서드입니다. 비동기 메서드이기 때문에 순서대로 실행되지 않습니다. 결과도 실행할 때마다 달라지죠. 동기방식으로 파일을 읽어오기 위해서는 `readFileSync(파일이름)`을 사용하면 되지만 요청이 많을 때에는 성능에 문제가 생깁니다. 그렇기 때문에 **순서가 중요하지 않은 대부분의 작업은 비동기 방식으로 처리합니다**. 하지만 순서가 중요할 때는 반드시 동기방식을 써야하는가. 그렇지 않습니다. 다음과 같이 구현하면 됩니다. 

```javascript
const fs = require('fs');

fs.readFile('./test.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.log('첫번째');
    fs.readFile('./test.txt',(err,data)=>{
    	if(err){
        	throw err;
    	}
    	console.log('두번째');
    	fs.readFile('./test.txt',(err,data)=>{
    		if(err){
        	throw err;
    		}
    	console.log('세번째');
        fs.readFile('./test.txt',(err,data)=>{
    		if(err){
        	throw err;
    		}
    		console.log('네번째');
			});
		});    
	});
});
```

위와 같은 코드를 **콜백지옥**이라고 합니다. 콜백지옥의 복잡한 코드를 해결하기 위해서 `async/await`나 `promise`를 사용합니다.

##  버퍼와 스트림, Buffer & Stream

버퍼와 스트림 파일을 읽고 쓰는 방식입니다. 예를들어 **동영상을 시청할 때(읽기) 데이터를 조금씩 모으는 것을 버퍼링이라고 하고 동영상의 데이터를 조금씩 내보낼 때 스트리밍이라고 합니다.** 노드에서 파일을 읽을 때(`readFile`) 메모리에 파일 크기만큼 공간을 확보하고 데이터를 모아서 저장합니다. 이렇게 모인 데이터를 `버퍼(Buffer)`라고 합니다. 그리고 이 버퍼를 직접 다룰 수 있습니다.

```javascript

```

