[readFileSync vs readFile](#readfilesync_vs_readfile)

[callback](#callback)


## readFileSync vs readFile
1) fs.readFileSync(path[, options])
  - 동기적인 방식으로 진행
  - return 값 존재

2) fs.readFile(path[, options], callback)
  - 비동기적인 방식
  - callBack 존재
  - return 값 없음. 대신 함수를 세번째 인자로 준다.
  - node.js가 path의 파일을 읽는 작업이 끝나면 callback으로 준 함수를 node.js가 실행시키면서 첫번째 인자에는 error가 있다면 error를 인자로 제공, 두번째 파라미터에는 파일의 내용을 인자로 공급해주도록 한다.

---

## callback
js에서 함수는 object이다. 그렇기에 함수는 다른 함수의 인자로 쓰일 수도, 어떤 함수에 의해 return 될 수도 있다.

이러한 함수를 고차함수(higher-order functions)라고 하고, 인자로 넘겨지는 함수를 callback함수라고 한다.

즉, **다른 함수에 매개변수로 넘겨준 함수이며, 매개변수로 넘겨받은 함수는 일단 넘겨받고, 때가 되면 나중에 호출(callback) 한다.**
- 고차함수 : 함수를 인자로 받거나 또는 함수를 반환함으로써 작동하는 함수.

 ```js
 function a() {
  console.log('A');
}
```
이 함수를

 ```js
var a = function() {
  console.log('A');
}
```
이렇게 이름이 없는 함수를 익명함수라고 한다.
a라는 변수의 값으로써 함수 존재
js에서는 함수는 값이라는 것을 의미! (???)
```js
a();
```
이렇게 a라는 변수 뒤에 함수를 호출하는 () 기호를 놓는 것을 통해 a라는 변수가 담고 있는 값인 함수를 실행할 수 있다.

이 a라는 함수를 
```js
var a = function() {
  console.log('A');
}
function slowfunc(callback){
  callback();
}
slowfunc(a);
```
이런식으로 slowfunc()의 callback함수로 사용할 수 있다.

