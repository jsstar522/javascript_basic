# 퍼사드 패턴, Facade Pattern

사용자에게 최소한의 API만 공개하는 것을 퍼사드 패턴이라고 합니다. 여기서 공개되는 최소한의 API는 통합된 인터페이스입니다.

```javascript
var Legion = (function(){
    function Legion(number){
        this.number = number;
    };
    Legion.prototype.supply = function(){console.log('supply');};
    Legion.prototype.makeFormation = function(){console.log('make formation');};
    Legion.prototype.goForward = function(){console.log('go forward');};
    Legion.prototype.pullOutSword = function(){console.log('pull out sword');};
    Legion.prototype.runToenemy = function(){console.log('run to enemy');};
    return Legion;
})();

var King = (function(){
    function King(){
        this.legions = [];
        this.legions.push(new Legion(1));
        this.legions.push(new Legion(2));
        this.legions.push(new Legion(3));
    };
    King.prototype.march = function(){
        this.legions.forEach(function(legion){
            legion.supply();
            legion.makeFormation();
            legion.goForward();
        });
    };
    King.prototype.attack = function(){
    	this.legions.forEach(function(legion){
    		legion.makeFormation();
    		legion.pullOutSword();
    		legion.runToenemy();
    	});
    };
    return King;
})();

var king = new King();
king.march();
king.attack();
```

`Legion`은 `King`의 하위 시스템입니다. `King`이 메서드를 호출하면 `Legion`이 처리합니다. 