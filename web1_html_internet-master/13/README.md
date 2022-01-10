## 모듈

코드 작성하는 과정에서 코드가 늘어나면 잘 정리정돈 할 필요 있다.(배열 객체 함수)

이러한 객체가 많아지면 그 객체를 정리정돈 할 수 있는 더 큰 틀의 정리정돈 도구 필요 = 모듈
모듈이 가장 큰 도구라고 할 수 있다.

많은 객체를 정리정돈할 수 있는 모듈을 이용해 파일로 쪼개서 외부로 독립시킬 수 있다.

syntax 폴더의 mpart.js에서 작성한 내용을 muse.js에서 사용하고자 한다면?

```js
module.exports = M;
```
우리가 만들고 있는 모듈인 모듈이 담겨 있는 mpart.js라는 파일에 있는 여러 기능들 중에서 이 M이 가리키는 저 객체를 이 모듈 바깥에서 사용할 수 있도록 exports 하겠다.


```js
var part = require('./mpart.js');
console.log(part);
```
모듈을 가져올때는 지금껏 해왔던 require 사용
part라는 변수는 이 모듈을 로딩한 결과를 part에 담았는데, part라는 변수는 객체가 들어있고 객체는 module.exports의 값으로 대입한 객체.(muse, mpart 코드 해당)
```js

```

## 코드 작성
./lib/template.js에 지금까지 작성했던 template 객체를 이동시켜 main.js에서
```js
var template = require('./lib/template.js');
```
로 사용하게 하였다.