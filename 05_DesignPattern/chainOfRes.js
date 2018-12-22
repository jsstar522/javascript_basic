//후퇴 의사결정권 넘기기

//장군
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

//원로원
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

//왕
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

//chainOfResponsibility
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
