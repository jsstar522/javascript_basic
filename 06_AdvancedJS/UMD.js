(function(root, factory){
    if(typeof define === 'function' && define.amd){
        define(['jquery', 'abab'], factory);
    }else if(typeof module === 'object' && module.exports){
        module.exports = factory(require('jquery'), require('abab'));
    }else{
        root.myModule = factory(root.var1, root.var2);
    }
})(this, function(var1, var2){
    return{
        a: var1,
        b: var2,
    };
});