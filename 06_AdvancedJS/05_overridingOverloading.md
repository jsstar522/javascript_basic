# 오버로딩과 오버라이딩, Overloading & Overriding

## 오버로딩, Overloading

```java
//자바에서 오버로딩
void overload(){
    System.out.println('매개변수 X');
}
void overload(int i, int j){
    System.out.println('매개변수' + i + '와' + j);
}
void overload(double d){
    System.out.println('매개변수' + d);
}
```

자바에서는 위 세개의 함수는 모두 다른 함수로 취급합니다. 자바스크립트가 아닌 다른 언어에서는 매개변수의 개수나 자료형에 따라 함수를 다르게 선언합니다. **자바스크립트에서 위에 있는 예시처럼 함수를 선언하면 제일 나중에 선언한 함수가 나머지 함수를 덮어 씌웁니다. 그렇기 때문에 매개변수에 따라 다른 함수로 작동하는 방식이 필요합니다. 이를 오버로딩이라고 합니다.** 가장 대표적인 것이 제이쿼리의 `$` 함수와 `on`함수입니다.

```javascript
$(document)		//DOM 접근
$('#search')	//선택자

on('click', function(){alert('Hello')})		//이벤트리스너
on('click', '#search', function(){})		//이벤트 Delegation
```

매개변수의 개수가 다르거나 매가변수의 자료형이 달라도 우리가 원하는 방식으로 함수는 동작합니다. 이러한 오버로딩은 자바스크립트에서 다음과 같이 구현할 수 있습니다. 매개변수로 `문자열 + 문자열 + 콜백`으로 3개가 들어갈 수도 있고, `콜백`만 들어갈 수 있습니다.

```javascript
//자바스크립트에서 오버로딩
function overload(a, b, c){
    if(typeof c === 'function'){
        c(a, b);
    }else if(typeof b === 'function'){
        b(a);
    }else{
        a();
    }
}
function callback(a,b){
    if(b){
        console.log('문자열', a, b);
    }else if(a){
        console.log('옵션객체', a);
    }else{
        console.log('매개변수 없음');
    }
}

overload('park', 'hello', callback);		//문자열 park hello
overload({name: 'park', value: 'hello'}, callback);		//옵션 객체 { name: 'park', value: 'hello' }
overload(callback);		//매개변수 없음

```

자바스크립트에는 오버로딩의 개념이 없지만 자료형에 따라 위와 같이 구현할 수 있습니다.



## 오버라이딩, Overriding

**오버라이딩은 상속받은 부모의 메서드를 새롭게 정의하는 것을 의미합니다.** 먼저 객체 상속 코드를 작성해보겠습니다.

```javascript
var Animal = function(){
};
Animal.prototype.move = function(){
    console.log('동물이 움직입니다');
};

//상속
var Cat = function(){
    Animal.apply(this, arguments);	//객체 상속
}
Cat.prototype = Object.create(Animal.prototype);	//프로토타입 상속
Cat.prototype.constructor = Cat;	//오류수정(Cat.prototype.constructor = Animal을 Cat.prototype.constructor = Cat으로)

console.log(new Animal().move());	//동물이 움직입니다.
console.log(new Cat().move());		//동물이 움직입니다.
```

객체와 메서드(프로토타입)으로 상속받았습니다. `Cat` 객체도 `move` 메서드를 가지고 있죠. 이제 `Cat`객체의  `move` 메서드를 새롭게 정의해보겠습니다.

```javascript
//오버라이딩
Cat.prototype.move = function(sound){
    console.log(sound + '소리를 내며 움직입니다')
};

console.log(new Cat().move('야옹'));
```

**이렇게 부모 객체의 메서드를 새롭게 덮어씌운 것을 오버라이딩이라고 합니다.** 