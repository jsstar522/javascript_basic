# CSS와 자바스크립트

스크롤 조작이나 React와 같은 프레임워크를 사용할 때 가끔씩 자바스크립트로 CSS를 다뤄야하는 경우가 생깁니다. 속성을 다음과 같이 추가하거나 변경할 수 있습니다.

```javascript
document.querySelector('선택자').style.display = 'inline-block';
```

```javascript
document.querySelector('선택자').style.fontSize = '16px';
```

`-`가 있는 속성은 `-`을 빼주고 camelCase로 바꿔줘야 합니다. `font-size`는 `fontSize`로 사용해야 합니다. 너비와 높이는 다음과 같이 구할 수 있습니다. 

```javascript
document.querySelector('선택자').offsetHeight;
document.querySelector('선택자').offsetWidth;
document.querySelector('선택자').scrollHeight;
document.querySelector('선택자').scrollWidth;
document.querySelector('선택자').clientHeight;
document.querySelector('선택자').clientWidth;
```

윈도우 크기는 다음과 같이 구합니다.

```javascript
window.innerWidth;		//페이지 너비
window.innerHeight;		//페이지 높이
screen.availHeight;		//모니터 해상도
```





