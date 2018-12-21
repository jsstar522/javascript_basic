const fs = require('fs');

fs.readFile('./test.txt',(err,data)=>{
  if(err){
    throw err;
  }
  console.log(data.toString());

})

fs.writeFile('./test.txt','안녕하세요',(err)=>{
  if(err){
    throw err;
  }
  
})