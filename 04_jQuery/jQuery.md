# jQuery

## jQuery 란

jQuery는 자바스크립트와 HTML사이의 상호작용을 더 손쉽게 하기 위한 자바스크립트 라이브러리입니다. 가장 대표적인 예로 DOM에서 Element(태그)를 찾아 쉽게 조작할 수 있습니다. jQuery는 HTML 문서에 `<src = 'jQuery 파일경로'>` 를 통해 라이브러리를 사용할 수 있습니다.

## jQuery 사용

 jQuery가 내부적으로 어떻게 동작하는지 다음을 보면 알 수 있습니다.

```javascript
function jQuery(a,c) {
  // Shortcut for document ready (because $(document).each() is silly)
  if ( a && a.constructor == Function && jQuery.fn.ready )
    return jQuery(document).ready(a); // (1)
 // Make sure that a selection was provided
  a = a || jQuery.context || document; // (2)
 // Watch for when a jQuery object is passed as the selector
  if ( a.jquery )
    return $( jQuery.merge( a, [] ) ); // (3)
 // Watch for when a jQuery object is passed at the context
  if ( c && c.jquery )
    return $( c ).find(a); // (4)
 // If the context is global, return a new object
  if ( window == this )
    return new jQuery(a,c); // (5)
 // Handle HTML strings
  var m = /^[^<]*(<.+>)[^>]*$/.exec(a);
  if ( m ) a = jQuery.clean( [ m[1] ] ); // (6)
 // Watch for when an array is passed in
  this.get( a.constructor == Array || a.length && !a.nodeType && a[0] != undefined && a[0].nodeType ?
  // Assume that it is an array of DOM Elements
  jQuery.merge( a, [] ) :
 // Find the matching elements and save them for later
  jQuery.find( a, c ) ); // (7)
 // See if an extra function was provided
  var fn = arguments[ arguments.length - 1 ]; // (8)
 // If so, execute it in context
  if ( fn && fn.constructor == Function ) // (9)
    this.each(fn);
}
// Map over the $ in case of overwrite
if ( typeof $ != "undefined" )
  jQuery._$ = $;
// Map the jQuery namespace to the '$' one
var $ = jQuery;
```

결국 **이 모든 기능을 `var $ = jQuery;` 로 함축되므로 `$` 을 사용하면 됩니다.** 

먼저 일반 함수를 실행해보겠습니다. 

**jQuery 라이브러리를 포함한 HTML 문서 혹은 본인이 직접 jQuery 라이브러리를 사용해 만든 페이지에서 테스트 해보세요.**

```javascript
$(function(){alert('Hello')});
```

`$` 안에 함수가 들어가 있으므로 `(1)`에서 걸리고 알람으로 리턴합니다. `jQuery(document).ready(function(){alert('Hello')});`가 실행된거죠. 콘솔창에 그냥 `alert('Hello');`를 친 것과 결과는 같지만 `jQuery(document).ready(function(){alert('Hello')});`에 있는 `ready` 는 페이지가 모두 로드된 후에 함수를 실행한다는 차이점이 있습니다. **즉 `$(function(){내용})`은 페이지 로드 이후에 함수를 실행하는 jQuery의 기본적인 첫번째 기능입니다.** 이번에는 CSS 선택자를 넣어보겠습니다.

```javascript
$('#hplogo');
```

구글의 로고를 가르키는 선택자가 return 됩니다. 위의 jQuery 생성자 함수에서 과정을 살펴보면 `(5)` 에서 다시 jQuery 객체를 만들고 같은 과정을 반복합니다. `this != window` 이므로 `(5)`까지 건너뛰고 `(7) jQuery.find(a,c);`에서 실행됩니다. `find`는 jQuery의 prototype에 정의되어 있습니다. 선택자 `hplogo`의 id를 찾고 return합니다. jQuery의 `find`함수는 jQuery의 prototype인 `jQuery.fn` 에서 볼 수 있습니다. 
(http://code.jquery.com/jquery-3.1.1.js 참고)