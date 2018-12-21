//Constructor(Adapter)
var SenateSystem = (function(){
  function SenateSystem(adapter){
      this.adapter = adapter;		//생성자함수
  }
  SenateSystem.prototype.vote = function(){
      this.adapter.vote();
  };
  return SenateSystem;
})();

//Object 1
var currentAdapter = {
  vote : function(){
      console.log('현재 황제를 지지합니다.')
  }
}
//Object 2
var rufusAdapter = {
  vote : function(){
      console.log('루푸스를 새 황제로 지지합니다.')
  }
}

senateSystem = new SenateSystem(currentAdapter);
senateSystem.vote();
senateSystem = new SenateSystem(rufusAdapter);
senateSystem.vote();
senateSystem = new SenateSystem(currentAdapter);
senateSystem.vote();