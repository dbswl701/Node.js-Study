# Node.js에서 파일을 다루는 방법

## CRUD
정보시스템의 핵심적인 매커니즘
create read update delete

```js
fs.readFile(`../data/${queryData.id}`, 'utf8', function(err, description){
```
해당 내용으로 ../data 경로에 있는 queryData.id라는 이름을 가지는 파일을 읽어와 description으로 반환된다.?

data 디렉토리에는 HTML, CSS, JavaScript라는 이름을 가진 파일들이 존재하며 이들은 각 이름을 가진 page들의 body 안의 본문을 그대로 가지고 있다.

페이지가 열릴 때 마다 queryData.id로 id의 value를 가져와 그 이름에 맞는 파일의 내용, 즉 해당 페이지의 본문 내용을 description으로 들고오는 것이다.

```js
<h2>${title}</h2>
<p>${description}</p>
```
description은 이렇게 title에 따른 본문내용을 다이나믹하게 보여주기 위해 사용되었다.

---

 
- 본문 내용을 사용자의 queryString에 따라서 data 경로에 있는 적당한 값을 읽은 다음 치환해준다.

- main.js를 수정하면 node.js를 껐다 켜야하지만 .html 파일이나 다른 확장자들은 수정 후 그냥 새로고침으로 바로 반영된다.
  - 페이지가 열릴 때 마다 html 파일의 내용을 읽어서 화면에 출력해 주고 있기 때문이다. 

- 파일의 읽는법을 이용하여 다이나믹한 웹페이지를 생성하는 것 까지 하였음.

---
### 참조
https://opentutorials.org/module/3549/21049