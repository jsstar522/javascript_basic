# 맵리듀스, Map & Reduce

배열에 있는 기본 메서드인 `map`과 `reduce`는 배열을 반복하는 메서드입니다.

## 맵, Map

맵은 `배열.map((요소, 인덱스, 배열) => {return 요소})`로 사용합니다. **반복문을 돌면서 배열의 요소들을 1대1로 매핑합니다.** 

```javascript
const array = [1,2,3];
let result = array.map((v) => {
    console.log(v);
    return v;
})

result;		//[1,2,3]
```

다음과 같이 배열을 조작할 수 있습니다.

```javascript
const array = [1,2,3];
let result = array.map((v) => {
    return v+1;
})

result;		//[2,3,4]
```

## 리듀스, Reduce

리듀스는 `배열.reduce((누적값, 현재값, 인덱스, 요소) => {return 결과}, 초기값)`으로 사용합니다. 리듀스는 누적값을 다루는데 용이합니다. 

```javascript
const array = [1,2,3];
let result = array.reduce((acc, cur, i) => {
    return acc + cur;
}, 0)

result;		//6
```

누적값을 계속 현재값에 더해가면서 반복문을 돕니다. 리듀스는 비동기 프로그래밍에 많이 사용됩니다.

```javascript
const promiseFactory = (time) => {
    return new Promise((resolve, reject) => {
        console.log(time);
        setTimeout(resolve, time);
    });
};

[1000, 2000, 3000, 4000].reduce((arr, cur) => {
    return acc.then(() => promiseFactory(cur));
}, Promise.resolve());
```

초기값  `Promise.resolve()`를 실행한 뒤, return 되는 `new Promise`에 then을 붙여 **순차적**으로 실행됩니다. 