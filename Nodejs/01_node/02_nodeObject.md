# 노드 내장 객체, Implict Object of Nodejs

노드에서는 브라우저의 window와 같은 내장 객체를 가지고 있습니다.


## Global

global은 전역객체입니다. **전역객체이므로 `global.open`과 같은 메서드는 `open`으로 global을 생략할 수 있습니다.**`require`과 같은 메서드도 원래는 `global.require`입니다. global 객체의 내용을 보려면 REPL에서 다음과 같이 확인할 수 있습니다.

```javascript
$ node
> global
```

global의 객체를 통해 데이터를 파일끼리 공유 해보겠습니다.

```javascript
//globalA.js
module.exports = () => global.message;
```

```javascript
//globalB.js
const A = require('./globalA');

global.message = 'Hello';
console.log(A());
```

```javascript
$ node globalB
Hello
```

`globalA.js`에서 함수를 통해 global.message를 return 했습니다. (ES6에서 return 생략가능) 그리고 `globalB.js`에서 `global.message`라는 전역변수에 'Hello'를 대입하고 `globalA.js`를 실행했습니다. 'Hello'가 대입되어 있는 전역변수 `global.message`가 제대로 출력됩니다.



## Console

console 객체에는 `log`를 비롯해서 `time`, `error`, `dir` 등이 있습니다. REPL에서 다음과 같이 확인할 수 있습니다. 

```javascript
$ global.console
```

```javascript
const string = 'abc';
const num = 1;
const boolean =true;
const obj ={
    outside:{
        inside:{
            name: 'park',
        },
    },
};
console.time('시간');     //console.timeEnd(레이블)과 대응되어 같은 레이블을 가진 time과 timeEnd 사이의 시간을 측정, ()안에는 label을 기입
console.log('Hello');     //consle에 로그출력
console.log(string, num, boolean);
console.error('에러');    //에러를 콘솔에 출력(console.log와 비슷한 기능을 하지만 개발자 모드에서 표시되는 방식이 다름)
console.dir(obj, {colors:false, depth: 1});   //객체를 콘솔에 표시, 색표시, 몇단계까지 보여줄지 정할 수 있다.

console.time('시간측정');
for(let i=0; i<10000; i++){
  continue;
}
console.timeEnd('시간측정');

console.trace('에러위치 추적');

```



## 타이머

타이머 메서드에는 `setTimeout(callback, 밀리초)`, `setInterval(callback, 밀리초)`, `setImmediate(callback)`으로 사용할 수 있습니다. **`callback`에는 타이머가 모두 지나간 뒤 동작시킬 내용을 미리 적어넣습니다.** 

```javascript
//timer.js
const timeout = setTimeout(()=>{
    console.log('1.5초 후 실행');
}, 1500);
const interval = setInterval(()=>{
    console.log('1초마다 실행');		//1초 후 부터 실행
}, 1000);
const timeout2 = setTimeout(()=>{
    console.log('실행되지 않음');
}, 3000);
setTimeout(()=>{
    clearTimeout(timeout2);
    clearInterval(interval);
},2500);
const immediate = setImmediate(()=>{
    console.log('즉시실행');
});
const immediate2 = setImmediate(()=>{
    console.log('실행되지 않음');		//콜백함수로 실행되므로 뒤에 있는 clearImmediate()보다 늦게 실행된다.
});
clearImmediate(immediate2);
```

다음을 실행하면 어떻게 출력하는지 확인해보겠습니다.

```
즉시실행
1초마다 실행
1.5초 후 실행
1초마다 실행
```

**모든 변수(timeout, timeout2, interval...)에 실행된 함수의 return값을 저장했으므로 한줄한줄 모두 실행됩니다.** 실행순서는 다음과 같습니다. 

```javascript
0초	  | immediate 		| 즉시실행
0.5초  |           		| 
1초	  | interval  		| 1초마다 실행
1.5초  | timeout   		| 1.5초 후 실행
2초	  | interval  		| 1초마다 실행		//2.5초 이후 clearInterval 실행되면서 멈춤
2.5초  | clearTimout		|
		clearInterval

```

**콜백함수는 실행과 동시에 곧바로 Background로 넘어가고 콜백함수가 아닌 일반함수가 먼저 실행됩니다.**

```javascript
const immediate2 = setImmediate(()=>{
    console.log('실행되지 않음');		//콜백함수로 실행되므로 뒤에 있는 clearImmediate()보다 늦게 실행된다.
});
clearImmediate(immediate2);
```

이 부분에서 `const immediate2 = setImmediate(callback)`가 `clearImmediate(immediate2)` 보다 먼저 실행되었음에도 불구하고 실행되지 않는 이유는 `immediate2`가 콜백함수이기 때문입니다. (콜백함수를 즉시 실행하더라도 background를 거쳐갑니다) 



## _ _filename, _ _dirname

파일이나 폴더의 경로를 표시합니다.

```javascript
console.log(__filename);
console.log(__dirname);
```



## module, export

module 객체안에 있는 export 객체로 모듈을 만들 수 있습니다.

```javascript
const odd = '홀수';
const even = '짝수';

module.exports = {odd, even};	//객체로 한번에 추가해서 모듈화
```

module객체를 제외하고 export 객체로만 모듈을 만들 수 있습니다.

```javascript
exports.odd = '홀수';
exports.even = '짝수';		//exports 객체에 하나씩 추가
```

하지만 이 방법은 객체안에 `key`, `value`값으로만 넣어야 합니다. 함수를 export하고자 한다면 `module.exports` 방식을 사용해야 합니다. 



## Process.env

Process 객체는 현재 실행되고 있는 노드 프로세스의 정보를 담고 있습니다. 그중에서도 `process.env`는 시스템 환경 변수를 담고 있습니다. `process.env`는 서비스의 중요한 키를 저장하는 공간으로도 사용됩니다. 예를들어 비밀번호, API 키를 `process.env`의 속성으로 넣습니다.

```javascript
const secretId = process.env.SECRET_ID;
const secretCode = process.env.SECRET_CODE;
```



## Process.nextTick(callback)

다른 콜백 함수보다 우선적으로 처리합니다.

```javascript
//nextTick.js
setImmediate(()=>{
    console.log('immediate');
});
process.nextTick(()=>{
    console.log('nextTick');
})
Promise.resolve().then(()=>{console.log('promise')});
```

위의 파일을 실행시키면 다음과 같이 출력됩니다.

```
nextTick
promise
immediate
```

`Promise`도 다른 콜백보다 먼저 실행되는 것을 알 수 있습니다. 일반 콜백보다 먼저 처리하는 `nextTick`, `Promise`와 같은 함수를 `마이크로테스크`라고 부릅니다. 