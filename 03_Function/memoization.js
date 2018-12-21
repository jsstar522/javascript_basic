var Factorial = (function(){
    var save = {};
    var factorial = function(number){
        if(number>0){
            var saved = save[number-1]||factorial(number-1);	//saved = save[number-1] or saved = fact(number-1)
            var result = number*saved;
            save[number] = result;
            return result;
        }else{
            return 1;
        }
    };
    return factorial;
})();

console.log(Factorial(5));

number = 5, saved = factorial(4), result = 5*factorial(4), save[5] = 5*factorial(5);
            saved = factorial(3), result = 4*factorial(3), save[4] = 4*factorial(4);