# 연쇄 책임 패턴, Chain of Responsibility

**연쇄 책임 패턴은 동작의 수행을 다른 객체에게 떠넘기는 방식입니다.** 외부의 침략을 당한 로마가 반격 or 후퇴 결정을 두고 책임을 떠넘기는 상황을 적어보겠습니다. 먼저 장군이 결정할 두가지 메서드입니다.

```javascript
var General = (function(){
    function General(){}
    General.prototype.canMakeDecision = function(){
        return false;
    };
    General.prototype.makeDecision = function(){
        console.log('반격');
    };
    return General;
})();
```

장군은 `다음사람에게 의사결정을 떠넘길 것인지`, `반격을 할 것인지` 선택할 수 있습니다. `canMakeDesicion`이 false면 결정을 내리지 못한겁니다.

```javascript
var Senator = (function(){
    function Senator(){}
    Senator.prototype.canMakeDecision = function(){
        return false;
    };
    Senator.prototype.makeDecision = function(){
        console.log('시민을 대피시킨다');
    };
	return Senator;
})();
```

다음은 원로원입니다. 역시 `다음사람에게 의사결정을 떠넘길 것인지`, `시민을 대피시킬 것인지` 선택할 수 있습니다.

```javascript
var King = (function(){
    function King(){}
    King.prototype.canMakeDecision = function(){
        return true;
    };
    King.prototype.makeDecision = function(){
        console.log('후퇴')
    };
    return King;
})();
```

이제 왕까지 결정권이 넘어왔습니다. 왕은 결정을 내릴 수 있는 사람이므로 `canMakeDecision`을 true로 두고 `makeDecision`을 실행합니다.

```javascript
var DecisionMaker = (function(){
    function DecisionMaker(){
        this.decisionMakers = [];
        this.decisionMakers.push(new General());
        this.decisionMakers.push(new Senator());
        this.decisionMakers.push(new King());
    };
    DecisionMaker.prototype.makeDecision = function(){
        for (var i = 0; i < this.decisionMakers.length; i++){
            if(this.decisionMakers[i].canMakeDecision()){
                return this.decisionMakers[i].makeDecision();
            }
        }
    };
    return DecisionMaker;
})();

var rome = new DecisionMaker();
rome.makeDecision();
```

중간에 의사결정을 할 수 있는 능력있는 자가 나타난다면 의사결정권은 왕까지 도달하지 않고 그대로 결정을 내린 뒤 종료됩니다.