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

### 문자열 자르기, Substr

`substr(시작점 위치, 길이)`로 사용합니다. 시작점 위치부터 길이만큼 잘라냅니다. 

```javascript
const a = 'Hello';
a.substr(2,3);	//llo
```

`substring(시적점 위치, 끝점 위치)`로도 사용가능합니다.

`slice(시작점, 끝점)`으로도 사용가능합니다. `slice()`는 시작위치를 음수로 사용할 수 있습니다.(음수는 뒤에서부터 몇번째인지 인덱싱)

### 문자열 대체, Replace

```javascript
const a = 'Hello';
a.replace('He','Ya');	//Yallo
```



### 문자열 찾기, indexOf

`indexOf('찾을단어')`로 사용가능합니다. 하지만 문자가 중복될 때, 최초 문자의 위치만 출력됩니다. 뒤에서부터 찾으려면 `lastIndexOf('찾을단어')`로 사용할 수 있습니다.



## Math 객체, Math Object





## 배열, Array

