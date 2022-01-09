지금까지 만든것
data 디렉토리에 파일을 생성하면 그 파일을 감지해서 글 목록을 만들어주고 우리 대신에 html 코드를 생성해주는 웹 어플리케이션

문제 : 
data 디렉토리에 접근할 수 있는 것은 자기 자신 뿐이기 때문에 컨텐츠를 생성하는 것은 사이트의 소유자만 할 수 있다.
누구나 웹을 통해서 data를 전송하면 전송한 data를 data directory 안에 생성하고 싶다는 생각!

앞으로 할 것: 
컨텐츠를 사용자가 웹을 통하여 생성하고 수정하고 삭제하는 방법 알아볼 것

---

## HTML form
사용자가 서버 쪽으로 data를 전송하기 위한 방식
```js
<input type="text">
```
이렇게 하면 글씨를 입력할 수 있는 칸이 생성된다.

이 입력한 정보를 서버로 전송할 수 있게 된다!

**<input type="text">** 한 줄 입력
**<textarea></textarea>** 여러줄 입력
**<input type = "submit">** 전송버튼 생성

정보를 어디로 보낼것인가에 대한 주소 필요


1) 입력한 정보를 서버로, 즉 url로 전송하고 싶다면
- 전송하고자 하는 data들을 가지고 있는 form들을 form 이라는 태그로 감싸준다.
- name으로 설정한 이름=값 이런식으로 queryString이 만들어진다.
ex) http://localhost:3000/process%20create?title=hi&description=lorem 
-> 하지만 이 방법은 좋은 방법은 아니다!


2) 입력한 정보를 url로 보이지 않도록 하려면
- form 안에 있는 각각의 컨트롤들에 사용자가 입력한 정보를 submit 버튼을 눌렀을 때 action 속성이 가리키는 서버로 queryString의 형태로 data를 전송하는 html의 기능
- method="post"를 붙여서 url에 queryString이 보이지 않도록 전송한다. 이렇게 전송하면 아주 큰 data도 전송이 가능하다. url로 전송하면 무한히 긴 data를 수용하지 않아 data가 잘리 수 있는 문제 있음


- 사용사가 서버로부터 data를 가져 올 때는 get할 때에는 method가 get 방식이거나 생략되어있음.
- 하지만 data가 수정,삭제,추가 시에는 반드시 method를 post방식으로 해야 한다.



서버에서 data를 가져올 때는 /?id=~~~ 이런 형태로 queryString을 사용
서버에 data를 생성, 수정, 삭제등의 수정행위를 가할때는 필요한 data를 url로 보내면 절대 안된다.
눈에 보이지 않는 방식으로 보냄!

---

## main.js에서 수정한 부분

- create을 누르면 title과 description을 입력하는 화면, submit버튼을 출력하는 부분.
- placeholder속성 : 입력 부분에 사용자에게 무엇을 입력해야 하는지 가이딩해주는 글씨 입력 가능. 글씨 입력하면 사라짐.


- 우리가 한 것은 node.js 어플리케이션의 form ui를 출력하는 것 까지 함.
- 다음시간에 할 것 : 사용자가 전송한 data를 받은 node.js쪽 페이지.
process-create를 구현!