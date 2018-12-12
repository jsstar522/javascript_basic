//야구게임
//중복되지 않는 4개의 숫자가 주어지면 공격자가 4개의 숫자를 맞추는 게임
//숫자와 자리위치가 맞으면 스트라이크, 숫자는 존재하지만 자리가 다르면 볼


//(수비)random으로 4자리 수를 생성
//0<= Math.random <1 
//Math.floor() 소수점제거
let num = [1,2,3,4,5,6,7,8,9,0];
let pitch_num = [];

//num 배열에서 숫자 하나씩을 제거하면서 뽑기
for(let i=0; i<4; i++){
	//제거하면 랜덤number의 범위가 줄어들어야 한다.
	const randomNum = Math.floor(Math.random()*num.length);
	//splice(제거하기 시작하는 위치,제거할 개수) = 배열로 빠져나옴
	pitch_num[i] = num.splice(randomNum,1)[0];
	//console.log(pitch_num);
	//console.log(num);
}


//(공격)10번의 loop동안 randomd으로 4자리 수를 만들고 볼,스트라이크의 개수를 뽑는다
let count = 0;

while(count < 10){
	const input = prompt('숫자를 입력하세요!');
	const inputNum = input.split('');
	let ball = 0;
	let strike = 0;
	
	for(let j = 0; j<4 ; j++){
		for(let k = 0; k<4 ; k++){
			//pitch_num = int, inputNum = string (===사용X)
			if(pitch_num[j] == inputNum[k]){
				if(j == k){
					strike++;
				}
				else{
				ball++;
				}
				break;
			}
		}
	}

	//array.join('구분자') = array을 string으로 합침
	console.log(`${inputNum.join('')} 입력 = ${ball} ball, ${strike} strike (${count}번째 시도)`);
	if(strike == 4){
		console.log('정답입니다.')
		break;
	}
	count++;
}
console.log('시도횟수를 초과했습니다.')
