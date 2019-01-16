# Async Await

싱글스레드를 사용하는 NodeJS에서 비동기 방식을 동기식으로 처리하는 일이 중요합니다. 대표적으로 `setTimeout`과 `callback`이 있습니다.

```javascript
let first = 10;
let second = 20;
let result = 0;

function add(a, b){
    return a+b;
}

setTimeout(function(){
    result = add(first, second);
    console.log(result);
}, 1000);
```

위의 예시처럼 `setTimeout`을 사용하면 더하기 함수의 실행이 1초 뒤부터 실행됩니다. 이제 단순한 비동기처리의 문제점을 알아보겠습니다.

```javascript
let first = 10;
let second = 20;
let result = 0;

function add(a, b){
    return a+b;
}

setTimeout(function(){
    result = add(first, second);
    console.log(result);
}, 1000);

first = 30;
```

위의 예시가 동기적으로 동작한다면, result는 30이 되어야 합니다. 하지만 비동기로 동작하기 때문에 50이 나옵니다. **다음과 같은 문제는 변수들이 이후에 여러번 쓰인다면 문제가 될 수 있습니다.** 이를 동기식으로 동작시키려면 다음과 같이 `callback`을 사용하면 됩니다.

```javascript
let first = 10;
let second = 20;
let result = 0;

function add(a, b){
    return a+b;
}

setTimeout(function(){
    result = add(first, second);
    console.log(result);
}, 1000);

first = 30;
```

