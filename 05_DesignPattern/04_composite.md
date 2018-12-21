# 복합체 패턴, Composite Pattern

**복합체 패턴은 복합개체와 단일개체를 같은 방법으로 사용할 때 사용합니다.** 트리구조에서 사용되는 패턴이죠. 대표적으로 jQuery가 있습니다. jQuery는 하나의 태그 뿐만아닌 여러개의 태그를 선택할 수 있습니다. 군대에서 대대, 중대, 분대의 개념이 있습니다. 10개의 대대, 6개의 중대, 10개의 분대로 이루어져있는 군대가 있고 각 객체 안에는 병력의 수와 대장의 이름을 알려주는 메서드가 있습니다. 

먼저 분대 생성자를 만들어 보겠습니다.

```javascript
var Century = (function(){
  function Century(leader){
      this.leader = leader;
  }
  Century.prototype.getLeader = function(){
      return this.leader;
  }
  Century.prototype.getNumber = function(){
      return 80;
  }
  return Century;
})();
```

먼저 80명으로 이루어진 분대를 생성하는 생성자 함수입니다. 이제 중대를 만들어 보겠습니다.

```javascript
var Cohort = (function(){
  function Cohort(leader){
      this.leader = leader;
      this.centuries = [];
  }
  Cohort.prototype.getLeader = function(){
      return this.leader;
  }
  Cohort.prototype.getNumber = function(){
      var sum = 0;
      this.centuries.forEach(function(century){
          sum += century.getNumber();
      });
      return sum;
  }
  Cohort.prototype.addCentury = function(century) {
    this.centuries.push(century);
    return this;
  };
  
  return Cohort;
})();
```

중대 객체 생성자입니다. `forEach`를 사용해서, `centuries` 배열 안의 element에서  `getNumber`를 실행한 뒤 중대의 모든 인원을 더합니다. 이제 대대를 만들어 보겠습니다.

```javascript
var Legion = (function(){
  function Legion(leader){
      this.leader = leader;
      this.cohorts = [];
  }
  Legion.prototype.getLeader = function(){
      return this.leader;
  }
  Legion.prototype.getNumber = function(){
      var sum = 0;
      this.cohorts.forEach(function(cohort){
          sum += cohort.getNumber();
      });
      return sum;
  }
  Legion.prototype.addCohort = function(cohort){
      this.cohorts.push(cohort);
      return this;
  }
  return Legion;
})();
```

대대에는 중대를 추가할 수 있는 메서드도 넣었습니다. 이제 각 대장의 이름을 넣어 부대를 만들어보죠.

```javascript
var century1 = new Century('park');
var century2 = new Century('lee');
var century3 = new Century('kim');
var century4 = new Century('han');
var century5 = new Century('oh');
var cohort1 = new Cohort('Tan_city');
var cohort2 = new Cohort('Pa_city');
var legion = new Legion('Two Earth');
```

이제 부대소속을 정해주겠습니다.

```javascript
cohort1.addCentury(century1).addCentury(century2).addCentury(century3);
cohort2.addCentury(century4).addCentury(century5);
legion.addCohort(cohort1).addCohort(cohort2);
```

이제 대장과 규모를 출력하겠습니다.

```javascript
legion.getLeader(); // Two Earth
legion.getNumber(); // 400
cohort1.getNumber(); // 240
```

80명의 병사를 가진 분대가 5개, 그리고 5개의 분대를 가진 중대가 2개가 있습니다. 대대 전체의 인원은 400명이므로 제대로 출력되는 것을 볼 수 있습니다. 그리고 `cohort1`에는 3개의 분대가 들어갔으므로 240명입니다.