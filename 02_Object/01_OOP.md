# 객체 지향 프로그래밍, Object Oriented Programming

## 생성자, Constructor

자바스크립트에는 Class가 없습니다.(ES5 기준, 아래에 ES6 기반 설명포함) 다른 언에에서는 객체를 생성할 때, Class로 객체를 정의합니다. **자바스크립트는 Class가 없기 때문에 객체를 생성할 때, 생성자 함수로 정의합니다.** (Class는 객체가 생성될 때 사용되는 "청사진"일 뿐, 실제로 존재하는 객체가 아닙니다.)

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

`prototype`은 생성자 함수의 **원형 객체**를 의미합니다.

**프로토타입은 해당 객체에서 사용할 수 있는 함수를 정의할 때 사용합니다.** 위와 같이 객체 리터럴 안쪽에 속성으로 함수를 정의하는 것이 아닌 바깥쪽으로 빼서 정의합니다.

```javascript
function Person(name, gender){
    this.name = name;
    this.gender = gender;
}
Person.prototype.sayHello = function(){
    console.log(this.name + ` said "hello"`);
}
```

`Person.prototype`은 생성자 함수 Person의 원형를 의미하므로 `Person.prototype.sayHello =...`는 Person 생성자 함수로 만든 객체에 들어가는 것이 아닌 `Person.prototype`으로 들어갑니다. 

위의 첫번째 예시와 똑같이 객체를 만들어 보겠습니다.

```javascript
var park = new Person('park', 'male');
```

그리고 똑같이 sayHello 함수를 실행해보겠습니다.

```javascript
park.sayHello();	//park said "hello"
```

생성자 함수 바깥쪽에 `sayHello()`를 만들었고 객체를 생성해서 출력해보면 `sayHello()`가 객체 안에 메서드로 들어가 있지 않음에도 불구하고 사용이 가능합니다. 이것을 가능하게 만드는게 `prototype` 입니다. `Person.prototype.sayHello` 는 "`sayHello` 이라는 함수를 참고해서 `Person` 객체를 만들겠다"라는 의미가 됩니다. 즉, **prototype을 사용하면 `Person` 생성자 함수로 만든 모든 객체는 prototype으로 정의한 함수를 사용할 수 있는겁니다.** 생성자 함수에 미리 사용할 함수를 정의하는 것보다 prototype으로 정의하는게 더 유리합니다. **prototype으로 함수를 정의하면 사용할 때만 참고해서 사용하지만, 생성자 함수 안에 함수를 정의하면 객체를 만들 때마다 메서드가 만들어지기 때문에 메모리 낭비가 발생합니다.** 생성자 함수가 객체를 만들 때 어떤 프로토타입을 참고하는지도 확인할 수 있습니다.

```javascript
park;	//만들어진 객체 확인

/* Person{
	gender: "male"
	name: "park"
    __proto__: {
    	sayHello: function()
    }
}
*/
```

다음과 같이 객체가 만들어질 때 직접 함수를 만드는 것이 아닌 어떤 함수를 참고할 것인지 정보가 나와있습니다.

## 상속

`__proto__`은 객체의 "부모 객체"를 담고 있습니다.

```javascript
park.__proto__.constructor;
```

프로토타입과 생성자 함수는 부모와 자식관계입니다.  

**상속은 부모로부터 정보, 혹은 속성들(위에서는 생성자 함수)을 물려받으면서 새로운 속성들을 추가하는 것을 의미합니다.** 새로운 속성들을 추가할 수 있기 때문에 확장(extend)라고도 합니다. 차량 종류에 따라 다른 속성을 가지고 있는 객체를 만들어보겠습니다. 먼저 공통적으로 들어가는 요소를 담은 생성자 함수를 만들어야겠죠.

```javascript
function Vehicle(name, speed){
    this.name = name;
    this.speed = speed;
}
```

그리고 차량 이름과 속도를 출력하는 함수를 프로토타입으로 정의하겠습니다.

```javascript
Vehicle.prototype.drive = function(){
    console.log(this.name + ' is running with '+ this.speed + 'km/h');
}
```

이제 새로운 객체를 만들어 보겠습니다.

```javascript
var porsche = new Vehicle('porsche', 120);
porsche.drive();	//porche is running with 120km/h
```

여기까지는 위에서의 코드와 동일합니다. 이제 상속을 통해 **`Vehicle` 생성자 함수의 속성은 그대로 가져오되, 특정 객체에 새로운 함수를 추가해보도록 하겠습니다.**

```javascript
function Supercar(name, speed, enginePrice, bodyPrice){
    Vehicle.apply(this, arguments);
    this.enginePrice = enginePrice;
    this.bodyPrice = bodyPrice;
}	//속성 상속
```

Vehicle의 속성을 그대로 가져오는 `Vehicle.apply(this, arguments);`로 처리한 뒤 새로운 속성을 추가했습니다. Vehicle의 this 속성을 그대로 받으라는 의미입니다. (arguments는 매개변수를 의미합니다. Vehicle과 Supercar의 매개변수 중 name과 speed가 같기 때문에 그대로 공유됩니다.) 

이제 메서드도 상속시켜야겠죠?

```javascript
Supercar.prototype = Object.create(Vehicle.prototype); //메서드 상속
```

`Supercar` 생성자 함수의 prototype에 `Vehicle` 생성자 함수의 prototype을 넣습니다. (위에서 prototype으로 만든 메서드의 정보는 객체.prototype에 있다고 했습니다.) 그리고 이 Prototype 상속과정에서 `Vehicle` 생성자 함수의 prototype을 넣으면 `prototype.constructor`가 Vehicle로 그대로 들어갑니다. 즉, 현재는`Supercar.prototype.constructor === Vehicle` 입니다. 나중에 `Supercar.메서드`로 사용하려면 이 부분을 의도적으로 바꿔줘야 합니다.

```javascript
Supercar.prototype.constructor = Supercar;
```

그리고 이제 Supercar의 메서드를 새롭게 만들어보죠.

```javascript
Supercar.prototype.totalPrice = function(){
    console.log(this.enginePrice + this.bodyPrice);
}
```

이제 Supercar를 생성하고 상속된 메서드까지 모두 사용해보겠습니다.

```javascript
var Lambo = new Supercar('Lambo', 200, 500000, 300000);
Lambo.drive();	//Lambo is running with 200km/h
Lambo.totalPrice();	//800000
```

다른 생성자 함수를 통해 생성한 prototype 메서드가 다른 생성자 함수와 잘 연결되어 있는 것을 확인할 수 있습니다.



## ES6에서의 Class

프로토타입 기반의 객체지향 언어보다 더 명료한 사용을 위해 ES6부터는 자바스크립트도 Class를 지원합니다. `Class` body 안쪽(`{}`) 에 `속성(constructor)`와 `메소드`를 넣을 수 있습니다.

```javascript
class Supercar{
    constructor(name, speed, enginePrice, bodyPrice){
        this.name = name;
        this.speed = speed;
        this.enginePrice = enginePrice;
        this.bodyPrice = bodyPrice;
    }
    drive(){
        console.log(this.name + ' is running with '+ this.speed + 'km/h');
    }
    totalPrice(){
        console.log(this.enginePrice + this.bodyPrice);
    }
}
```

```javascript
const porsche = new Supercar('porche', 120);
porsche.drive();
porsche.totalPrice();
```

