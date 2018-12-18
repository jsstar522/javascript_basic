# 실행 컨텍스트, Execution Context

## 컨텍스트 생성과정

**실행 컨텍스트는 실행환경을 의미합니다. 실행 컨텍스트를 이해해야 자바스크립트가 동작하는 원리를 알 수 있습니다.** 

* 코드를 실행하면(브라우저가 스크립트를 로딩해서 실행) 가장 먼저 `전역 컨텍스트`가 생깁니다. 그리고 함수를 호출(실행)할 때마다 `함수 컨텍스트`가 생깁니다. 함수 별로 다른 스코프를 갖고 있기 때문에 함수마다 다른 함수 컨텍스트를 생성합니다. 
* 컨텍스트 안에는 `변수 객체` `scope chain` `this`가 생성됩니다.
* 함수의 실행은 함수 컨텍스트가 생긴 뒤에 이뤄집니다. 예를들어 함수 안에 변수를 찾지 못하면 `scope chain`을 통해 전역 스코프 방향으로 이동하면서 변수를 찾습니다.
* 함수가 종료되면 컨텍스트도 사라집니다. 전역 컨텍스트는 페이지가 종료되면 사라집니다.

다음과 같은 코드에서 컨텍스트가 생성되는 과정을 살펴보겠습니다.

```javascript
var name = 'park';
function wow(word){
    console.log(word + '' + name);
}
function say(){
    var name = 'lee';
    console.log(name);
    wow('hello');
}
say();	//lee hello park
```



### 전역 컨텍스트

실행과 동시에 가장 먼저 생기는 전역 컨텍스트입니다.

```javascript
변수객체: {
    arguments : null,
        variable : ['name','wow', 'say']
}
scopeChain : [전역 변수객체]
this : window
```

이후 variable의 대입이 시작됩니다.

```javascript
variable : [{name: 'park'},{wow: function},{say: function}]
```

**함수가 표현식일 때는 곧바로 대입되지 않습니다.**

### 함수 컨텍스트(say)

이제 say 함수가 실행되면서 `say 함수 컨텍스트`가 생깁니다. 인자는 없으니 arguments는 null입니다.

```javascript
변수객체: {
    arguments : null,
        variable : ['name']
}
scopeChain : [say 변수객체, 전역변수객체]
this : window
```

```javascript
variable : [{name: 'lee'}]
```

이제 `console.log(name)`이 실행되면 'lee'을 출력합니다.

### 함수 컨텍스트(wow)

say 함수 안에서 wow 함수가 실행됩니다. 그럼 `wow 함수 컨택스트`가 생깁니다. **say 컨텍스트 안에 wow를 정의한 부분이 없으므로 scope chain 원칙에 따라 전역 변수객체에서 찾습니다. 전역 변수객체에 wow가 있으므로 실행합니다.** 인자는 'hello' 이므로 arguments는 'hello'입니다. 여기서 유의할 점은 wow 함수 컨텍스트의 scope chain은 `wow 변수객체`,` say 변수객체`,` 전역변수객체`가 아닙니다. Lexical scoping(함수 실행이 아닌 선언 당시에 Scoping) 원칙에 따라서 `wow 변수객체` `전역변수객체` 가 됩니다. (function wow로 wow를 선언할 때 생긴겁니다) this도 마찬가지 원칙으로 window 입니다.

```javascript
변수객체: {
    arguments : [{word : 'hello'}],
        variable : null,
}
scopeChain : [wow 변수객체, 전역변수객체]
this : window
```

### 함수 실행

이제 모든 컨텍스트가 생성됐으니 함수가 실행됩니다.`say함수`가 실행되면 `console.log(name)`의 name을 `say 함수 변수객체`에서 찾습니다. 그렇다면 'lee'가 출력되겠죠. 이어서  `wow 함수`  `console.log(word+' '+name)` 에서 변수와 인자는 `wow 함수 변수객체` 에서 찾아서 실행됩니다. **`word`는 wow 함수 변수객체의 argument에 있으므로 'hello', `name`은 없으므로 scope chain의 원칙에 따라 `wow 함수 scopechain`의 두번째에 위치한 전역변수객체에서 찾습니다.** 그러면 "hello park"이겠네요.



## 호이스팅

**호이스팅이란 변수를 선언하고 초기화 했을 때, 선언문이 최상단으로 끌어올려지는 현상을 말합니다.** 호이스팅은 다음과 같은 코드가 동작하게 합니다.

```javascript
console.log(name);
say();
function say(){
    console.log('hello');
}
var name = 'park';
```

**전역 컨텍스트가 생긴 뒤 함수가 실행되기 때문에 가능한 일입니다.** 호이스팅이 일어나면 다음과 같아집니다.

```javascript
function say(){
    console.log('hello');
}
var name = 'park';
console.log(name);
say();
```

하지만 함수 표현식(`var say = function(){}`)으로 사용하면 호이스팅은 일어나지 않습니다. 그 이유는 함수 선언식(`function say(){}`)은 컨텍스트가 생기고 나서 바로 함수로 대입되지만 함수 표현식은 대입이 바로 일어나지 않기 때문입니다. 



## 명시적 바인딩, Explicit Binding

Context에서 this는 항상 window를 가르킨다고 했습니다. 하지만 임의로 조정할 수 있습니다. 특정 객체에 `this`를 지정할 수 있습니다. 함수자체에 내장되어 있는 기본 메서드로 사용할 수 있습니다. 함수의 메서드 중에서 가장 많이 사용되는 메서드는 `call`, `apply`, `bind` 입니다. 이 메서드를 다음과 같이 기본적으로 사용할 수 있습니다.

```javascript
var example = function(a,b,c){
    return a + b + c;
};
example(1,2,3);
example.call(null,1,2,3);
example.apply(null, [1,2,3]);
example.bind(null);
```

`apply`는 `call`과 같은 기능이지만 인자를 하나로 묶어서 배열로 만들어 넣습니다. `null`에 들어가는 부분이 this를 가르키는 부분입니다. `call`과 `apply`는 함수를 실행하지만 `bind`는 실행하지 않습니다. 대신 함수자체를 반환합니다. 이제 다른 객체를 만들어서 객체의 지역변수객체를 바깥쪽에서 사용해보도록 하죠.

```javascript
//window
var a = 10;
var b = 20;
var c = 30;

var example = function(){
    return this.a + this.b + this.c;
};

//새로운 객체
var abc ={
    a : 1,
    b : 2,
    c : 3,
}


example();	//60
example.call(abc);	//6
```

가장 먼저 `window` 전역변수객체에 a, b, c가 들어가고 새로운 `객체 abc`에 다시 a, b, c가 들어갔습니다. **`example 함수`를 실행할 때 그냥 실행하면 전역 변수객체에 있는 `example`은 window에서 전역변수를 가져옵니다.** 하지만 **`call`을 통해 binding을 하면 `abc 변수객체`에서 변수를 가져옵니다.** 