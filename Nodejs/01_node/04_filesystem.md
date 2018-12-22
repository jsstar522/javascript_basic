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

### 버퍼, Buffer

버퍼와 스트림 파일을 읽고 쓰는 방식입니다. 예를들어 **동영상을 시청할 때(읽기) 데이터를 조금씩 모으는 것을 버퍼링이라고 하고 동영상의 데이터를 조금씩 내보낼 때 스트리밍이라고 합니다.** 노드에서 파일을 읽을 때(`readFile`) 메모리에 파일 크기만큼 공간을 확보하고 데이터를 모아서 저장합니다. 이렇게 모인 데이터를 `버퍼(Buffer)`라고 합니다. 그리고 이 버퍼를 직접 다룰 수 있습니다. `buffer 클래스` 를 이용합니다.

```javascript
//buffer.js
const buffer = Buffer.from('안녕하세요');
console.log('from(): ', buffer);
console.log('length: ', buffer.length);
console.log('toString(): ',buffer.toString());

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')]
const buffer2 = Buffer.concat(array);
console.log('concat(): ' buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log('alloc(): ', buffer3);
```

출력은 다음과 같이 나옵니다.

```javascript
from():  <Buffer ec 95 88 eb 85 95 ed 95 98 ec 84 b8 ec 9a 94>
length:  15
toString():  안녕하세요
concat():  띄엄 띄엄 띄어쓰기
alloc():  <Buffer 00 00 00 00 00>
```

* `from`은 문자열을 버퍼로 바꿉니다.

* `length`은 버퍼의 크기를 나타냅니다.(Byte)

* `toStoring`은 버퍼를 문자열로 바꿉니다.

* `concat`은 배열을 하나로 합쳐서 return합니다.

* `alloc`은 빈 버퍼를 만듭니다.

`length` 안에 Byte단위의 크기가 들어갑니다. `from`으로 문자열을 버퍼로 바꾸면 15개의 아스키코드가 나옵니다. 한 Byte씩 버퍼링해서 파일이 전달되는 것을 알 수 있습니다. 하지만 **이 방식은 메모리 측면에서 효율적이지 않습니다. 그리고 파일 읽기, 파일 쓰기를 매번 버퍼링하고 완료된 이후에 동작하는 동기방식이기 때문에 빠르지도 않습니다.** 그래서 **작은 크기의 버퍼를 만들어서 나눠 보내는 스트림의 개념이 나왔습니다.** 

### 스트림, Stream

- `createReadStream(파일경로, callback)`
- `createWriteStream(파일경로, 옵션)`
- `pipe()`
- `zlib()` : 파일 압축 모듈

```javascript
//test.txt
안녕하세요
```

```javascript
//stream.js
const fs = require('fs');

const readStream = fs.createReadStream('./test.txt', {highWaterMark: 3});
const data = [];

readStream.on('data',(chunk)=>{
    data.push(chunk);
    console.log('data: ', chunk, chunk.length);
});

readStream.on('end', () => {
    console.log('end: ', Buffer.concat(data).toString());
});

readStream.on('error', (err)=>{
    console.log('error: ', err);
});
```

**`createReadStream`에서 받는 두번째 인자가 한번에 이동시킬 버퍼의 크기입니다.** '안녕하세요'는 15바이트이기 때문에 5번 나누어서 이동합니다. `readStream`은 이벤트 리스너를 사용합니다. 이벤트는 `data`, `end`, `error`를 사용합니다. 스트림방식으로 파일을 쓸 때는 `createWriteStream(파일경로)`를 사용하면 됩니다. 파일을 읽어서 다른 파일로 쓰는 방식으로 스트림과 스트림을 연결할 수 있습니다. `pipe` 메서드를 사용하면 됩니다.

```javascript
// test2.txt
안녕히 가세요
```

```javascript
//pipe.js
const fs = require('fs');

const readStream = fs.createReadStream('test2.txt');
const writeStream = fs.createWriteStream('test.txt');
readStream.pipe(writeStream);
```

