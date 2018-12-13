# BOM 과 DOM

## Window 객체

Window 객체는 브라우저의 변수와 요소, 자바스크립트 엔진을 담고 있는 객체입니다. 그리고 Widow 객체 안에는 웹사이트를 담당하는 Document 객체(DOM)를 포함하고 있습니다.

```javascript
window
```

`window`를 콘솔에 쳐보면 window의 객체안에 어떤 변수와 객체들이 들어 있는지 확인할 수 있습니다. 닫는 창을 누르면 브라우저가 종료되고 창의 크기를 조절하면 동작하는 내용등… 브라우저에 관련된 모든 객체들은 window 객체안에 깔끔하게 정리되어 있습니다. 그리고 우리가 사용하는 수많은 자바스크립트 메소드들 (`string.split()`,`string.concat() `,`array.join()`…)은 이 window 객체 안에 들어가 있는 객체들 덕분에 브라우저에서 사용할 수 있는겁니다. 간단하게 메소드를 사용해보겠습니다. 다음은 메소드를 통해 새로운 페이지를 여는 코드입니다.

```javascript
open('https://google.com/');	//구글창이 열린다
open('https://google.com/', '_self');	//구글창이 현재탭에서 이동한다.
```

우리가 주소창에 검색어를 넣고 Return키를 누르는 동작을 이러한 메소드에 연결시켜 놓으면 Interface가 완성되는거죠. 



## BOM, Browser Object Model

Document, 웹 페이지에 대한 요소를 담고 있는 DOM을 제외한 모든 객체를 BOM이라고 합니다. 브라우저 뿐만 아닌 운영체제에 대한 정보가 들어있고 브라우저 동작에 대한 메서드(자바스크립트 엔진)도 들어있습니다. 

브라우저를 실행하면 실행하는 사용자의 정보도BOM에 담기 때문에 우리가 직접 확인할 수 있습니다.

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





