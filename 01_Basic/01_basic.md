# 자바스크립트, Javascript

## 자바스크립트란

자바스크립트는 브랜든 아이크(Brendan Eich)가 1995년에 근무하던 넷스케이프에서 개발한 언어입니다. **자바스크립트는 웹브라우저를 제어할 수 있는 유일한 "프로그래밍 언어"로 HTML, CSS와 같은 태그 스크립트가 구현하지 못하는 다양한 작업을 처리할 수 있습니다.** 그리고 이제 자바스크립트는 웹브라우저를 넘어 서버(Nodejs), 웹 어플리케이션(Google SpreadSheet)을 구현할 수 있습니다. 즉, 완성된 웹 어플리케이션을 자바스크립트 하나로만 만들 수 있다는 얘기입니다.

프로그래밍 언어는 빠르게 발전하고 있습니다. 자바스크립트는 ES6라는 버전에서 많은 변화를 겪었습니다. 전 버전과는 꽤 많은 차이를 보이고 있습니다. 이 포스트는 ES6 업데이트를 고려해서 작성됐습니다.

## 변수, Variable

변수는 변하는 수입니다. 숫자나 문자, 함수를 변하는 수에 대입시킬 수 있고 변하는 수는 우리가 원하는 곳에 사용할 수 있습니다. 변수는 다음과 같이 선언합니다.

```javascript
const a;
const abab;
let 변수;
```

`const`와 `let`은 ES6 버전 이후, 바뀐 변수를 선언하는 방법입니다. 그 전까지는

```javascript
var a;
```
처럼 사용했으나, 이제는 이렇게 쓰지 않습니다. (이렇게 써도 오류는 걸리지 않습니다.)
**const는 변하지 않는 값을 넣을 때 사용하고, let은 변하는 값을 넣을 때 사용합니다.** `var`와 `const`,` let` 이 다른점은 스코프가 다르다는 점입니다. `var`는 함수 스코프를 갖고 있으므로 함수 안에서 선언하면 그 함수 안에서 자유롭게 사용 가능합니다. `const`와`let`은 블록(`{}`)안에서 선언하면 블록 밖에서 사용할 수 없습니다.



다음예제를 통해 var을 const 혹은 let으로 바꿔 보도록 하겠습니다.

```javascript
function count(targetString){
	//var characters = ['a','e','i','o','u'];
	const characters = ['a','e','i','o','u'];
	//var number = 0;
	let number = 0;
	for (let i=0;i<targetString.length;i++){
		if(characters.includes(targetString[i])){
			number++;
		}
	}
	return number;
}
console.log(count('akskdoekckbdke'));
```
다음은 주어진 단어에서 모음의 개수를 찾는 함수입니다. 자바스크립트에서 배열은 includes라는 메서드를 포함하고 있기 때문에 includes라는 메서드를 사용했습니다. `includes()` 메서드는 해당 배열에 같은 값이 있는지 조사하고 있으면 True, 없으면 False를 반환합니다.


## 배열, Array

**배열은 여러 값들을 하나의 변수에 차례대로 넣은 것을 의미합니다.** 그리고 그 변수들은 `변수이름[~번째]` 로 사용할 수 있습니다.

```javascript
const array = [];
const array1 = [1, 'One', [1,2], {One:1}];
```

배열 안에는 숫자, 문자, 배열, 객체처럼 다양한 것들이 들어갈 수 있습니다. 배열은 객체(list )와 다르게 Key:Value 를 갖지 않고 Value만 갖고 있습니다. 굳이 따지자면 Key는 0,1,2,…와 같은 몇번째 Value인지 알 수 있는 숫자입니다. 배열은 객체와 다르게 다양한 기능(Method)를 기본적으로 제공하고 있기 때문에 자주 사용되죠. 


### 배열의 Method 사용하기(reduce)

위에서 작성한 코드를 array의 메서드 중 `reduce()`를 활용해 좀 더 세련된 함수를 만들어 보겠습니다. reduce()는 `reduce(function(누적값, 현재값, 인덱스){return;}, 초기값);`의 형태로 사용할 수 있습니다. 초기값을 적지 않으면 0이 됩니다. reduce() 메서드는 배열의 길이만큼 loop를 돌기 때문에 반복문을 따로 적지 않아도 됩니다.

```javascript
function count(targetString){
	const characters = ['a','e','i','o','u'];	//바뀌지 않는 값
    let count = targetString.split('').reduce(function(acc,char){
        if(characters.includes(char)){
            acc++;	//누적값(모음 알파벳을 감지하면 +1)
        }
        return acc;
    }, 0);
    return count;
}
console.log(count('akskdoekckbdke'));
```

