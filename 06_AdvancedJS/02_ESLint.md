# ESLint

**ESLint는 ES(EcmaScript) + Lint(에러코드에 표시달기)입니다.** 팀 프로젝트에서 코딩스타일을 맞출 때 유용합니다. 코딩스타일은 다양하지만 `airbnb`의 ESLint를 설치해보겠습니다. ESLint를 사용하기 위해서는 npm(Node Package Manager)가 설치되어 있어야 합니다.

```bash
$ npm install -g eslint eslint-config-airbnb-base eslint-plugin-import
```

설치가 완료되면 `.eslintrc` 파일을 만들어 JSON 양식으로 규칙을 추가합니다. 

```json
{
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "extends": "airbnb-base",
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
    "rules": {
    "max-length": 0 // 0으로 설정하면 에러 검출 X
  },
  "plugins": ['import'],
  "globals": {
    "jQuery": true,
    "$": true
  }
}
```

위의 예시 말고도 다양한 옵션을 넣을 수 있습니다.`extends`에 위에서 설치한 에어비엔비 양식을 넣습니다. `globals`는 전역변수로 사용되는 것들은 에러처리에서 제외하기 위해 사용됩니다. 에러처리 예외는 `.eslintignore`파일을 따로 만들어서 사용합니다. 이제 실행하면 양식에 맞지 않거나 불필요한 사용이 나옵니다. 

```bash
$ eslint eslintTestFile.js --fix
```

그리고 **옵션에 `--fix`를 넣어주면 고쳐주는 것도 가능하죠.** 그리고 자바스크립트 파일뿐만 아닌 html과 같은 파일도 옵션을 통해 에러처리를 할 수 있습니다.