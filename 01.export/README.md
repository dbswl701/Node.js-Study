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

---

## 
```js
exports.PI = 3.14;
exports.add = function add(a, b) { return a + b; };
exports.subtract = function subtract(a, b) { return a - b; };
exports.multiply = function multiply(a, b) { return a * b; };
exports.divide = function divide(a, b) { return a / b; };

하나씩 exports를 붙여서 공개하는 방법 말고 다른 방법도 존재
공개하고 싶은 것들을 모아서 하나의 객체로 만들고, 그 객체를 공개하는 방법
```

```js
let calculator = {
  PI: 3.14;
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
}

module.exports = calculator; 
// calculator 라는 객체 자체를 외부에 공개
```
module 안에 있는 것들을 하나씩 공개 -> **exports** 사용
공개하고 싶은 것들을 모은 객체를 내보낼 때 -> **module.exports** 사용

모듈 내부의 것을 외부에 공개하는 방법
1) 공개하고 싶은 것들을 **하나씩 exports**로 공개
2) 공개하고 싶은 것들을 모아서 **하나의 객체**로 만들고 **module.exports**로 객체를 통째로 공개

---