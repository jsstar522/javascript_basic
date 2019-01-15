# 템플릿 엔진, Template Engine

템플릿 엔진은 자바스크립트가 HTML 문서를 렌더링할 수 있게 해줍니다. 템플릿 엔진으로는 대표적으로 Pug와 EJS가 있습니다.

## PUG(Jade)

Pug이라는 템플릿 엔진을 사용하기 위해서는 다음과 같이 명시합니다.

```javascript
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```

첫번째 인자 'views'는 템플릿 파일들이 위치한 폴더를 지정한다는 의미이고 두번째 인자에 템플릿 엔진이 있는 폴더를 지정합니다. 'view engine'은 어떤 엔진을 사용할지 지정한다는 의미입니다. **이렇게 앱을 설정해두면 `res.render()`가 'views'에 있는 템플릿 파일을 찾아 렌더링 합니다.** 

### 변수

```jade
<!--views/index.pug-->
extends layout

block content
  h1= title
  p Welcome to #{title}
```

**위의 예시처럼 pug는 html과는 다르게 `코드`를 작성할 수 있습니다(title= title부분).** 변수는 `res.render()`로 렌더링할 때 **서버로부터** 받아서 넣을 수 있습니다. `#{변수}`로 변수를 받을 수도 있습니다.

```javascript
router.get('/', function(req, res, next) {
  console.log('실행');
  res.render('index', { title: 'Express' });
});
```

* res.render의 인자로 넣지 않아도 `res.local.title = 'Express';`로 넣을 수도 있습니다. 
* pug 문서 안에 `- var title = "Express"`의 방식으로 pug파일안에서 직접 변수를 선언할 수 있습니다. 

이렇게 문서에 코드를 작성할 수 있다면 반복문이나 조건문과 같은 문법으로 문서를 편하게 작성할 수 있습니다.

`<>`가 아닌 들여쓰기로 태그를 구분합니다. style이나 script 태그 뒤에 CSS나 javascript 코드를 작성하고 싶다면 태그 뒤에 점(.)을 붙여 사용합니다.

```jade
style.
	h1{
        font-size: 30px;
	}
script.
	var message = "PUG";
	alert(message);
```

### 반복문

반복문은 each로 사용합니다.

```jade
ul
	each num in [1, 2, ,3 , 4]
		li= num
```

### 조건문

조건문은 if~else로 사용합니다.

```jade
if loggedIn
	div 로그인 성공
else
	div 로그인 실패
```

### include

다른 pug파일을 불러올 수 있습니다.

```jade
h1 index 파일입니다.
include index
```

### extends / block

정해진 레이아웃을 사용할 때 extends를 사용합니다. extends로 적용시킬 템플릿을 만들고 다른 내용을 넣으려면 block을 사용합니다.

```jade
<!--views/layout.pug-->
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    header 헤더
    block content
    footer 푸터
    block javascript
```

```jade
<!--views/test.pug-->
extends layout

block content
  main
    p block으로 넣은 부분입니다.

block javascript
  script(src="/javascripts/main.js")
```



## EJS

EJS라는 템플릿 엔진을 사용하기 위해서 다음과 같이 명시합니다.

```javascript
app.set('veiws', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```

EJS는 HTML 문법을 그대로 사용하면서 코드를 작성할 수 있는 템플릿 엔진입니다. 

```ejs
<h1>
    <%=title %>
</h1>
<button class="<%=title%>" type="submit">
    전송버튼
</button>
```

### 변수

`<% %>`안에 변수를 선언할 수 있습니다. `<%= %>`로 변수를 사용합니다.

```ejs
<%
	var title = "Express"
    var name = "park"
%>

<p>
    타이틀은 <%= title %> 입니다.
</p>
```

### 반복문 / 조건문

`<% %>`안에 자바스크립트의 반복문과 조건문을 모두 사용할 수 있습니다.

```ejs
<% for(var i=0; i<10; i++){ %>
    <li> <%=i%> </li>
<% } %>


<% if(loggedIn){ %>
	<li> 로그인 성공 </li>
<% } %>
```

