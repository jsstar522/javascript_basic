# 객체 지향 프로그래밍, Object Oriented Programming

## 생성자, Constructor

자바스크립트에는 Class가 없습니다. 다른 언에에서는 객체를 생성할 때, Class로 객체를 정의합니다. **자바스크립트는 Class가 없기 때문에 객체를 생성할 때, 생성자 함수로 정의합니다.** (Class는 객체가 생성될 때 사용되는 "청사진"일 뿐, 실제로 존재하는 객체가 아닙니다.)

```javascript
function Person(name, gender){
    this.name = name;
    this.gender = gender;
    this.sayHello = function(){
        console.log(this.name + ` said "hello"`);
    }
}
```

사람의 정보를 입력하는 생성자 함수를 만들었습니다. 생성자 함수는 `new`를 앞에 붙여서 호출합니다.

```javascript
var park = new Person('Park','male');
var lee = new Person('Lee', 'female');
```

**생성자 함수를 참조해 `park`이라는 사람과 `lee`라는 객체 2개를 만들었습니다.** 그리고 생성자 함수 안에 `sayHello`라는 함수도 만들기 때문에 `park.sayHello()`과 `lee.sayHello()`를 사용할 수 있습니다. 



## 프로토타입, Prototype

