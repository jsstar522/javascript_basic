# 디자인 패턴, Design Pattern

## 디자인 패턴, Design Pattern

디자인 패턴이란 특정 문맥에서 공통적으로 발생하는 문제에 대해 재사용이 가능한 해결책입니다. **쉽게 말해서 비슷한 문제를 정해져 있는 해결책으로 푸는겁니다.** 디자인 패턴은 어느정도 정제되어 있고 많은 어플리케이션의 탄생과정에서 생기는 문제점을 고려해 설계되었습니다. 굳이 처음부터 하나하나 만들면서 부딪치는 문제점을 그때그때 고칠필요가 없습니다. 

### 싱글턴 패턴, Singleton Pattern

객체 안에 변수를 저장할 때, key와 value가 모두 공개되는 문제점을 싱글턴 패턴으로 고착화 시켜왔습니다. **싱글턴 패턴이란 하나의 생성자 함수로 단 하나의 객체만을 생성하는 패턴을 의미합니다.**

```javascript
var obj = {
    id: 'jsstar522',
    call_id: function(){
        alert(this.id)
    }
};
```

위와 같은 스크립트는 `obj`를 콘솔에 적기만 해도 모두 공개가 됩니다. **문제점 해결을 위해 비공개 변수를 가질수 있도록 싱글턴 패턴으로 만들어졌습니다.**

```javascript
var singleton = (function(){
    var instance;
    var id = 'jsstar522';
    function initiate(){
        return{
            id : id.length,
            call_id : function(){
                alert(this.id);
            }
        };
    }
    return{
        getInstance: function(){
            if(!instance){
                instance = initiate();
            }
            return instance;		//id, call_id
        }
    }
})();
var first = singleton.getInstance();
var second = singleton.getInstance();
console.log(first === second);		//true
```

**객체 리터럴에서 비공개 변수를 만드는 대표적인 싱글턴 패턴입니다.** 예제를 보면 id를 숨긴채 id의 길이만 호출하도록 제어되어 있습니다. `singleton`을 실행하면 `getInstance` 함수만을 반환하고, `singleton.getInstance`함수를 실행하면 `instance = initiate()`가 반환되기 때문입니다. 그리고 `initiate`에는 id정보를 넣어두지 않았죠. 싱글턴은 `네임스페이스`를 만들 때 주로 사용됩니다. 네임스페이스는 하나의 이름이 하나의 객체를 이루는 공간을 말합니다. 하나의 유저 정보가 담긴 객체에서 하나의 어플리케이션만 실행되는 게임 등에서 자주 사용되죠. 

### 생성자 패턴, Constructor Pattern

객체를 만들 때, 선언하는 생성자 함수의 디자인 패턴을 알아보겠습니다. 

```javascript
function Vehicle(name, speed){
    this.name = name;
    this.speed = speed;
}
Vehicle.prototype.drive = function(){
    console.log(this.name + 'is running with' + this.speed);
}
```

위와 같은 코드를 다음과 같은 디자인 패턴으로 생성합니다.

```javascript
var Vehicle = (function(){
    function Vehicle(name, speed){
        this.name = name;
        this.speed = speed;
    }
    Vehicle.prototype.drive = function(){
    	console.log(this.name + 'is running with' + this.speed);
    };
    return Vehicle;
})();
```

객체 안에 들어가는 함수를 `Vehicle`이라는 변수 안에 모두 넣어서 사용합니다. **생성자 패턴에서 메서드를 정의할 때, prototype으로 정의하지 않으면 메서드를 찾지 못합니다.** 그 이유는 **메서드를 리터럴객체 안쪽에 함수를 정의한게 아니라 밖에서 상속을 통해 정의했기 때문입니다.** 바깥 함수에서 안쪽 함수의 변수에 접근하지 못하므로 prototype으로 상속시켜야 합니다. this를 쓰는 맥락도 같은 이유입니다. Scope binding을 하기 위해서입니다.