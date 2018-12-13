# Node.js에 앞서 ES6

## Const와 let

`var`대신 `const`와 `let` 을 사용합니다. `const`는 바뀌지 않는 값, `let`은 바뀌는 값일 때 사용합니다.

**`var`는 함수 스코프(함수 안에서 사용할 수 있는 지역변수)를 갖고 있고 const와 let은 블록 스코프(`{}`안에서 사용할 수 있는 지역변수)를 갖고 있습니다.**

```javascript
if(true){
    var x = 3;
}
if(true){
    const y = 3;
}
console.log(x);	//3
console.log(y);	//Error
```

## 문자열 변수

문자열 안에 변수를 추가하고 싶다면 `backtic`으로 문자열을 선언하고 변수는 `${}`안에 넣으면 됩니다.

## 객체 리터럴

객체를 선언할 때, 불편한 점이 ES6에서 해소되었습니다.

```javascript
var sayNode = function(){
    console.log('Node');
}
var oldObject = {
    sayJS : function(){
        console.log('JS');
    },
    sayNode : sayNode,
    
};

var es = 'ES';
oldObject[es + 6] = 'Fantastic';	//객체 요소 추가는 Object.key = value;로 하지만 []안에 연산이 가능하다.(속성 동적 추가)

```

다음과 같은 코드를 ES6에서 더 쉽게 표현할 수 있습니다.

```javascript
var es = 'ES';
var sayNode = function(){
    console.log('Node');
}
var oldObject = {
    sayJS : function(){
        console.log('JS');
    },
    sayNode,	//key value가 같은 이름일 때, 하나는 생략 가능
    [es + 6] : 'Fantastic',	//key값에 []가 들어가면 동적할당(외부에서 사용하지 않아도 됨)
};
```



## 화살표 함수, Arrow Function

function이라는 단어를 쓰지 않고 화살표로 함수를 표현할 수 있습니다. 

```javascript
const a = function(){
    console.log('a');
}
const a = ()=>{
    console.log('a');
}
```

기존의 함수와 화살표 함수는 `this` 바인딩 형식이 다릅니다. 자세한 설명은 [Scope - this란](https://github.com/jsstar522/javascript_basic/blob/master/01_Basic/02_this.md) 을 참고하세요.

## 비구조화 할당

객체와 배열에서 속성과 요소를 쉽게 꺼내올 수 있습니다.

```javascript
var candyMachine = {
    status : {
        name: 'node',
        count: 5,
    },
    getCandy: function(){
        this.status.count--;
        return this.status.count;
    }
};

/* ES5
 * var getCandy = candyMachine.getCandy;
 * var count = candyMachine.status.count;
 */

var { getCandy } = candyMachine;
var { count } = candyMachine.status;
var { status:{count} } = candyMachine;
var { getCandy, status:{count} } = candyMachine;

// 참고
// getCandy() 실행 안됨
// count 못가져옴
// this 출력해보면 global로 나옴
// candyMachine.getCandy()로 실행해야 됨
```



## 프로미스



## Async/await

