문제점 : 
만약 data를 추가하면 글목록(a 태그 등)을 계속 편집해야 한다. 리스트의 수정과 삭제 등!
이를 어떻게 다이나믹하게 할 것인가!
=> data 디렉토리에 파일이 추가되거나 삭제되었을 때 Node.js를 통해 어떻게 알아낼 것인가.
nodejs file list in directory

```js
node 05/readder.js
```
제일 상위 디렉토리인 05에서 readdir.js를 실행하는 것
파일이 있는 위치가 아니라 실행하는 위치를 기준으로 해서 data라는 디렉토리의 경로를 적어준다.
```js
var testFolder = './data/';
```
그래서 ../data가 아니라 ./data가 된다.

**fs.readFile**
특정 디렉토리에서 파일을 읽어서 description이라는 변수값을 생성해준다.


## 디렉토리에 파일 추가 삭제 알기

```js
fs.readdir(testFolder, function(error, filelist){
  console.log(filelist);
}

> [ 'CSS', 'HTML', 'JavaScript' ]
```
node.js는 어떤 특정 디렉토리에 있는 파일의 목록을 배열로 이렇게 만들어서 전달한다.
그 배열을 반복문을 통해 원하는 결과를 만들어 낼 수 있다.

---

```js
<ul>
  <li><a href="/?id=HTML">HTML</a></li>
  <li><a href="/?id=CSS">CSS</a></li>
  <li><a href="/?id=JavaScript">JavaScript</a></li>
</ul>
```
데이터가 추가되었을 때 이 부분을 어떻게 처리해 줄 것인가

일단 이 부분은 
```js
${list};
```
이렇게 치환이 될 것이다.
list의 정보를 어떻게 담을 것인지 알아보자.

---

```js
var list = '<ul>';
while(i < filelist.length){
  list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
  i = i + 1;
}
list = list+'</ul>';
```
list에 + 을 이용해서 문자를 계속 추가해 준다.
filelist는 **fs.readdir()** 에서 얻어 온 data폴더의 파일 이름 배열이다.
filelist.length를 통해 data 디렉토리 안의 파일 갯수를 알아와 그만큼 while문을 돌며 해당 배열의 i번째 위치의 요소를 **${filelistp[i]}**를 통해 꺼낸다.
위와 같은 방법을 통해 파일의 list 정보를 담을 수 있다.

📌이같은 방버븐 파일이 추가되면 알아서 작동하기에 더이상 코드를 열어서 내용을 수정하지 않아도 된다!