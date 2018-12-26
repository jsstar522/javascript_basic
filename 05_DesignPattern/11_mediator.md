# 중재자 패턴, Mediator Pattern

**중재자 패턴은 여러 객체들을 가운데에서 관리하는 패턴입니다.** 게임에서 채팅을 하다보면 전체를 상대로 말할 수 있고, 길드, 친구에게만 말할 수 있는 귓속말 기능이 있습니다. 이 객체들을 중간에서 관리하면서 어떤 객체에만 메세지를 전달할 것인지 판단할 수 있는 역할은 중재자가 가지고 있습니다.

```javascript
var Translator = (function(){
    function Translator(){
        this.participants = [];
    }
    Translator.prototype.register = function(participant){
        this.participants.push(participant);
    };
    Translator.prototype.deliver = function(sender, message){
        this.participants.forEach(function(participant){
            if(participant !== sender){
                console.log(sender + '가' + participant + '에게' + message + '라고 말했습니다.')
            }
        });
    };
    return Translator;
})();
```

```javascript
var translator = new Translator();
translator.register('park');
translator.register('lee');
translator.deliver('han',"'사냥하실 분을 구합니다.'");
```

메세지를 전달할 객체를 미리 정하고 메세지의 내용을 전달할 수 있습니다. 전달과정에서 객체와 객체 사이를 중재하는 역할을 하기 때문에 중재자라고 부릅니다.