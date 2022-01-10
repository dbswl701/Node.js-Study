## 보안

만든 어플리케이션은 어떤 보안적인 요소를 가지고 있는가?

/?id=../password

이런식으로 상위디렉토리로 이동해서 탐색할 수 있는 끔찍한 상황 발생할수도 있음

이런 문제가 생길 수 있기에 보안문제가 중요


## 오염된 정보가 들어오는 경우

경로 분석
nodejs path parse

```js
var path = require('path');
path.parse('/home/user/dir/file.txt');
// Returns:
// { root:; '/',
//   dir:'/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
> path.parse('/home/user/dir/file.txt').base;
// 'file.txt'
```
이렇게 앞에까지의 경로가 있다고 해도 경로를 탐색 해 나갈 수 있는 정보를 세탁 해 나갈 수 있다.

사용자로부터 경로가 들어온 모든 곳의 내용을 바꿔줘야 한다.
외부에서 들어온 정보, 외부에서 들어온 정보가 바깥으로 나갈 때 오염될 수 있기 때문이다.


```js
var filteredId = path.parse(queryData.id).base;
fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
```
그래서 위 코드와 같이 filter를 해주어 ../password에서 ..을 제거한 password만 입력받아 더욱 안전해졌다.
나머지부분도 바꿔줌.


## 오염된 정보가 나갈 때 생길 수 있는 문제

```js
<script>
alert('merong');
</script>
```
`<script>` 라는 태그는 html 태그인데, html태그 안쪽에 있는 contents는 js가 오도록 약속되어 있다. 
nodejs가 아니라 web browser에서!

-> 이대로 submit 하면 저거 그대로 실행된다.
공격자가 저렇게 코드를 심어놓으면 다른 방문자는 저걸 보게된다.
그래서 많은 온라인 서비스들이 사용자로부터 입력을 받은 정보를 바깥쪽으로 꺼낼 때에는, 출력 시에는 문제가 될 수 있는 것들을 필터링 하는 작업을 많이 한다.

1. 사용자가 입력한 것들 중 script 태그로 되어있는 것 아예 지우기
2. script라고 되어있는 것을 웹브라우저가 해석하는 것이 아니라 스크립트의 <>를 그대로 웹브라우저 상에 표시

html entities 검색

```js
&lt;script&gt;
alert('merong');
&lt;/script&gt;
```
살균, 소독
npm sanitize html

### 방법
npm - sanitize-html(동영상 보고 다시 확인) 여기서 무작정 사용하면 안되고 평판 확인!
sanitize html이라는 모듈을 가져와서 우리 applicaiton에서 부품으로 사용할 것
그러기 위해서는 npm을 사용할 줄 알아야 한다.

```js
npm init
``` 
application을 npm으로 관리하기 위한 절차 시작된다.
package name : enter 치면 기본적으로 directory의 이름이 package name이 된다.
나머지 다 enter!

그러면 package.json이라는 파일이 생기고 프로젝트에 대한 정보 생성.

-g : global의 약자. pm2를 이 컴퓨터 전역에서 어디서든 쓸 수 있는 독립된 프로그램으로 깐 것.
-S : 우리가 진행하는 프로젝트에서 사용할 작은 조각의 프로그램으로써 부품으로써 사용하게 된다.


package.json
dependencies
의존성
어플리케이션이 sanitize-html을 쓰고있다면 우리의 어플리케이션은 sanitize-html에 의존하고 있다.
만들고 있는 프로젝트가 어떠한 외부 sw들에 의존하고 있는지를 적어주고 나머지는 sanitize-html이 의존하고 있는 다른 sw이다.
이런 복잡한 의존관계를 npm이 우리 대신 해주고 있다.

sanitize-html 사용방법
```js
var sanitizeHtml = require('sanitize-html');
```
-> node_modules라는 디렉토리 안에서 sanitize-html을 찾는다.


```js
var sanitizedTitle = sanitizeHtml(title);
var sanitizedDescription = sanitizeHtml(description);
```
자신이 사용하는 변수가 살균이 되었는지 변수 이름을 통해 어느정도 안심할 수 있다.

여기까지 작성했으면 입력된 정보를 저장하는 파일에는 `<script>`가 여전히 있지만 브라우저에는 보이지 않는다.

sanitize-html은 태그가 있으면, script 태그와 같이 아주 예민한 태그가 있으면 그 태그는 살균해버린다.
예민하지 않은 `<h1>` 태그는 내용은 살려준다. 태그는 없애버리지만

h1 태그를 허용하고 싶으면 메뉴얼 쭉 보고 allowedTags 이용
sanitize-html 호출할 때 두번째 인자로


// 마지막말 다시듣기
// 글 정리 내일 꼭 하기
