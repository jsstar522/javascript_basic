var Legionary = (function(){
  function Legionary(name){
      this.name = name;
  }
  Legionary.prototype.hp = 50;
  Legionary.prototype.att = 5;
  Legionary.prototype.attack = function(target){
      console.log(this.name + '가' + target + '을 공격!');
  };
  return Legionary;
})();

var park = new Legionary('park');
var lee = new Legionary('lee');
var kim = new Legionary('kim');

console.log(park);			
console.log(park.hp);		//50
park.hp = 40;
console.log(park);
console.log(park.__proto__);	//Legionary { hp: 50, att: 5, attack: [Function] }
console.log(park.hp);		//40