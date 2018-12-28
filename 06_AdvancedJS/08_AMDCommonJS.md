# AMD와 CommonJS

다른 사람이 작성해놓은 자바스크립트를 다음과 같이 불러와서 사용가능했습니다.

```html
<script src = 'jquery.js'></script>
<script src = 'abab.js'></script>
<script>
    window.var1
    window.var2
</script>
```

`var1`와  `var2`라는 변수가 window에 추가되고 그걸 사용할 수 있습니다. 하지만 저 두개의 자바스크립트 코드에서 같은 변수의 이름을 사용할 때 충돌이 일어나게 됩니다. 그래서 내가 사용할 코드만 미리 지정해놓고 사용할 수 있게 끔 하는 해결방안이 나오기 시작했습니다.

## AMD

Asynchronous Module Definition의 약자입니다. 이 방식을 구현한 가장 유명한 스크립트가 `requireJS`입니다. requireJs를 다운받아서 다음과 같이 사용하면 됩니다.

```html
<script src = 'require.js'></script>
```

```javascript
//myModule.js
define(['jquery', 'abab'], function(var1, var2){
    console.log(var1);
    console.log(var2);
    return {
        a: var1,
        b: var2,
    }
});
```

`define`의 첫번째 매개변수로 사용할 자바스크립트 파일의 이름을 넣고 두번째 인자에서 매개변수를 콜백함수로 받으면 됩니다. 이제 가져온 두개의 자바스크립트를 충돌없이 사용할 수 있는 새로운 모듈을 만들었습니다. 이제 아래와 같이 사용할 수 있습니다.

```javascript
require(['myModule', 'hello'], function(arg1, arg2){
    console.log(arg1.a);
    console.log(arg1.b);
    console.log(arg2);
    console.log(jquery);		//충돌로 인한 에러(or undefined)
})
```



## CommonJS

CommonJS는 노드에서 채택한 방식입니다. 즉 서버사이드에서 자주 사용되는 방식입니다. (AMD는 브라우저 사이드에서 자주 사용됩니다.)

```javascript
//myModule.js

const jq = require('jquery');
const ab = require('abab');
module.exports = {
    a: var1,
    b: var2,
};
```

`require`로 스크립트를 불러온 뒤, `module.exports`로 모듈화 시키고 싶은 변수를 넣어주면 됩니다.

```javascript
const my = require('myModule');

console.log(my.a);
console.log(my.b);
```



## UMD

AMD와 CommonJS의 호환문제로 나온 방식입니다. AMD는 `define`을 사용하고 CommonJS는 `module.exports`를 사용하기 때문에 이를 이용해서 함께 사용할 수 있습니다.

```javascript
(function(root, factory){
    if(typeof define === 'function' && define.amd){		//AMD
        define(['jquery', 'abab'], factory);
    }else if(typeof module === 'object' && module.exports){		//CommonJS
        module.exports = factory(require('jquery'), require('abab'));
    }else{		//window
        root.myModule = factory(root.var1, root.var2);
    }
})(this, function(var1, var2){
    return{
        a: var1,
        b: var2,
    };
});
```

AMD나  CommonJS 모두, 함수냐 객체냐를 기준으로 수용하고 있습니다.