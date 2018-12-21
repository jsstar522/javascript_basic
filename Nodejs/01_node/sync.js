//Async
const fs = require('fs');

fs.readFile('./test.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.log('첫번째');
});

fs.readFile('./test.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.log('두번째');
});

fs.readFile('./test.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.log('세번째');
});

fs.readFile('./test.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.log('네번째');
});

//Sync
fs.readFile('./test.txt',(err,data)=>{
    if(err){
        throw err;
    }
    console.log('--------------Sync-------------')
    console.log('첫번째');
    fs.readFile('./test.txt',(err,data)=>{
    	if(err){
        	throw err;
    	}
    	console.log('두번째');
    	fs.readFile('./test.txt',(err,data)=>{
    		if(err){
        	throw err;
    		}
    	console.log('세번째');
        fs.readFile('./test.txt',(err,data)=>{
    		if(err){
        	throw err;
    		}
    		console.log('네번째');
			});
		});    
	});
});