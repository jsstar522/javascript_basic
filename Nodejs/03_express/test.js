// 변수객체로 만들어서 사용
function Hello(){
  console.log('Hello');
  function Bye(){
    console.log('Bye');
  }
  return {
    Bye : Bye
  };
}

Hello();
var foo = Hello();
foo.Bye();