reduce()는 배열의 메서드입니다. 문자열을 받았으므로 문자열을 배열로 바꿔주는 작업이 필요합니다. `split('나누는 기준')`으로 나누면 됩니다. 위에서는 모든 알파벳 하나하나 마다 나눠서 배열로 저장한다는 의미입니다. 예를들어 split(',')이면 ,의 앞뒤로 나눠서 배열로 저장한다는 의미입니다. 배열은 reduce() 뿐만 아닌 `map()`과 같은 다양한 메서드를 제공합니다.

### 배열의 Method 사용하기(map)

```javascript
const numbers = [1,2,3];
const doubledNumbers = numbers.map(function(number){
    return 2*number;
})
console.log(doubledNumbers);	//2,4,6
```

array의 메서드 중에서 `map()`은 배열의 값을 1대1로 받아 loop를 돌며 차례대로 값을 사용할 수 있습니다. 



## 객체, Object

**객체는 Key:Value 값으로 이루어진 목록입니다.** 보통 객체는 비슷한 성격을 가진 목록끼리 묶어서 **덩어리**로 사용합니다.

```javascript
const student_score = {
    park : 'A+',
    kim : 'C',
    lee : 'B-'
}
```

목록 하나하나를 "속성(property)"이라고 합니다. key는 :로 구분되는 왼쪽에 위치하고, value는 오른쪽에 위치합니다. key값은 문자열만 사용 가능한데, 띄어쓰기가 들어가지 않았다면 ' '를 붙이지 않고 사용해도 됩니다. `student_score` 객체에서 `park`의 점수를 가져오고 싶다면, `student_score.park;`으로 사용할 수 있습니다.

다음과 같이 추가와 삭제도 가능합니다.

```javascript
student_score.han = 'F';	//추가
delete student_score.kim;	//삭제
```

속성(key)는 무조건 string으로 받아들입니다. 그렇기 때문에 **연산된 key값을 그냥 추가하면 연산이 이루어지지 않고 전체를 string으로 인식합니다.** 다음과 같이 객체에 동적으로 속성을 추가할 수 있습니다.

```javascript
student_score['park'+2] = 'C';
```



## 함수, Function

**함수는 자주 사용되는 선언이나 연산이 있을 때, 그 선언이나 연산을 묶어서 나중에도 편하게 사용할 수 있게 합니다.** 함수 안에 연산이 있을 경우에는 매개변수라는 것을 이용해서 연산을 합니다. **매개변수는 함수 바깥에 있는 값을 함수 안쪽으로 가져와 연산(혹은 대입)을 할 수 있게 해줍니다.**

```javascript
function doubleMessage(number){
    return `Your number doubled is ${number*2}`;
}
console.log(doubleMessage(5));	//10
```

`${변수}`는 string과 함께 사용할 때 변수를 편하게 string안에 넣기 위해 사용합니다. ES6에서 추가된 기능입니다. ``(tab위에 있는 backtick) 안에 string과  ${변수} 를 넣어서 사용합니다.

doubleMessage()의 함수에서 number가 매개변수입니다. 맨 밑에 `doubleMessage(5);`에서 5를 매개변수로 받아와 2를 곱하고 string과 함께 출력하는 것이죠.

함수는 자료형과 함께 이렇게도 정의할 수 있습니다.

```javascript
const doubleMessage = function(number){
    return `Your number doubled is ${number*2}`;
}
console.log(doubleMessage(5));	//10
```



### 화살표 함수, Arrow Function

ES6에는 조금더 간결한 함수선언을 제공합니다.

```javascript
const doubleMessage = (number) => {
    return `Your number doubled is ${number*2}`;
}
console.log(doubleMessage(5));	//10
```

화살표를 통해 function 임을 함축할 수 있습니다. 위와 같이 한줄 밖에 안되는 코드가 들어가 있고 매개변수가 한개 밖에 없다면 다음과 같이 쓸 수도 있습니다.

```javascript
const doubleMessage = number => `Your number doubled is ${number*2}`
console.log(doubleMessage(5));	//10
```

이번에는 객체 안에서 "객체 안의 속성"을 사용하는 함수를 선언하는 경우를 보겠습니다.

