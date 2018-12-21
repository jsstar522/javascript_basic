# 적응자 패턴, Adapter Pattern

**적응자 패턴은 객체를 생성하는 패턴이 아닌 `기존에 있는 구조`와 `새 구조`를 유연하게 전환해줍니다.** `생성패턴`이 아닌 `구조패턴`입니다. 우리가 실생활에서 사용하는 `어뎁터`와 정확하게 같은 역할을 합니다. 

같은 객체를 만들 때 뒤에 인자만 바꿔서 시스템을 바꿔보도록 하겠습니다.

```javascript
var SenateSystem = (function(){
    function SenateSystem(adapter){
        this.adapter = adapter;		//생성자함수
    }
    SenateSystem.prototype.vote = function(){
        this.adapter.vote();
    };
    return SenateSystem;
})();
```

먼저 어뎁터가 들어갈 생성자 함수를 싱글톤으로 만듭니다.

```javascript
var currentAdapter = {
    vote : function(){
        console.log('현재 황제를 지지합니다.')
    }
}
```

```javascript
var rufusAdapter = {
    vote : function(){
        console.log('루푸스를 새 황제로 지지합니다.')
    }
}
```

들어갈 인자의 내용을 넣어서 객체 리터럴을 만듭니다.

```javascript
senateSystem = new SenateSystem(currentAdapter);
senateSystem.vote();	//현재 황제를 지지합니다.
senateSystem = new SenateSystem(rufusAdapter);
senateSystem.vote();	//루푸스를 새 황제로 지지합니다.
senateSystem = new SenateSystem(currentAdapter);
senateSystem.vote();	//현재 황제를 지지합니다.
```

어뎁터 패턴으로 시스템을 바꾼 뒤 같은 메서드를 사용하면 다른 내용이 출력됩니다.