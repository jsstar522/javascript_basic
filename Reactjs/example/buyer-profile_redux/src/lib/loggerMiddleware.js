const loggerMiddleware = store => next => action => {
  // 현재 상태와 액션
  console.log('현재 상태', store.getState());
  console.log('액션', action);

  // 다음 미들웨어로 넘기기
  const result = next(action);

  // 액션 처리 후의 상태
  console.log('다음 상태', store.getState());
  console.log('\n');

  // next(action)을 반환해야 다음 미들웨어/리듀서가 작업을 이어갈 수 있다.
  return result;
}
export default loggerMiddleware;