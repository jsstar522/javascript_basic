//Roma

//Factory
var Character = (function(){
    var jobs = {};
    return {
        addJob: function(job, Character){
            if(Character.prototype.attack){
	            jobs[job] = Character;
            }
        },
        create: function(job, options){
            var Character = jobs[job];
            return (Character ? new Character(options):null);
        }
        
    };
})();

//직업객체
var Emperor = (function(){
  function Emperor(options){
      this.name = options.name;
  }
  Emperor.prototype.attack = function(target){
      console.log(this.name + '가' + target.name + '을 공격!');
  };
  Emperor.prototype.proclaim = function(){
      console.log(this.name + '가 스스로를 황제라고 칭함');
  };
  return Emperor;
})();

var Governor = (function(){
  function Governor(options){
      this.name = options.name;
  }
Governor.prototype.attack = function(target){
      console.log(this.name + '가' + target.name + '을 공격!');
  };
Governor.prototype.betray = function(){
      console.log(this.name + '가 배신!');
  };
return Governor;
})();

//직업추가
Character.addJob('emperor', Emperor);
Character.addJob('governor', Governor);
//객체 생성
var park = Character.create('emperor',{name:'park'});
var lee = Character.create('emperor',{name:'lee'});
var kim = Character.create('emperor',{name:'kim'});
console.log(park);
console.log(lee);
console.log(kim.__proto__);