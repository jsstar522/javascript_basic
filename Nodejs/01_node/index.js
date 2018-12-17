const {odd, even} = require('./var');
const checkNumber = require('./func');

function checkStringOddEven(str){
    if(str.length%2){
        return odd;
    }
	return even;
}

console.log(checkNumber);
//console.log(checkNumber(10));
//console.log(checkStringOddEven('hello'));