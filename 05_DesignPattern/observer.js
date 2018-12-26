var Blizzard = (function(){
  function Blizzard(){
      this.subscribers = [];
  };
  Blizzard.prototype.publish = function(){
      var self = this;	//binding
      this.subscribers.every(function(subscriber){
          subscriber.callback(self);
          return true;
      });
  };
  Blizzard.prototype.register = function(target){
      this.subscribers.push(target);
  };
  return Blizzard;
})();

var Observer = (function(){
  function Observer(){
      this.list = [];
  }
  Observer.prototype.subscribe = function(target){
      this.list.push({
          target:target,
          newGame: 0,
      });
      target.register(this);
  };
  Observer.prototype.unsubscribe = function(target){
      this.list = this.list.filter(function(company){
          return company.target !== target;
      });
  };
  Observer.prototype.callback = function(target){
      this.list.some(function(company){
          console.log(company.target, target, company.target === target);
          if(company.target == target){
              ++company.newGame;
              return true;
          }
      });
  };
  return Observer;
})();

var blizzard = new Blizzard();
var observer = new Observer();
observer.subscribe(blizzard);
console.log(observer.list);           //옵저버가 지켜보는 것 : 블리자드
console.log(blizzard.subscribers);    //블리자드를 지켜보는 것 : 옵저버
blizzard.publish();   //게임출시
console.log(observer.list);



