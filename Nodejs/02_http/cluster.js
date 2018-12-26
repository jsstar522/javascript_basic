const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}, 코어개수: ${numCPUs}`);
  //CPU 개수만큼 작업공간(woker) 생산
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
  //워커 종료
  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다`);
    //워커가 종료되면 새로운 워커 생성
    cluster.fork();
    //
  });
} else {
  //워커가 포트에서 대기
  http.createServer((req, res) => {
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Cluster!</p>');
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  }).listen(8085);

  console.log(`${process.pid}번 워커 실행`);
}