```javascript
const team = {
    members : ['IronMan','Hulk','Thor','CaptainAmerica','Dr.Strange'],
    teamName : 'Avengers',
    teamSummary : function(i){
        return `${members[i]} is belong to ${teamName}`;
    }
}

console.log(team.teamSummary(1));	//VM181:5 Uncaught ReferenceError:member is not defined
```

이렇게 사용하면 오류가 납니다. 객체 안에 있는 함수가 같은 객체의 속성을 가져올 때는 속성의 key앞에 this를 붙여야 합니다.

```javascript
const team = {
    members : ['IronMan','Hulk','Thor','CaptainAmerica','Dr.Strange'],
    teamName : 'Avengers',
    teamSummary : function(i){
        return `${this.members[i]} is belong to ${this.teamName}`;
    }
}

console.log(team.teamSummary(1));	//Hulk is belong to Avengers
```

이번에는 함수안에 함수를 넣어서 모두 arrow function으로 써보겠습니다. member에 담긴 모든 구성원들을 소속까지 밝힌 문장으로 모두 출력시키는 것입니다. 1대1 매핑으로 loop를 돌아가면서 모든 구성원들을 변수로 받아와서 출력시켜야 하므로 `map()`을 사용합니다.

### Arrow Function과 기존의 Function의 다른점

```javascript
const team = {
    members : ['IronMan','Hulk','Thor','CaptainAmerica','Dr.Strange'],
    teamName : 'Avengers',
    teamSummary : () => {
        this.members.map((member)=>{
        return `${member} is belong to ${this.teamName}`
        })
    }
}

console.log(team.teamSummary());	//VM1478:5 Uncaught TypeError: Cannot read property 'map' of undefined
```

map이라는 속성을 읽어올 수 없다고 합니다. 이는 `this.members`를 불러오지 못하기 때문입니다. **Arrow function은 자신의 탐색범위(scope)인 함수 내부에서 `this`를 따로 만들지 않고 "상위 함수"의 `this`를 가져옵니다.(해당 범위로써 `this`를 생성하는 것을 `바인딩(binding)`한다고 합니다.)** 그렇기 때문에 arrow function 안에서 this를 사용해도 object의 탐색범위가 객체 내부가 되는 것이 아닙니다.(위 예제에는 global(전역 스코프)로 남아 있습니다.)  그렇기 때문에 arrow function을 유의해서 사용해야 합니다.

This에 관련된 설명은 따로 다루겠습니다.



## 연산자, Operator

연산자는 연산을 위한 기호들을 말합니다.

### 산술연산자

덧셈`+`, 뺄셈`-`, 곱셈`*`, 나눗셈`/`, 나머지`%`입니다. 자바스크립트는 나눗셈이 몫을 나타내지 않고 소숫점까지 나타냅니다. 

### 문자열연산자

문자열과 문자열을 더하면 문자열이 연결됩니다.

```javascript
const string = 'Javascript '+'is '+'good';	// 'Javascript is good'
```

숫자와 문자열을 더하면 숫자는 문자열 취급합니다.

### 증감연산자

```javascript
const num = 0;
console.log(num++);	//0, 동작 후에 증가
console.log(++num);	//2, 증가한 후에 동작
```

### 대입연산자

```javascript
const num = 0;	//대입
num += 10;	//num = num + 10;
```

### 비교연산자

프로그래밍 언어에서는 같다가 `==`로 표현됩니다. 같다 이외에 `>`, `<`, `<=`, `>=`, `!=`를 사용할 수 있습니다.

### 삼항연산자

(조건?참 : 거짓)으로 이루어져 있습니다.

```javascript
i = 2
const num = i > 10 ? 100 : 200;	//조건이 false이므로 i=200
```

### 논리연산자

그리고`&&`, 또는 `||`,  ~아닌`!`가 있습니다. 단순히 논리 연산자가 아닌 다음과 같이도 사용됩니다.

```javascript
const num = a&&b;	//a가 True일 때 num=b, a가 false일 때 num=a;
const num = a||b;	//a가 Ture일 때 num=a, a가 false일 때 num=b;
```

`Syntactic Sugar`중에 하나인 몰라도 그만 알아두면 편한 것입니다. 



### 조건문 및 반복문

조건문은 `if`와 `switch`를 사용합니다.

```javascript
switch(a){
    case 1:
        console.log('10');
        break;
    case 2:
		console.log('9');
        break;
    default:
        console.log('etc');
}
```

반복문은 `for`와 `while`을 사용합니다.

`do ~while`은 무조건 한번은 실행한 뒤에 조건을 확인합니다.