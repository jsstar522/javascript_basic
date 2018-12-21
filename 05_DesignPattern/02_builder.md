# 빌더 패턴, Builder Pattern

빌더 패턴은 추상 팩토리 패턴과 조금 다르게 옵션이 많을 때 사용합니다. **생성자에 들어갈 매개변수의 유형이 정해져 있지만 세부적인 사항이 다를 때 유용하게 사용됩니다.** 예를들어 연합병력들이 모여 군단을 만들 때, 군단의 규모,  부대장의 여부 등 다양한 옵션으로 객체를 만들 수 있습니다. 먼저 군단을 만드는 객체리터럴을 만들어보죠.

```javascript
var makeLegion = function(leader){
    var adjutants = null;
    var army = 0;
    return {
        setAdjutant: function(list){
            adjutants = list;
            return this;
        },
        setArmy: function(number){
            army = number;
            return this;
        },
    	build: function(){
            return{
                leader: leader,
                adjutants: adjutants,
                army: army,
            };
    	},
    };
};

var galbaLegion = makeLegion('galba').setAdjutant(['otho', 'vindex', 'vitellius']).setArmy(8000).build();
var rufusLegion = makeLegion('rufus').setArmy(10000).build();
```

`makeLegion`이라는 객체리터럴을 만들었습니다. **객체 안의 속성은 모두 함수로 이루어져 있고 함수를 실행해야지만 속성이 만들어집니다.** 