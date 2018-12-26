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

var translator = new Translator();
translator.register('park');
translator.register('lee');
translator.deliver('han',"'사냥하실 분을 구합니다.'");