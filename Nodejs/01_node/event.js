
const EventEmitter = require('events');

const myEvent = new EventEmitter();   //이벤트 객체만들기

myEvent.addListener('event1', () => {   //이벤트 객체 안에 리스너 등록
  console.log('첫번째 이벤트');
})

myEvent.addListener('event2', () => {   //이벤트 객체 안에 리스너 등록
  console.log('두번째 이벤트')
})

myEvent.addListener('event2', () => {   //이벤트 객체 안에 리스너 안에 "두개의 동작" 등록
  console.log('두번째 이벤트-2')
})

console.log(myEvent);