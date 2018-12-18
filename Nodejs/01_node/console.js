const string = 'abc';
const num = 1;
const boolean =true;
const obj ={
    outside:{
        inside:{
            name: 'park',
        },
    },
};
console.time('시간');     //console.timeEnd(레이블)과 대응되어 같은 레이블을 가진 time과 timeEnd 사이의 시간을 측정, ()안에는 label을 기입
console.log('Hello');     //consle에 로그출력
console.log(string, num, boolean);
console.error('에러');    //에러를 콘솔에 출력(console.log와 비슷한 기능을 하지만 개발자 모드에서 표시되는 방식이 다름)
console.dir(obj, {colors:false, depth: 1});   //객체를 콘솔에 표시, 색표시, 몇단계까지 보여줄지 정할 수 있다.

console.time('시간측정');
for(let i=0; i<10000; i++){
  continue;
}
console.timeEnd('시간측정');

console.trace('에러위치 추적');