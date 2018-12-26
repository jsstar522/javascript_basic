# 전략 패턴, Strategy Pattern

**전략 패턴은 다양한 전략의 조합을 실행하기 전에 수정할 수 있고 실행할 수 있는 패턴입니다.** 로마로 진격하는 베스파시아누스가 다양한 진격방법을 고르고 있습니다.

```javascript
var Strategy = (function(){
  function Strategy(){
      this.strategy = null;
  }
  Strategy.prototype.setStrategy = function(strategy){
      this.strategy = strategy;
  };
  Strategy.prototype.execute = function(){
      this.strategy.execute();
  };
  return Strategy;
})();
```

전략을 추가하고 실행하는 메서드를 넣은 생성자입니다.

```javascript
var ShipStrategy = (function(){
  function ShipStrategy(){}
  ShipStrategy.prototype.execute = function(){
      console.log('배로 진격!');
  };
  return ShipStrategy;
});
var LandStrategy = (function(){
  function LandStrategy(){}
  LandStrategy.prototype.execute = function(){
      console.log('육지로 진격!');
  };
  return LandStrategy;
})();
```

바다로 진격, 땅으로 진격, 두가지의 전략을 만들었습니다.

```javascript
var start = new Strategy();
var ship = new ShipStrategy();
var land = new LandStrategy();
start.setStrategy(ship);
start.setStrategy(land);	//전략수정
start.execute();
```

처음 배로 진격하는 전략을 선택했지만 이후에 육지로 진격하는 전략으로 "수정"한 뒤에 전략을 실행했습니다. 전략 설정과 실행을 따로 메서드로 만들었기 때문에 수정과 실행에 편리합니다.