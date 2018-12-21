//*Partial Application*//
//function
var plus = function(a,b,c){
  return a+b+c;
}
//function prototyep
Function.prototype.partial = function(){
  var args = [].slice.apply(arguments);
  //console.log(arguments);
  //console.log(args);
  var self = this;	//binding
  return function(){
      return self.apply(null, args.concat([].slice.apply(arguments)));
  };
};
//apply : (02_Function/04_context.md) explicit binding
//slice	: (01_Basic/02_stringArray.md) 문자열 자르기
//concat : (01_Basic/02_stringArray.md) 문자열 추가

//exec
var plus_a = plus.partial(1,2);
console.log(plus_a(3));

//*Currying*//
Function.prototype.curry = function(one){
  var origFunc = this;
  var target = origFunc.length;	//인자개수
  var args = [];
  function next(nextOne){
      args = args.concat(nextOne);
      if(args.length === target){
          return origFunc.apply(null,args);
      }else{
          return function(nextOne){return next(nextOne)};
      }
  }
  return next(one);
}

//exec
function multiplyFour(a,b,c,d){
  return a*b*c*d;
}
console.log(multiplyFour.curry(1)(2)(3)(4));

function curryFunc(a){return multiplyFour.curry(1)(2)(3)(a);}
console.log(curryFunc(4));
