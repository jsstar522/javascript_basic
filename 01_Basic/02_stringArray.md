# 문자열과 배열, String & Array

## 문자열, String

문자열은 문자 여러개를 나열한 것입니다. 

```javascript
const a = 'Hello';
```

자바스크립트에는 다음과 같은 자료형이 존재합니다.

* Boolean : True, False
* null : null값을 나타냄
* undefined : 값이 저장되어 있지 않는 최상위 속성
* Number : 정수 또는 실수형 숫자
* String : 문자열
* Symbol : 인스턴스가 고유하고 불변인 데이터
* Object : 객체

C언어에서는 String 자료형이 존재하지 않았기 때문에 char[ ]이나 포인터로 문자열을 표현했죠. C++에서는 namespace std에서 String이라는 클래스를 불러와서 사용합니다. **Javascript에는 내부적으로 문자열 자료형을 가지고 있습니다. 그리고 문자열의 메소드를 다양하게 지원하고 있습니다.** 콘솔에 `new String()`을 치면 다양한 메소드를 지원하는 것을 확인할 수 있습니다. 

```javascript
console.log(typeof(a));	//string
```



### 길이, Length

String의 길이를 알려줍니다.

```javascript
const a = 'Hello';
a.length;
```

length는 메서드가 아닌 Property이기 때문에 뒤에 `()`를 붙이지 않습니다.

### 자리수, charAt

string에서 특정자리에 위치한 문자를 알려줍니다. 배열처럼 해당자리의 문자를 뽑아내는 방식도 사용 가능합니다.

```javascript
const a = 'Hello';
a.charAt(4);
a[4];
```

### 문자열 나누기, Split

문자열을 나눈 뒤 배열로 표시합니다. `split()` 함수 안에는 구분자가 들어갑니다. 구분자를 통해 앞뒤로 나눕니다.

```javascript
const a = 'Hello';
a.split('');	//모든 단어를 하나씩 나눔
a.split('e');	//e를 기준으로 앞뒤로 나눔
```

### 문자열 추가, Concat

문자열 뒤에 문자열을 붙입니다.

```javascript
const a = 'Hello';
const b = 'Bye';
a.concat(b);
```

### 공백 제거, Trim

문자열 좌우 공백을 제거합니다.

```javascript
const a = ' He llo ';
a.trim();	//He llo
```

### 문자열 자르기, Substr & Slice

`substr(시작점 위치, 길이)`로 사용합니다. 시작점 위치부터 길이만큼 잘라냅니다. 

```javascript
const a = 'Hello';
a.substr(2,3);	//llo
a.slice(2,4); //ll
a.slice();	//Hello
```

또한 `substring(시적점 위치, 끝점 위치)`로 사용가능합니다.

`slice(시작점, 끝점)`으로도 사용가능합니다. `slice()`는 시작위치를 음수로 사용할 수 있습니다.(음수는 뒤에서부터 몇번째인지 인덱싱)

### 문자열 대체, Replace

```javascript
const a = 'Hello';
a.replace('He','Ya');	//Yallo
```



### 문자열 찾기, indexOf

`indexOf('찾을단어')`로 사용가능합니다. 하지만 문자가 중복될 때, 최초 문자의 위치만 출력됩니다. 뒤에서부터 찾으려면 `lastIndexOf('찾을단어')`로 사용할 수 있습니다.



## Number와 Math 객체, Number & Math Object

### Number

컴퓨터가 계산을 할 때는 이진법으로 바꿔서 계산한 뒤, 다시 우리가 알아볼 수 있도록 10진법으로 나타냅니다. 2진법으로 바꾸는 과정에서 나누어 떨어지지 않는 값이 나올 때, 뒷부분을 버립니다. 이렇게 오차가 생길 수 있기 때문에, **소수가 있는 수끼리의 연산에는 오차가 생길 수 있기 때문에 정수로 바꿔준 뒤 계산하는 메서드들이 따로 있습니다.** 

#### 반올림, toFixed

`toFixed(소수자리)` 해당 소수자리 수까지 반올림합니다. 그리고 결과는 `문자열`로 나타냅니다.

#### 잘라내기, toPrecision

`toPrecision(나타낼 자리수)` 0을 제외한 숫자를 만난 이후부터 나타낼 자리 수만큼만 보여줍니다.

#### 숫자 뽑아내기

`isNaN(숫자or문자)` 숫자인지 아닌지 판단합니다. **숫자가 아니라면 True를 반환합니다.**

`parseInt(숫자, 진법)` ~진법 숫자로 바꿔줍니다. 숫자와 문자가 포함되어 있는 문자열이라면 숫자만 Int로 변환한 뒤 반환합니다.

`parseFloat(숫자)` 실수로 바꿔줍니다.

`Number(숫자or문자)` parseInt와 비슷하지만 숫자가 포함된 문자열은 처리하지 못하고 NaN을 출력합니다.

### Math 객체

#### 무작위 숫자, Random

`Math.random()` 0부터 1까지 무작위 숫자를 반환합니다.

#### 내림, Floor

`Math.floor(숫자)` 숫자를 내림합니다.

#### 올림, Ceil

`Math.ceil(숫자)` 숫자를 올림합니다.

#### 반올림, Round

