var Message = (function(){
  function Message(){};
  Message.prototype.send = function(contents){
      console.log('천재에게' + contents + '내용을 전송합니다')
  };
  Message.prototype.fake = function(target){
      console.log(target + '에게 거짓 내용을 보냈습니다.')
  };
  return Message
})();

var MessageProxy = (function(){
  function MessageProxy(sender){
      this.sender = sender;
      this.Message = new Message();
  };
  MessageProxy.prototype.send = function(contents){
      var lie = '거짓';
      console.log(this.sender + '가' + contents + '를 보냈습니다.');
      this.Message.send(lie);
  };
  MessageProxy.prototype.fake = function(target){
      console.log(target + '에게 거짓내용을 보내지 않았습니다');
      this.Message.fake('바보')
  };
  return MessageProxy;
})();

var park = new MessageProxy('Park');
park.send('사실');
park.fake('park');