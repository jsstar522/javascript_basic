# 노드 내장 모듈, Implict Module of Nodejs

## Os

`os`모듈은 운영체제의 정보, cpu, 메모리 정보 등을 가져올 수 있습니다. 다음과 같이 cpu 코어의 개수를 알아볼 수도 있습니다.

```javascript
const os = require('os');

console.log('cpu: ', os.cpus());
console.log('cpu core: ', os.cpus().length);
```

**cpu 코어의 개수는 나중에 싱글스레드를 사용하는 노드의 단점을 보완하기 위해 멀티 프로세스를 사용할 때 사용됩니다.** cpu 코어에 맞게 프로세스를 늘려나갈 수 있습니다.



## Path

폴더와 파일의 경로를 쉽게 조작할 수 있습니다. 

```javascript
console.log('path.join(): ', path.join(__dirname, '..', '..', '/users', '.', '/jongseokpark'));
```



## Url

url 모듈 안에 URL 생성자가 있습니다. URL 생성자로 객체를 만들면 주소를 분리할 수 있습니다.

```javascript
const url = require('url');
const URL = url.URL;

const myURL = new URL('https://news.sbs.co.kr/news/endPage.do?news_id=N1005062618&plink=STAND&cooper=NAVER');

console.log(myURL);		//객체로 반환
console.log(url.format(myURL));		//객체로 분리되기 전으로 반환
```

url은 `'https://news.sbs.co.kr/news/endPage.do?news_id=N1005062618&plink=STAND&cooper=NAVER'`과 같이 `?`을 기준으로 뒤쪽에 key와 value로 표시됩니다. 이 부분을 `search`라고 합니다. 속성은 `&`로 구분됩니다. `searchParams`로 나눠서 사용할 수 있습니다.

```javascript
const url = require('url');
const URL = url.URL;

const myURL = new URL('https://news.sbs.co.kr/news/endPage.do?news_id=N1005062618&plink=STAND&cooper=NAVER');

console.log(myURL.searchParams);
console.log(myURL.searchParams.getAll('news_id'));
```

다음과 같이 `search`가 출력되고 key와 value를 출력할 수 있습니다.

```
URLSearchParams {
  'news_id' => 'N1005062618',
  'plink' => 'STAND',
  'cooper' => 'NAVER' }
  
[ 'N1005062618' ]
```

`append(키, 값)`으로 추가도 가능합니다.



**WHATWG 방식**의 url이 아닐 때에는 `querystring` 모듈로 간편하게 `search` 부분을 가져올 수 있습니다.

```javascript
const url = require('url');
const querystring = require('querystring');

const parsedUrl = url.parse('https://news.sbs.co.kr/news/endPage.do?news_id=N1005062618&plink=STAND&cooper=NAVER');
const query = querystring.parse(parsedUrl.query);
console.log(query);


```



## Crypto

암호화를 도와주는 모듈입니다. 유저의 비밀번호를 암호화할 때 필요합니다.

### 단방향 암호화

**복호화할 수 없는 암호를 만드는 방식을 단방향 암호화라고 합니다.** 단방향 암호화는 주로 `해시기법`을 사용합니다.

```javascript
//crypto.js
const crypto = require('crypto');

console.log('base64: ', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex: ', crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64: ', crypto.createHash('sha512').update('비밀번호_2').digest('base64'));
```

`createHash`는 비밀번호 알고리즘입니다. `md5`, `sha1`, `sha256`, `sha512`등이 있습니다. `update`는 변환할 비밀번호를 입력받는 곳입니다. `digest`는 인코딩 알고리즘입니다. `digest`를 거치면 변환된 문자열이 반환됩니다.(인코딩 알고리즘은 `base64`가 가장 많이 쓰입니다.) 

### 양방향 암호화

양방향 암호화는 단방향 암호화와는 반대로 복호화가 가능합니다. 

```javascript
//crypto.js
const crypto = require('crypto');

//암호화
const cipher = crypto.createCipher('aes-256-cbc', '열쇠');	//알고리즘과 복호화를 할 수 있는 키가 들어간다.
let result = cipher.update('암호화할 문장', 'utf8', 'base64');
result += cipher.final('base64');
console.log('암호화', result);

//복호화
const decipher = crypto.createDecipher('aes-256-cbc', '열쇠');	//암호화 키와 같은 키가 들어가야한다.
let result2 = decipher.update(result, 'base64', 'utf8');
result2 += decipher.finla('utf8');
console.log('복호화', result2);
```

