# 프록시 패턴, Proxy Pattern

프록시는 대리자를 뜻합니다. **사용자가 요청을 보내면 사용자를 대신해서 요청을 처리한 뒤 결과를 보내줍니다.** 프록시 서버도 이런 방식으로 생겨났습니다. 성능을 높이고 에러를 잡아내는 데에 좋은 방식이지만 사용자의 요청을 받아서 처리하는 과정이므로 전달 과정에서 요청이나 결과가 조작되면 안됩니다.

**프록시 패턴은 요청의 전달과정 중, 중간 단계를 거쳐 객체로 전달되는 방식입니다.** 두사람에게 메세지를 전송해보겠습니다. '같은내용'을 적어서 '전송' 버튼을 누르면 프록시를 거쳐 두사람(천재와 바보)에게 '다른' 내용의 메세지가 전달됩니다.

```javascript
var Praetorian = (function() {
  function Praetorian() {};
  Praetorian.prototype.report = function(fact) {
    console.log('황제에게 ' + fact + '을 보고드립니다!');
  };
  Praetorian.prototype.assassinate = function(target) {
    console.log(target + ' 암살 명령을 받았습니다');
  };
  return Praetorian;
})();
```

```javascript
var PraetorianProxy = (function() {
  function PraetorianProxy(master) {
    this.master = master;
    this.praetorian = new Praetorian();
  }
  PraetorianProxy.prototype.report = function(fact) {
    var lie = '거짓';
    console.log(this.master + '에게 ' + fact + '을 보고드립니다');
    this.praetorian.report(lie);
  }
  PraetorianProxy.prototype.assassinate = function(target) {
    console.log('더 이상 ' + target + '을 암살하지 않습니다');
    this.praetorian.assassinate('Galba');
  }
  return PraetorianProxy;
})();
```

```javascript
var praetorian = new PraetorianProxy('Otho');
praetorian.report('사실'); // Otho에게 사실을 보고드립니다. 황제에게 거짓을 보고드립니다.
praetorian.assassinate('Otho'); // 더 이상 Otho을 암살하지 않습니다. Galba 암살 명령을 받았습니다.
```



