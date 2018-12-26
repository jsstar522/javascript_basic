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

var start = new Strategy();
var ship = new ShipStrategy();
var land = new LandStrategy();
start.setStrategy(ship);
start.setStrategy(land);	//전략수정
start.execute();