`Math.round(숫자)` 숫자를 반올림합니다.

#### 절대값, Abs

`Math.abs(숫자)` 숫자의 절대값을 반환합니다.

#### 제곱 및 제곱근, Pow & Sqrt

`Math.pow(숫자, 지수)` 제곱을 나타냅니다.

`Math.sqrt(숫자)` 숫자의 제곱근을 나타냅니다.

#### 최대값 및 최소값, Max & Min

`Math.max(숫자, 숫자, 숫자, ...)`숫자들 중에서 가장 큰 값을 반환합니다.

`Math.min(숫자, 숫자, 숫자, ...)`숫자들 중에서 가장 작은 값을 반환합니다.



## 배열, Array

배열은 상당히 많은 메소드를 제공하고 있기 때문에 자주 사용됩니다.

#### 길이, Length

`array.length` 배열의 길이를 알 수 있습니다.

#### 합치기, Join

`array.join('구분자')` 구분자를 넣어 새로운 string을 만듭니다.

```javascript
const a = [1, 2, 3];
a.join('');	//"123"
a.join();	//"1,2,3"
a.join('a');	//"1a2a3a"
```

#### 추가하기, Concat & Push & Unshift & Shift

`array.concat(숫자, 숫자, 숫자, ...)` 배열에 숫자를 추가해 배열로 반환합니다.

`array.push(숫자, 숫자, ...)` 배열에 맨 뒤에 숫자를 추가한 뒤 **배열의 길이를 반환합니다.**

#### 제거하기, Pop

`array.pop()` 배열의 맨 뒷 요소를 제거하고 그 요소를 반환합니다.

#### 제거하고 추가하기, Splice

`array. splice(시작점, 지울개수, 넣을 숫자)` 시작점을 기준으로 몇개를 지울 것인지, 어떤 숫자를 넣을 것인지 작업할 수 있습니다.

#### 뒤집기, Reverse

`array.reverse()` 배열을 뒤집습니다.

####배열반복, Map & ForEach

`array.map(function(배열값, 자리수){조건})` for문을 쓰지 않고 배열의 자리를 1대1로 매핑해 돌아가면서 조건식으로 사용할 수 있습니다.

```javascript
const a = [1,2,3,4];
a.map(function(unit){
    return unit*2;
});
```

`array.forEach(function(숫자, 자리수){조건})` array.map()과 같지만 조건식을 통해 바뀐 배열을 반환하지 않습니다.

#### 배열반복, Reduce

`array.reduce(function(이전값,현재값){조건}, 초기값)`  배열의 자리를 돌아가면서 현재값을 없애면서 이전값과 현재값을 연산한 뒤 최종값을 반환합니다.

````javascript
const a = [1,2,3,4];
a.reduce(function(x,y){
    return x + y;
});	//10
````

#### 필터링하기, Filter

`array.filter(function(배열값){조건})` 조건에 해당되는 값만 뽑아내 배열을 만듭니다.

````javascript
const a = [1,2,3,4];
a.filter(function(unit){
	return unit>=3;    
});
````

#### 오름차순 & 내림차순, Sort

`array.sort(function(이전값, 현재값){조건})` 버블정렬 알고리즘을 통해 오름차순과 내림차순으로 배열을 정리하고 반환합니다. 다른 언어에서는 `array.sort()` 만 사용해서 오름차순과 내림차순을 정리하지만 자바스크립트에서는 안쪽에 함수를 적어줍니다.

```javascript
const a = [3,2,4,1];
a.sort(fucntion(x, y){
       return x-y;
       });	// [1,2,3,4]
```

#### 요소찾기, IndexOf

`array.indexOf(숫자)` 앞에서부터 해당 숫자를 배열에서 찾으면 자리수를 반환합니다.

`array.lastIndexOf(숫자)` 뒤에서부터 해당 숫자를 배열에서 찾으면 자리수를 반환합니다.

#### 참과 거짓, Every & Some

`array.every(function(배열값){조건})` 배열값이 해당 조건에 모두 충족하면 True, 그렇지 않으면 False를 반환합니다.

```javascript
const a = [2,4,6,8];
a.every(function(x){
    return x%2==0;
})	//True
```

`array.some(function(배열값){조건})` 배열값이 해당 조건에 하나라도 충족하면 True, 모두 충족하지 않으면 False를 반환합니다.

#### 배열인지 확인, IsArray()

`array.isArray(배열)` 배열인지 아닌지 판별합니다.



#### 정해지지 않은 배열의 크기, `...`

`...배열` 은 정해지지 않은 크기의 배열을 숫자의 나열로 표현합니다. 

```javascript
const a = [1,2,3,4];
const b = ['a','b','c',...a];	//['a','b','c', 1, ,2 ,3, 4]
```

`...`을 사용하면 다음과 같이 입력값의 크기가 정해지지 않은 함수를 만들기 수월해집니다. 다음은 정해지지 않은 크기의 배열의 모든 수를 더하는  함수 입니다.

```javascript
function product(...array){
    return array.reduce(function(prev,next){
        return prev+next;
    },0)
}
product(1,2,3,4);	//10
```

`product()` 에 어떤 크기의 숫자들이 들어와도 array라는 배열로 만들어서 처리합니다.

