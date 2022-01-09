## post 방식으로 전송된 data를 nodejs안에서 가져오기 위한 방법

- nodejs post data
```js
http.createServer(function(request, response){})
```
인자 : createServer에 전달된 callback 함수
createServer는 Nodejs로 웹브라우저가 접속이 들어올 때 마다 createServer의 callback함수를 Nodejs가 호출한다.

그때의 저 함수에 인자를 2개를 주는데, 
- request: 요청할 때 웹브라우저가 보낸 정보들 
- response: 응답할 때 우리가 웹브라우저에게 전송할 정보들

```js
request.on('data', function(data){})
```
웹브라우저가 post방식으로 data를 전송할 때 data가 엄청나게 많으면 그 data를 한번에 처리하다가는 프로그램이 꺼진다거나 컴퓨터에 무리가 간다거나 하는 여러가지 문제 발생

nodejs에서는 post방식으로 전송되는 데이터가 많을 경우에 대비해서 이러한 사용방법을 제공하고 있는데 data부분은
특정한 양, 100이 있으면 조각조각의 양들을 서버 쪽에서 수신 할 때마다 서버는 이 콜백함수를 호출하도록 약속되어있다. 
그 호출할 때 data라고 하는 인자를 통해서 수신한 정보를 주기로 약속.

```js
body = body + data;
```
body 에 callback이 실행될 때 마다 data를 추가해 주고 있다.

그렇게 전송한 data가 너무 크다면 접속을 끊어버리는 코드도 존재하는데 여기 안적음.

---

그렇게 정보가 조각조각 들어오다가 더이상 들어올 정보가 없으면 end 다음에 들어오는 callback 함수가 들어오도록 약속되어 있다.
```js
request.on('end', function(){})
```
end에 해당되는 callback이 실행됐을 때 정보수신이 끝났다라고 생각할 수 있다.

---
```js
var qs = require('querystring');
```
qs가 querystring이라는 nodejs가 가지고 있는 모듈을 가져오는거라고 알 수 있다.

---
```js
qs.parse(body);
```
지금까지 우리가 저장한 body를 입력값으로 주면 post data에 post 정보가 들어있을 것이다 라는 뜻.

---

**data, end** 이런거 event라고 한다.

ex) 클릭시 사용했던 'click' 같은 것인듯.

event 이용해서 웹브라우저로부터 post방식으로 전송된 data를 가져올 수 있고, 또 querystring이라는 모듈의 parse함수를 이용해서 정보를 이렇게 전환, 정확히는 객체화 할 수 있다.
```js
var title = post.title;
var description = post.description;
```
이렇게 해서 title과 본문값을 알아낼 수 있다.

다음시간 : 이렇게 받아낸 정보를 어떻게 처리 할 것인가.

---

## post 방식으로 전송된 data를 data디렉토리 안에 파일의 형태로 저장하는 방법

- nodejs file write

```js
fs.writeFile(`data/${title}`, description, 'utf8', function(err){
  response.writeHead(200);
  response.end('Sucess');
});
```
- callback이 실행된다 = 파일의 저장이 끝났다.
- 파일의 저장이 끝난 다음에 success를 해줘야 한다. 

=> 여기까지 진행했으면 data 폴더 안에 title로 작성한 이름으로 파일이 하나 생성된다.

---

### redirection
- 정보를 입력했는데 페이지에 sucess만 뜨면 사용자 입장에서는 어리둥절
- 사용자를 생성한 파일을 보는 view 페이지로 보내고 싶다!

http://localhost:3000/create_process
이 페이지에서 
http://localhost:3000/?id=Nodejs
이 페이지로 사용자를 보내버리면 사용자가 글을 쓰고 자기가 쓴 글이 잘 전송됐는지 확인하는 것 까지를 한방에 할 수 있는 아주 편리한 기능을 구현할 것!

사용자가 어떤 page(http://localhost:3000/create_process
)로 와서 어떤 처리를 한 다음에 다시 사용자를 다른 page로 튕겨버리는 것을 **redirection**이라고 한다.

301: 이 주소는 아래 경로로 영원히 바뀌었으니 여기로 계속 와라
302: page를 일시적으로(?) 다른곳으로 redirection 시킨다.


```js
fs.writeFile(`data/${title}`, description, 'utf8', function(err){
  response.writeHead(302, {Location: `/?id=${title}`});
  response.end('Sucess');
});
```
위와 같이 작성하면, Location에 있는 주소로 redirection이 된다.

우리는 지금까지 사용자가 입력한 정보를 받아서 다이나믹하게 프로그래밍 적으로 data directory에 파일을 생성하는 방법을 살펴보았다!