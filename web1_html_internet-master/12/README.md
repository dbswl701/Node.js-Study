[obejct vs array(배열)](#객체(Object))
[객체지향 프로그래밍](#객체지향_프로그래밍)
[코드작성](#코드작성)

## 객체(Object)

### obejct vs array(배열)

배열 : 객체와 함께 정보를 정리정돈하는 수납상자라고 상상

객체와 배열이 가지고 있는 가장 큰 차이는 이미 익숙한 배열에서 핵심은 정보를 정리정돈 할 때 순서에 따라서 정리정돈
그래서 배열에서 각각의 element는, 정보들은 고유한 식별자가 있고 그 식별자는 숫자이다. ex) 0, 1, 2, 3, 4...

객체는 순서가 없는 정보를 저장하기에 최적의 수납상자
객체는 숫자로 식별자를 주는것이 아니라 이름으로 식별자를 줄 수 있다.

객체와 배열 모두 정보를 정리정돈하는 도구이다!
하지만 배열은 순서에 따라, 객체는 순서 없이 정리정돈하는 도구이다 라는 이미지를 가지고 코드를 살펴보자.


```js
// 배열
var members = ['egoing', 'k8805', 'hoya'];
console.log(members[1]); // k8805

// 객체
어떤 역할에 대한 정보를 담는다고 하면 객체가 더 적당.
var roles = {
  'programmer':'egoing',
  'designer': 'k8805',
  'manager' : 'hoya'
}
console.log(roles.designer);  /// k8805
```
배열은 그냥 순서대로 넣으면 된다. 

객체는 data를 그냥 넣는 것이 아니라 각각의 데이터 마다 고유한 이름을 준다.


### 반복
```js
// 배열
var members = ['egoing', 'k8805', 'hoya'];

var i = 0;
while(i<members.length){
  console.log('arr loop', members[i]);
  i = i+1;
}

// 객체
var roles = {
  'programmer':'egoing',  // 식별자(key) : value
  'designer': 'k8805',
  'manager' : 'hoya'
}

for(var name in roles){ 
  console.log('object => ', name, 'value =>', roles[name]); 
}
```
name이라고 하는 변수에는 객체의 식별자(key)가 들어오도록 약속되어있다.

value의 값을 얻기 위해서는 roles[name]를 사용하여 key에 해당하는 정보를 가지고 온다.

객체에 있는 정보를 가지고 올 때
```js
console.log(roles.designer);  /// k8805
console.log(rolesp['designer']); 
```
둘 다 동일한 결과이다.

---

## 객체지향 프로그래밍
**object oriented programming(oop)**

이 프로그래밍 스타일, 프로그래밍에 필요한 어떤 기능들을 살펴보는 시간

js에서 **함수**는 처리해야 하는 일에 대한 정보를 담고 있는 statement라고 할 수 있으면서 동시에 값이다.

함수는 값이기에 변수에 넣을 수 있다.

if, while, ... 등은 값이 될 수 없다.

```js
function f1(){
  console.log(1+1);
  console.log(1+2);
}

var i = if(true){console.log(1)}; // 에러발생
var w = while(true){console.log(1)};  // 에러발생
```

하지만 function은 값이 될 수 있다.

```js
var f = function f1(){
  console.log(1+1);
  console.log(1+2);
}
console.log(f); // 실행
```

js에서는 function이라고 하는 statement가 다른 statement와는 다르게 값이 될 수 있다.

즉, 처리방법을 담고 있는 구문이면서 동시에 그것 자체가 값이 될 수 있다.

서로 연관된 data를 그룹핑하는 객체
```js
var a = [f] // 배열에 원소가 담겼는데 f는 함수
a[0]();
```
배열의 원소로써 함수가 존재할 수 있고

```js
var o = {
  func: f// func라고 하는 객체의 원소(프러퍼티)로 함수
}
o.func();
```
js에서 배열과 객체는 모두 서로 연관된 데이터를 담고 있는 그릇인데,js에서는 처리방법을 그룹핑하는 함수 조차도 data이기도 하기 때문에 배열과 객체에 담을 수 있다.

---

js에서 함수는 값이기도 해서 배열과 객체에 담을 수 있다. 그런데 값으로써 함수를 배열에 담는 경우는 많지 않다.
대신 객체에 많이 담음.

객체에 함수를 담는 것을 통해서 무엇을 할 수 있고, 어떤 점이 좋아지는지를 살펴보자.

```js
var v1 = 'v1';
v1 = 'egoing';
var v2 = 'v2';
// 이러한 일을 방지하고자 아래와 같이 묶을 수 있다.

var o = {
  v1: 'v1',
  v2: 'v2',
  f1: function(){
    console.log(this.v1);
  }
  f2: function(){
    console.log(this.v2);
  }
}

o.f1();
o.f2();
```

함수는 값이다. 객체는 값을 저장하는 그릇이다. 라고 하는 특성을 이용해서 서로 연관된 데이터와 연관된 처리방법들을 담고 있는 함수들을 그룹핑하는 것을 통해서 코드의 **복잡성을 획기적으로 낮출 수 있다.** 


함수가 객체 안에서 사용될 때 함수가 자신이 속해있는 객체를 참조할 수 있는, **this**라고 하는 약속된 keyword를 만들어내었다.

객체 = 서로 연관된 데이터와 그 데이터를 처리하는 방법인 함수를 그룹핑해서 코드의 복잡성을 낮추는 코드의 수납상자

---
## 코드작성
지금까지 작성한 코드를 보면
```js
function templateHTML(title, list, body, control){};
function templateList(filelist){};
```
와 같이 **template**라는 접두사가 붙는다. 
함수나 변수의 이름을 정할 때 접두사, 접미사를 쓰는 이유는 서로 성격이 같은 것들을 그룹핑하기 위해 이름 사용.
이름보다도 객체를 통해서 이를 정리정돈 할 수 있다면 훨씬 더 좋을것!


프로퍼티 = 객체에 있는 값 하나하나

```js
var template = {
  html: function(){}
}, list: function(){}
```
html과 list라고 하는 함수를 가지고 있는 하나의 객체를 만들었고 그 객체의 이름을 template이라고 지어주었다.

```js
/*
var list = templateList(filelist);
var template = templateHTML(title, list, 
  `<h2>${title}</h2>${description}`,
  `<a href="/create">create</a>`
);
response.writeHead(200);
response.end(template);
*/

var list = template.list(filelist);
var html = template.HTML(title, list, 
  `<h2>${title}</h2>${description}`,
  `<a href="/create">create</a>`
);
response.writeHead(200);
response.end(html);
```

리펙토링(refactoring) : 동작방법은 똑같이 유지하면서 내부의 코드를 더욱 효율적으로 바꾸는 행위