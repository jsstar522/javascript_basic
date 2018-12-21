//분대
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

//중대
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

//대대
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

//부대객체 생성
var century1 = new Century('park');
var century2 = new Century('lee');
var century3 = new Century('kim');
var century4 = new Century('han');
var century5 = new Century('oh');
var cohort1 = new Cohort('Tan_city');
var cohort2 = new Cohort('Pa_city');
var legion = new Legion('Two Earth');


//소속 정해주기
cohort1.addCentury(century1).addCentury(century2).addCentury(century3);
cohort2.addCentury(century4).addCentury(century5);
legion.addCohort(cohort1).addCohort(cohort2);

//출력
console.log(legion.getLeader());
console.log(legion.getNumber());
console.log(cohort1.getNumber());
