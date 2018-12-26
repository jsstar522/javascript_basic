
# 관찰자 패턴, Observer Pattern

관찰자 패턴은 관찰할 대상을 설정하고, 관찰한 뒤, 특정 행동을 감지하면 이벤트를 발생시킵니다. **특정 이벤트를 등록해놓고 이벤트를 기다리고 있다가 이벤트가 발생하면 콜백함수를 실행시키는 이벤트 리스너와 같습니다.** 관찰자가 관찰할 대상을 정하고, 대상이 특정 행동을 하면 반응하는 코드를 만들어 보겠습니다. GPU 시장분석을 위해 다양한 게임회사들 중 새로운 게임 발매를 발표했을 때, 관찰자가 그 내용을 기록하는 코드입니다.

```javascript
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
```

위 코드는 분석할 게임회사 객체입니다.

```javascript
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
```

위 코드는 게임회사를 지켜보는 옵저버입니다. 옵저버가 블리자드를 지켜보게 하려면 `Observer.subscribe(대상)` 을 사용하면 됩니다. 옵저버에서 `subscribe`를 실행하면 대상(blizzard)에서도 자신을 지켜보는 옵저버가 누구인지 추가하게 됩니다.(`target.register(this);`를 observer 안에서 실행합니다.) 이제 서로 누굴지켜보는지 누가 날 지켜보는지 알 수 있습니다. 

```javascript
var blizzard = new Blizzard();
var observer = new Observer();
observer.subscribe(blizzard);
console.log(observer.list);           //옵저버가 지켜보는 것 : 블리자드
console.log(blizzard.subscribers);    //블리자드를 지켜보는 것 : 옵저버
blizzard.publish();   //게임출시
observer.list;
```

블리자드에서 `publish()`를 통해 게임출시를 선언합니다. 옵저버에 등록된 회사의 리스트를 뽑아보면 `newGame`이 `0`에서 `1`로 변해있음을 확인할 수 있습니다.