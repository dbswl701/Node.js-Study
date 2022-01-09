var fs = require('fs');

// readFileSync
/*
console.log('A');
var result = fs.readFileSync('./syntax/sample.txt', 'utf8'); // 읽고자 하는 파일의 이름(06에서 실행)
console.log(result);
console.log('C');
> 
A
B
C
*/

console.log('A');
fs.readFile('./syntax/sample.txt', 'utf8', function(err, result){
  console.log(result);
}); 
console.log('C');
/*
>
A
C
B
*/