## 파일 실행
```
node index.js
```

## 다른 모듈의 함수 사용
main.js
```js
let m = require('./index.js');
console.log(m.add(1,2));
```

index.js
```js
exports.add = add;  
// add라는 함수를 다른 모듈에서도 사용할 수 있도록 add라는 이름으로 내보냄
```
