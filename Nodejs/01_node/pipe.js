//pipe.js
const fs = require('fs');

const readStream = fs.createReadStream('test2.txt');
const writeStream = fs.createWriteStream('test.txt');
readStream.pipe(writeStream);