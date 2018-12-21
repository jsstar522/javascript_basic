# Partial Application와 Currying

 ## 부분적용, Partial Application

함수형 프로그래밍 중 partial application이 있습니다. **여러개의 인자를 받을 때, 일부의 인자를 고정시켜 놓은 함수를 만드는 방식입니다.** 먼저 partial application을 위해서 prototype에 메서드를 추가합니다.

```javascript
Function.prototype.partial = function(){
    var args = [].slice.apply(arguments);
    var self = this;	//binding
    return function(){
        return self.apply(null, args.concat([].slice.apply(arguments)));
    };
};
//apply : (02_Function/04_context.md) explicit binding
//slice	: (01_Basic/02_stringArray.md) 문자열 자르기
//concat : (01_Basic/02_stringArray.md) 문자열 추가
```

`arguments`를 받아서 `args`로 저장하고 있습니다. 그리고 `새로운 arguments`가 들어오면 `concat`으로 배열에 추가합니다. **`args`는  내부함수에서 `this`를 통해 `concat`을 사용하고 있습니다.** 다음과 같은 함수가 주어졌을 때 partial application을 사용해보죠.

```javascript
var plus = function(a,b,c){
    return a+b+c;
}
```

```javascript
var plus_a = plus.partial(1,2);
plus_a(3)	//6
```

**이 모든 과정을 함축한 함수가 바로 `bind`입니다. `bind` 함수로 한번에 해결할 수 있습니다.** Partial 생성자를 prototype에 추가하지 않아도 됩니다. Partial application의 원리만 이해하고 `bind` 함수를 사용합시다. 

```javascript
var plus = function(a,b,c){
    return a+b+c;
}

plus_a = plus.bind(null, 1, 2);
plus_a(3);
```



## 커링, Currying

수학자이자 논리학자인 Haskell Curry에서 따온 말입니다. **Currying도 partial application으로 부분적인 인자를 고정시켜 놓을 수 있지만 한번에 하나씩만 고정합니다. 그리고 인자를 모두 받을 때까지 같은 함수를 계속 return합니다.** 위에서 partial application은  인자가 부족하면 그냥 Nan을 출력하죠. 가장 기본적인 currying을 구현해보겠습니다.

```javascript
function multiplyThree(x){
    return function(y){
        return function(z){
            return x*y*z;
        };
    };
}
console.log(multiplyThree(2)(3)(2));		//12
```

받아야 할 인자가 많아진다면 다음과 같이 구현합니다.

```javascript
Function.prototype.curry = function(one){
    var origFunc = this;
    var target = origFunc.length;	//인자개수
    var args = [];
    function next(nextOne){
        args = args.concat(nextOne);
        if(args.length === target){
            return origFunc.apply(null,args);
        }else{
            return function(nextOne){return next(nextOne)};
        }
    }
    return next(one);
}
```

```javascript
function multiplyFour(a,b,c,d){
    return a*b*c*d;
}
console.log(multiplyFour.curry(1)(2)(3)(4));	//24
console.log(multiplyFour.curry(1)(2)(3));		//Function
```

인자가 하나 부족한 상태로 출력하면 `[Function]`이 출력됩니다. 함수를 return하기 때문에 위의 partial application 예제와 같이 인자를 고정한 상태로 함수를 활용할 수 있습니다.

```javascript
curryFunc = multiplyFour.curry(1)(2)(3);
curryFunc(4);		//24
```