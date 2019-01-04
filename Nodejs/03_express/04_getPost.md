# Get과 Post

Get과 Post는 모두 서버와 통신하는 방식인 HTTP 메서드입니다. **HTTP는 요청을 보내는 자(클라이언트)와 요청을 받는 자(서버)가 있어야 합니다. 그리고 이 둘은 URL(경로)와 HTTP메서드로 소통합니다. 요청을 보내는 자가 특정 URL의 정보를 요청하면 서버는 특정 URL에서 요청을 받을 준비를 해둬야합니다.**

## Get

**클라이언트에서 요청을 보내는 방식이 Get방식이면 서버에서도 Get방식으로 응답해야합니다.** 예를 들어보겠습니다. pug파일을 만들어 `title`과 `contents`에 내용을 넣어 서버로 요청을 보냅니다.

```jade
doctype html
html
  head
    meta(charset='utf-8')
  body
    form(action='/form_receiver' method='get')
      p
        input(type='text' name='title')
      p
        textarea(name='contents')
      p
        input(type='submit')
```

pug파일에 form 태그로 데이터를 넣어서 요청을 보낼겁니다. `/form_receiver`라는 경로로 Get방식을 이용해서 요청을 보냅니다.(사실 Get방식은 `method='get'`을 생략해도 됩니다.) 클라이언트가 `/form_receiver`로 Get방식을 이용해서 요청을 보내므로 서버에서도 `/form_receiver`를 Get방식으로 **요청을 받는 부분**이 필요합니다.

```javascript
const express = require('express');
const app = express();

//템플릿 엔진 설정('view engin' = 템플릿 사용 명령, 'jade' = jade를 템플릿 엔진으로 사용)
app.set('view engine', 'jade');
//jade파일을 찾을 폴더
app.set('views', './views')
//페이지 소스보기에서 html태그가 보기좋게 나옴
app.locals.pretty = true;

//get
//form receiver
app.get('/form_receiver',function(req,res){
  const title = req.query.title;
  const contents = req.query.contents;
  res.send(title+','+contents)
})

//port listen
app.listen(3000, function(){
  console.log('Connected 3000 port');
})
```

이런식으로 클라이언트에서 요청을 보내면 서버에서 요청을 받는 부분이 경로와 메서드가 모두 일치해야합니다. **우리가 주소창에 URL을 적는 형태는 모두 Get방식입니다.** 이렇게 Get으로 데이터를 포함시켜서 요청을 보내면 Querystring과 함께 데이터의 내용을 포함한 새로운 URL을 형성합니다.

## Post

**클라이언트에서 요청을 보내는 방식이 Post방식이면 서버에서도 Post방식으로 응답해야합니다.** 이번에는 위와 같은 예제지만 Post방식으로 통신 해보겠습니다.

```jade
doctype html
html
  head
    meta(charset='utf-8')
  body
    form(action='/form_receiver' method='post')
      p
        input(type='text' name='title')
      p
        textarea(name='contents')
      p
        input(type='submit')
```

이번엔 form의 HTTP 메서드를 Post로 지정했습니다. 경로(URL)은 동일하나 HTTP 메서드가 달라졌습니다. 서버에서 받는 형태가 달라져야합니다.

```javascript
const express = require('express');
const app = express();

//템플릿 엔진 설정('view engin' = 템플릿 사용 명령, 'jade' = jade를 템플릿 엔진으로 사용)
app.set('view engine', 'jade');
//jade파일을 찾을 폴더
app.set('views', './views')
//페이지 소스보기에서 html태그가 보기좋게 나옴
app.locals.pretty = true;

//Post
app.get('/form',function(req,res){
  res.render('form');  
})

//from receiver(using post)
app.post('/form_receiver',function(req,res){
  const title = req.body.title;
  const contents = req.body.contents;
  res.send();
})

//port listen
app.listen(3000, function(){
  console.log('Connected 3000 port');
})
```

**Post방식은 URL로 동작하는 방식이 아니기 때문에 새롭게 URL을 형성하지 않습니다.** Get방식은 데이터를 포함한 URL을 새롭게 형성했기 때문에 URL의 Querystring을 handling해서 알맞게 사용할 수 있었습니다. **Post방식은 URL을 형성하지 않기 때문에 템플릿 엔진에 직접 접근해야합니다.** 그래서 `body-parser`라는 미들웨어가 필요합니다. 이러한 특성 때문에 Get방식보다 보안성이 요구되는 작업에 활용됩니다. 