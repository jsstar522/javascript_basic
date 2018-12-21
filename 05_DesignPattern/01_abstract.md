# 추상 팩토리, Abstract Factory

추상 팩토리 패턴은 관련성 있는 객체의 집합을 생성할 때 사용됩니다. 객체를 생성할 때, 구상 클래스를 직접 생성하지 않고 객체를 구성하는 부분을 `추상화`해서 `상속`을 통해 구성하는 부분을 동일하게 유지합니다. 

```javascript
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
```

`Character`라는 객체리터럴을 싱글턴으로 구현했습니다. `addJob`은 직업을 받고 `create`는 캐릭터 객체를 만드는 부분입니다. `addJob`은 객체 프로토타입에 `attack` 이라는 함수가 있어야 생성됩니다. 이제 직업에 대한 생성자 함수를 만들겠습니다. 

```javascript
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
```

```javascript
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
```

이제 추상팩토리와 직업을 모두 만들었습니다. 이제 직업객체를 추상팩토리에 넣고 객체를 만들면 됩니다. 

```javascript
//직업추가
Character.addJob('emperor', Emperor);
Character.addJob('governor', Governor);
//객체생성
var park = Character.create('emperor',{name:'park'});
var lee = Character.create('emperor',{name:'lee'});
var kim = Character.create('emperor',{name:'kim'});
console.log(park);
console.log(lee);
console.log(kim.__proto__);
```

각 객체의 prototype에 직업 생성자 함수에서 정의한 함수들이 들어가 있는 것을 확인할 수 있습니다.