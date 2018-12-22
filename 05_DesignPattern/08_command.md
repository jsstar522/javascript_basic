# 명령 패턴, Command Pattern

**명령을 내릴 수 있는 함수를 따로 모아서 사용할 수 있는 방식입니다. 명령들을 따로 빼놨기 때문에 나중에 추가하거나 제거하기에 용이합니다.** 비텔리우스가 오토를 공격하기 위해서 군단을 이끌고 진격하고 있습니다. 비텔리우스는 총사령관에게 전술을 맡기고 최종 승인만 하기로 했습니다.

```javascript
var Vitellius = (function(){
    function Vitellius(){}
    Vitellius.prototype.approve = function(commander){
        commander.execute();
    };
    return Vitellius;
})();
```

```javascript
var Commander = (function(){
    function Commander(){
        this.commands = [];
    }
    Commander.prototype.execute = function(){
        this.commands.forEach(function(command){
            command();
        });
    };
    Commander.prototype.do = function(command, args){
        this.commands.push(function(){
            command.call(null, args);
        });
    };
    Commander.prototype.undo = function(){
        this.commands.pop();
    };
    return Commander;
})();
```

비탈리우스가 `Commander`에게 전술 결정권을 넘겼습니다. `Commander`는 실행할 전술을 등록하고 취소할 수 있습니다. `execute`는 비탈리우스를 거쳐서 실행되는 함수입니다. 전술 목록을 만들어 보겠습니다.

```javascript
var strategy = {
    climbAlps: function(){
        console.log('알프스를 오릅니다');
    },
    prepareSupply: function(number){
        console.log('보급품을 ' + number + ' 만큼 준비합니다');
    },
    attackRome: function(){
        console.log('로마를 공격합니다.');
    },
};
```

이제 전술 목록을 추가하고 최종적으로 비탈리우스가 **완성된 전술**을 한번에 수행시켜보겠습니다.

```javascript
var vitellius = new Vitellius();
var park = new Commander();	//사령관

park.do(strategy.prepareSupply, 5000);
park.undo();	//목록 삭제
park.do(strategy.prepareSupply, 10000);
park.do(strategy.climbAlps);
park.do(strategy.attackRome);
vitellius.approve(park);
```

**메서드의 집합에 다양한 메서드를 추가시키는 객체와, 그것을 최종적으로 확인하고 실행하는 객체를 나눠서 사용하는 방법입니다.**

