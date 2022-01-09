## delete

어떤 특정한 글을 선택한 상태에서 delete 버튼 활성화
그걸 클릭했을 때 해당 글이 data 디렉토리에서 제목이 같은 파일이 삭제되면 삭제효과

삭제버튼을 누르면 다른 페이지로 이동하지 않고 그 페이지에서 삭제하고 싶은데 link로 만들면 안된다.

link는 클릭했을 때 이동하는데, 그 주소를 copy해서 누군가에게 보낼 수 있는데 문제가 된다.

delete도 get 방식 말고 post방식
```js
/*
<a href="/delete?id=${title}">delete</a>
*/
<form>
  <input type="hidden" name="id" value="${title}">
  <input type="submit" value="delete">
</form>
```
이런식으로 delete 버튼을 생성하였다.
모양은 이상하지만 css로 어떻게든 다듬을 수 있다.

delete 를 클릭했을 때 delete_process로 data를 전송하려면 삭제하기 전에 사용자에게 다시한번 물어보는 js도 넣을 수 있다. (onsubmit)
```js
<form action="delete_process" method="post" onsubmit="lakdsjfalf">
```

---

### 사용자가 전송한 정보를 바탕으로 해서 삭제 요청을 처리하는 방법

delete_process라는 path를 이용해서 삭제를 하고싶다.

기존에 만들었던 update_process를 복사해서
```js
//fs.unlink(path, callback);
fs.unlink(`data/${id}`, function(error){
  response.writeHead(302, {Location: `/`});
  response.end('Sucess');
});
```
삭제가 끝나면 home으로 보내버릴 것

302: redireciton의 코드번호

redireciton의 헤더정보는 location: '/'

-> id 값이 없는 쪽으로 보낸다.


- 지금까지 crud라는 정보기술의 핵심적인 operation의 4가지를 모두 했다.