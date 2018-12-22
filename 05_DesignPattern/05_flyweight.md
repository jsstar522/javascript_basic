# 플라이급 패턴, Flyweight Pattern

객체의 상태를 공유 풀에 형성해서 메모리를 절약하는 방식입니다. **공통적으로 가지고 있는 속성은 새로 생성하지 않고 공유하는 방식입니다.** 

```javascript
var Legionary = (function(){
    function Legionary(name){
        this.name = name;
        this.hp = 50;
        this.att = 5;
        this.attack = function(target){
            console.log(this.name + '가' + target + '을 공격!');
        };
    }
    return Legionary;
})
```

다음과 같이 코드를 작성하면 객체를 만들 때마다 같은 내용의 `attack 함수`를 모두 가지고 있으므로 메모리 낭비를 하게 됩니다.

```javascript
var Legionary = (function(){
    function Legionary(name){
        this.name = name;
        this.hp = 50;
        this.att = 5;
    }
    Legionary.prototype.attack = function(target){
        console.log(this.name + '가' + target + '을 공격!');
    };
    return Legionary;
})();
```

이렇게 프로토타입으로 함수를 등록시켜놓으면 **객체는 `attack 함수`를 실행시킬 때마다 Legionary 생성자의 프로토타입을 참조해 사용할 수 있습니다.** 이러한 이유 때문에 생성자 안쪽에 함수를 일일이 생성하지 않습니다. 이제 함수 뿐만 아니라 공유할 수 있는(공통되는) 속성을 모두 프로토타입으로 등록하면 메모리를 더 절약할 수 있습니다.

```javascript
var Legionary = (function(){
    function Legionary(name){
        this.name = name;
    }
    Legionary.prototype.hp = 50;
    Legionary.prototype.att = 5;
    Legionary.prototype.attack = function(target){
        console.log(this.name + '가' + target + '을 공격!');
    };
    return Legionary;
})();
```

`name`만 다르게 설정되고 `hp`와 `att`는 같은 값으로 생성된다면 위와 같은 코드가 훨씬 효율적입니다.

```javascript
var park = new Legionary('park');
var lee = new Legionary('lee');
var kim = new Legionary('kim');

console.log(park);			//Legionary { name: 'park' }
console.log(park.__proto__);	//Legionary { hp: 50, att: 5, attack: [Function] }

console.log(park.hp);		//50
park.hp = 40;
console.log(park);			//Legionary { name: 'park', hp: 40 }
console.log(park.hp);		//40
```

`park.__proto__`를 출력하면 프로토타입으로 등록해 놓은 속성들이 들어가 있습니다. 

* 처음  `park.hp`를 출력하면 객체안에 `hp` 속성이 없으므로 프로토타입에서 `hp`를 찾습니다. 50으로 등록해 놓았기 때문에 50이 출력됩니다.
* `park.hp = 40;` 은 `park` 객체 안에 속성으로 넣습니다.
* 이후에는 `park.hp`를 출력할 때마다 40을 출력합니다.