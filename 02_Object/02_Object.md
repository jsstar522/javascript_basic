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

