# 객체, Object

Object는 객체를 의미하기도 하고 모든 객체들의 prototype을 의미하기도 합니다. 모든 객체들의 부모라는 뜻이죠. Object 객체는 window 객체에 저장되어 있습니다. 그리고 **모든 객체는 Object 객체를 상속받기 때문에 Object 객체의 속성과 메서드를 사용할 수 있습니다.**

```javascript
Math.__proto__.constructor	//Object
```



## Object 메서드

### 상속여부, hasOwnProperty

`객체.hasOwnProperty(속성)` 객체의 속성이 상속받은 속성인지 아닌지 알려줍니다. 자신이 가지고 있는 속성이면 True, 부모의 속성이거나 속성이 없으면 False를 반환합니다.

### 원형객체 판별, isPrototypeOf

`객체.isPrototypeOf(대상)` 현재 객체가 대상의 부모인지 판별합니다.

```javascript
var GrandParent = function(){};
var Parent = function(){};
Parent.prototype;	//Object{...}
Parent.prototype = new GrandParent();	//GrandParent 객체를 Parent 생성자 함수의 원형으로 선언(부모로 선언)
Parent.prototype;	//GrandParent{...}
var Child = function(){};
Child.prototype = new Parent();

var boy = new Child();
Parent.prototype.isPrototypeOf(boy);	//true
GrandParent.prototype.isPrototypeOf(boy);	//true
```

### 프로토타입 조회, getPrototypeOf

`Object.getPrototypeOf(객체)` 객체의 프로토타입을 조회할 수 있습니다.

`Object.setPrototypeOf(객체, 프로토타입)`

### 객체의 속성 및 값 계산, toString & valueOf

…`생략`



## 객체의 복사, Object Copy

객체의 복사는 일반 변수의 복사와는 조금 다릅니다. 변수의 복사를 예로 들어보겠습니다.

```javascript
var a = "First";
var b = a;	//b=First
b = "Second";	//b=Second

console.log(a);		//First
console.log(b);		//Second
```

복사를 한 뒤 다른 값으로 바꿔도 복사한 대상은 바뀌지 않습니다. 하지만 객체는 다릅니다.

```javascript
var a = ['1','2','3'];
var b = a;

b[0] = '10';		//b = ['10','2','3'];
console.log(b);		//b = ['10','2','3'];
console.log(a);		//a = ['10','2','3'];
```

복사를 한 뒤 b만 값을 바꿔줬는데, 복사한 대상까지 바뀌었습니다. **이는 변수값 자체를 복사하는 것이 아닌 메모리의 주소를 복사하기 때문입니다.** 메모리 주소에 해당하는 값을 바꿔주면 그 주소를 호출했을 때 a와b 모두 바뀐 값을 가르키고 있죠. 이는 `문자열`, `숫자`, `불린`을 제외하고 모두 공통되는 특징입니다. 

그렇다면 복사된 값을 바꿀 때, 복사대상을 바뀌지 않게 하려면 어떻게 해야할까요? 그렇게 복사하는 것을 `Deep copy`라고 합니다. (그렇지 않은 것을 `Shallow copy`라고 합니다.) 변수객체를 따로 지정해주면 복사대상이 바뀌지 않습니다. 변수객체를 따로 지정하는 방법은 `call`, `apply`, `bind`가 있습니다.

```javascript
var a = ['1', '2', '3'];
var b = Array.prototype.slice.call(a);

b[0] = '10';
console.log(a);		//['1', '2', '3']
console.log(b);		//['10', '2', '3']
```

**배열을 자르는 함수인 `array.slice`를 통해서 변수객체를 그대로 반환하고, 변수객체의 요소들을 `call`을 통해 `a 변수객체`를 복사하는 겁니다.** 변수객체를 그대로 가져오기 때문에 b의 변수객체를 바꿔줘도 a 변수객체에 영향을 주지 않습니다. 함수를 복사할 때는 `bind`를 사용하면 됩니다. 

배열 변수객체가 아닌 객체의 변수객체도 `deep copy` 해보겠습니다.

```javascript
function copyObj(obj){
    var copy = {};
    if(typeof obj === 'object' && obj !== null){
        for(var attr in obj){
            if(obj.hasOwnProperty(attr)){	//부모로부터 물려받지 않은 속성(True)
                copy[attr] = copyObj(obj[attr]);
            }
            }
        }
    else{
		copy = obj;
    }
    return copy;
}

var obj = {a : 1, b : 2, c : {c_1 : 3, c_2 : 4}};
var obj2 = copyObj(obj);
obj2.a = 10;
```

