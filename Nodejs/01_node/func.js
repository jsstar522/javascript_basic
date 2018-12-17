const {odd, even} = require('./var');	//js이나 json과 같은 확장자 생략가능
//odd = require('./var').odd;
//even = require('./var').even;
function checkOddOrEven(num){
    if(num%2){
        return odd;
    }
	return even;
}

module.exports = checkOddOrEven;

//ES6

// import { odd, even } from './var';

// function checkOddOrEven(num){
//     if(num%2){
//         return odd;
//     }
// 	return even;
// }

// export default checkOddOrEven;