# Syntactic Sugar

## 보호연산과 기본값연산

논리 연산자를 다음과 같이 줄여서 사용할 수 있습니다.

```javascript
var a;
if (b){
    a = b;
}else if (c){
    a = c;
}else{
    a = d;
}

//syntactic sugar
var a = b || c || d;
```

```javascript
var a = b;
if(b){
    a = c;
    if(c){
        a = d;
    }
}

//syntactic sugar
var a = b && c && d;
```

**`||`는 true가 나올 때까지 다음 단계로 넘어가고 `&&`는 false가 나올 때까지 다음 단계로 넘어갑니다.** 이 방식은 default값을 정할 때 자주 사용됩니다.

```javascript
function setting(option){
    var result = option || [];
    return console.log(result);
}
setting([1, 2, 3]); // [1, 2, 3]
setting();			// []
```

```javascript
function condition(cond){
    var result = cond && 'hello';
    return console.log(result);
}
condition(1);	// 'hello'
condition();	// undefined
```

`&&`는 필수조건을 걸어줄 때 사용합니다. 또한 **객체에 안전하게 접근할 때도 사용됩니다. 이를 `보호연산`이라고 합니다.**

```javascript
var a = object && object.inner && object.deeper
```



## 시간 변환

```javascript
new Date().valueOF();	//현재 시간을 밀리초로 변환
new Date().getTime();	//현재 시간을 밀리초로 변환
+new Date();			//1970년 이후로 지나간 밀리초
```



## 불린 변환

```javascript
var a = [];
var b = NaN;
!!a;	//true
!!b;	//false
```

true인지 false인지 판별하려면 `!!`을 사용합니다.



## 다차원 배열

```javascript
var array = [];
for (var i=0; i <2; i++){
    array[i] = [];
    for (var j=0; j<3; j++){
        array[i][j] = [];
        for(var k=0; k<4; k++){
            array[i][j][k] = [];
        }
    }
}
```

위와 같은 다차원 배열 선언을 다음과 같이 할 수 있습니다.

```javascript
function createArray(length){
    var arr = new Array(length||0),
        i = length;
    if(arguments.length > 1){
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 -i] = createArray.apply(this, args);
    }
    return arr;
}
var arr = createArray(2,3,4);
```

