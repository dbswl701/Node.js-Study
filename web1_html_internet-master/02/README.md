
### 지난 01버젼에서 바뀐 점들 및 코드 이해에 대한 설명

코드 내에서는 알아보기 쉽도록 
```
var title = queryData.id;
```
으로 작성하였다. 아래 내용 이해 시 참고.

```js
var template = `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${queryData.id}</title>
    ......
```
template안에 화면에 보여주고자 하는 내용을 html 형식으로 작성한다.
만약 그 안에서 queryString에 따른 내용 변경이 이루어지는것을 원한다면 
**${queryData.id}**과 같은 형식으로 queryData.id를 사용해 value값을 직접 집어넣는다.

---

```js
<li><a href="/?id=HTML">HTML</a></li>
<li><a href="/?id=CSS">CSS</a></li>
<li><a href="/?id=JavaScript">JavaScript</a></li>
```
링크를 클릭 시 해당 링크 이름으로 title을 번경하고자 한다면 위와 같이 작성한다.
title이름은 이 앞에서 설명한 **${queryData.id}** 이 부분 때문에 변경된다.

---

최상위 경로, 즉 루트는 / 이다.
```js
      <h1><a href="/">WEB</a></h1>
```
title을 클릭하면 루트(/)로 가도록 변경하였다.

```js
    if(_url == '/'){
      title = 'Welcome';
    }
```
루트에서도 title을 변경해 주었다.

---

제목부분은 동적으로 바꾸는 것에 대해 성공하였다.
하지만 본문은 아직 정적인 상태
본문을 파일에 본문만 저장했다가 사용자 요청이 들어왔을 때 그 요청에 해당되는 파일의 본문만 
읽어서 그 부분에 가져놓을 수 있다면...! -> 다음내용

--- 
### 참조
https://opentutorials.org/module/3549/21047