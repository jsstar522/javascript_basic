# BOM 과 DOM

## Window 객체

Window 객체는 브라우저의 변수와 요소, 자바스크립트 엔진을 담고 있는 객체입니다. 그리고 Widow 객체 안에는 웹사이트를 담당하는 Document 객체(DOM)를 포함하고 있습니다.

```javascript
window;
```

`window`를 콘솔에 쳐보면 window의 객체안에 어떤 변수와 객체들이 들어 있는지 확인할 수 있습니다. 닫는 창을 누르면 브라우저가 종료되고 창의 크기를 조절하면 동작하는 내용등… 브라우저에 관련된 모든 객체들은 window 객체안에 깔끔하게 정리되어 있습니다. 그리고 우리가 사용하는 수많은 자바스크립트 메소드들 (`string.split()`,`string.concat() `,`array.join()`…)은 이 window 객체 안에 들어가 있는 객체들 덕분에 브라우저에서 사용할 수 있는겁니다. 간단하게 메소드를 사용해보겠습니다. 다음은 메소드를 통해 새로운 페이지를 여는 코드입니다.

```javascript
open('https://google.com/');	//구글창이 열린다
open('https://google.com/', '_self');	//구글창이 현재탭에서 이동한다.
```

우리가 주소창에 검색어를 넣고 Return키를 누르는 동작을 이러한 메소드에 연결시켜 놓으면 Interface가 완성되는거죠. 



## BOM, Browser Object Model

Document, 웹 페이지에 대한 요소를 담고 있는 DOM을 제외한 모든 객체를 BOM이라고 합니다. **브라우저 뿐만 아닌 운영체제에 대한 정보가 들어있고 브라우저 동작에 대한 메서드(자바스크립트 엔진)도 들어있습니다. **

브라우저를 실행하면 실행하는 사용자의 정보도 BOM에 담기 때문에 우리가 직접 확인할 수 있습니다.

```javascript
navigator.userAgent;
//Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36
```

자바스크립트 엔진의 버전과 운영체제, 브라우저 종류와 버전까지 나옵니다. 페이지 뒤로가기 앞으로가기가 동작할 수 있게 하는 `histroy` 객체도 확인할 수 있습니다.

```javascript
history.forward();
history.back();
```



## DOM, Document Object Model

DOM은 html로 작성된 웹페이지(document)를 객체로 구현한 것입니다. Document 객체도 window에 들어있는 객체입니다. **브라우저는 Html로 쓰여진 웹페이지를 객체로 구현하고 이것을 DOM이라고 부릅니다.**

```html
<!DOCTYPE html>
<html>
    <head>
        <title>This is Title</title>
    </head>
    <body>
        <div>Hello</div>
    </body>
</html>
```

위와 같이 작성된 html파일은 브라우저에서 다음과 같이 구현됩니다.

```javascript
{
    document:{
        html:{
            head:{
                title: 'This is Title';
            }
            body:{
            	div:'Hello';
        	}
        }
    }
}
```

이렇게 구현되기 때문에 우리는 콘솔에 다음과 같이 내용을 끄집어낼 수 있습니다.

```javascript
document.body.childNodes[1];	//'This is Title'
```

**가장 위에 있는 document 아래에 html을 건너 뛴 후, head 혹은 body까지 접근할 수 있습니다.** 그 이후 태그 이름으로 사용하지 않고 몇번째 자식노드를 가르킬 것인지 선택합니다. (`document.body.div`로 적지 않습니다.)  `Node`는 태그와 텍스트를 말하고, 태그만을 가르키는건 `Element`라고 합니다.  

객체이기 때문에 property의 value들을 바꿔줄 수 도 있습니다.

```javascript
document.title = 'Googol';
```



DOM은 웹문서(웹페이지)에 관련된 정보들이 들어 있는 객체이기 때문에 html 태그를 조작하는데 사용되는 메서드들도 들어 있습니다. 태그 아이디를 골라내는 작업, 태그에 들어가 있는 텍스트를 반환할 수도 있습니다.

```javascript
//google.com
document.getElementById('fbar');	//페이지 맨아래에 있는 footer bar에 해당하는 태그와 그 아래 자식 태그들까지 반환

```

CSS 선택자로 골라낼 수 있습니다. 아이디는 앞에 `#`을 붙이고 클래스는 `.`을 붙입니다.

```javascript
document.querySelector('#fbar');
```

새로운 태그를 만들 수 있습니다. 새로운 태그를 많이 만들어야 할 때는 임시 document를 만들어 태그들을 추가한 뒤, 임시 document를 한번에 추가하는 것이 효율적입니다.

```javascript
const div = document.createElement('div');	//태그생성(메모리에 임시로 생성)
const text = document.createTextNode('This is text');	//텍스트생성(메모리에 임시로 생성)
const fragment = document.createDocumentFragment();	//임시 doc 생성
div.appendChild(text);	//div 태그안에 text를 넣는다.
fragment.appendChild(div);	//임시 doc에 div를 넣는다.
document.body.appendChild(fragment);	//현재 doc의 body에 추가한다.

//google 메인화면 상단에 'This is text'가 뜬다.
```