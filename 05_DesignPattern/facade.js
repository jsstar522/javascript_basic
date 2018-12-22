var Legion = (function(){
    function Legion(number){
        this.number = number;
    };
    Legion.prototype.supply = function(){console.log('supply');};
    Legion.prototype.makeFormation = function(){console.log('make formation');};
    Legion.prototype.goForward = function(){console.log('go forward');};
    Legion.prototype.pullOutSword = function(){console.log('pull out sword');};
    Legion.prototype.runToenemy = function(){console.log('run to enemy');};
    return Legion;
})();

var King = (function(){
    function King(){
        this.legions = [];
        this.legions.push(new Legion(1));
        this.legions.push(new Legion(2));
        this.legions.push(new Legion(3));
    };
    King.prototype.march = function(){
        this.legions.forEach(function(legion){
            legion.supply();
            legion.makeFormation();
            legion.goForward();
        });
    };
    King.prototype.attack = function(){
    	this.legions.forEach(function(legion){
    		legion.makeFormation();
    		legion.pullOutSword();
    		legion.runToenemy();
    	});
    };
    return King;
})();

var king = new King();
king.march();
king.attack();