`test2.txt` 파일을 스트림 방식으로 읽고 `test.txt` 파일에 스트림 방식으로 씁니다.



##  파일/폴더 생성/삭제, make/delete - file/directory

* `fs.access(경로, 옵션, callback)` : 파일이나 폴더 접근가능 여부, 옵션에 따라 파일 존재 여부, 읽기 권한을 알아볼 수 있습니다.

* `fs.mkdir(경로, callback)` : 폴더를 만듭니다.
* `fs.open(경로, callback)` : 파일이나 폴더의 id를 가져옵니다.
* `fs.read()` `fs.write()` : `fs.open`으로 가져온 파일의 id를 통해 읽고 쓰기가 가능합니다.
* `fs.rename(경로, 새 경로, callback)` : 이름변경 or 경로변경

---

* `fs.readdir(경로, callback)` : 폴더안의 내용 확인
* `fs.unlick(경로, callback)` : 파일 지우기
* `fs.rmdir(경로, callback)` : 폴더 지우기



## 이벤트, Event

웹 서버를 구축할 때, 이벤트를 직접 만들어서 다양한 동작을 구현합니다.

* `on(이벤트이름, callback)`,` addListener(이벤트이름, callback)` : 이벤트 발생 시, callback을 호출합니다.(이벤트 리스닝)
* `emit(이벤트이름)` : 등록된 이벤트 호출
* `once(이벤트이름, callback)` :  한번만 실행되는 이벤트
* `removeAllListeners(이벤트이름)` : 이벤트에 연결된 모든 이벤트 리스너 제거
* `removeListener(이벤트이름, 리스너)`, `off(이벤트이름, callback)` : 이벤트에 연결된 해당 리스너를 제거
* `listenerCount(이벤트이름)` : 리스너 개수 확인

```javascript
//event.js
const EventEmitter = require('events');

const myEvent = new EventEmitter();   //이벤트 객체만들기

myEvent.addListener('event1', () => {   //이벤트 객체 안에 리스너 등록
  console.log('첫번째 이벤트');
})

myEvent.addListener('event2', () => {   //이벤트 객체 안에 리스너 등록
  console.log('두번째 이벤트')
})

myEvent.addListener('event2', () => {   //이벤트 객체 안에 리스너 안에 "두개의 동작" 등록
  console.log('두번째 이벤트-2')
})

console.log(myEvent);

```

**`events` 모듈은 생성자로 생성시 eventListener를 담을 수 있는 객체를 만들어 줍니다.** `console.log(myEvent);`을 쳐보면 객체가 생성된 것을 볼 수 있습니다.

```
console.log(myEvent); 실행결과

EventEmitter {
  _events: [Object: null prototype] {},
  _eventsCount: 0,
  _maxListeners: undefined }
```

그렇기 때문에 `myEvent`라는 객체를 만들고 안쪽에 Listener를 등록합니다. 



## 예외처리

노드는 싱글 스레드로 동작하기 때문에 에러처리가 중요합니다. 에러가 생겨도 동작하되, 에러로그를 남겨야 합니다.

```javascript
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
```

`new Error`로  에러를 발생켰습니다. `setInterval(callback, 1000)`은 1초에 한번씩 callback을 호출합니다. callback이므로 에러가 생겨도 계속 loop를 돕니다. callback 안쪽에는 `try ~ catch `가 있으므로 `try` 안쪽에 있는 함수를 실행하고 `catch`로 에러의 내용을 출력합니다. 노드 자체에서 에러를 잡아주는 경우는 다음과 같습니다.

```javascript
const fs = require('fs');

setInterval(()=>{
    fs.unlink('./nonfile.js', (err)=>{
        if(err){
            console.log(err);
        }
    });
},1000);
```

`process` 객체에 있는 `uncaughtException` 이벤트 리스너를 사용하는 방법도 있지만 다음 동작을 보증하지 않으므로 최후의 수단으로 사용됩니다.

