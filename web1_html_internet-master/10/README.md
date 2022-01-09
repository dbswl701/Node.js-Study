## update
[수정 링크 생성](#글수정-수정_링크_생성)
[수정할 정보 전송](#글수정-수정할_정보_전송)
[파일명 변경, 내용 저장](#글수정-파일명_변경,_내용_저장)

### 글수정-수정 링크 생성
id값이 있을때만! home에서는 update 버튼이 안보이도록!

주소에서는 http://localhost:3000/update?id=HTML 처럼 updatd 뒤에 누구를 수정할 것인지에 대한 정보를 /?id=HTML과 같이 queryString으로 넣어줄 것이다.

```js
var template = templateHTML(title, list, 
  `<h2>${title}</h2>${description}`,
  `<a href="/create">create</a> <a href="/update/?id=${title}">update</a>`
);
```
위와 같이 create, update클릭버튼을 생성해 주었는데, 특정 페이지(HTML)에서 update 버튼 클릭 시 이동하는 주소는 **/update/?id=HTML** 이 된다.

처음에 HTML 페이지로 이동하였을 때 /?id=HTML이었기에 
```js
title=queryData.id
```
에서 title은 HTML이 되어있었기 때문이다.
// update link 생성

---

### 글수정-수정할 정보 전송

update를 클릭했을 때 보여지는 화면을 만들것!

필요
1. form
2. form에 우리가 수정하고자 하는 data를 미리 넣어놓아야 하기 때문에 read 기능 필요


```js
fs.readdir('./data', function(error, filelist){
  fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
    var title = queryData.id;
    var list = templateList(filelist);
    var template = templateHTML(title, list, 
      `<h2>${title}</h2>${description}`,
      `<a href="/create">create</a> <a href="/update/?id=${title}">update</a>`
    );
    response.writeHead(200);
    response.end(template);
  });
});
```
어떤 특정한 글을 읽어오는 이 부분
id 값이 있는 경우에 대한 처리를 필요로 한다.

이 부분을 pathname === /update인 경우에 붙여넣기 한다.

---

**여기서 문제 발생**
여기까지 작성하였는데 update가 원하는대로 작동되지 않는 문제가 발생했다.

아무런 처리를 하지 않은 페이지처럼 undefined가 뜬 것.

코드를 다시 살펴보니

```js
`<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
```
이 부분에서 /update?id=~~ 여기를 /update/?id=~~~ 이렇게 적어서 주소를 인식하지 못한 것이다.

---

### form
ui를 나타내는 
```js
`<h2>${title}</h2>${description}`,
```
이 부분을 form으로 바꾼다!

앞에 적어뒀던거 그대로 복붙 한 다음 하나씩 수정해보자

form에서 submit을 했을 때 사용자가 정보를 /update_process로 보내도록 해보자.

수정이니까 기존에 있었던 정보가 칸에 들어가 있어야 할 것이다

그러기 위해서 정보를 읽어온 것을 여기다가 넣어야 한다.

HTML의 input 태그는 value라는 속성이 있어서 그 속성에다가 값을 넣어주면 value의 값이 기본 값으로 들어오게 된다.
```js
<p><input type="text" name="title" placeholder="title" value="${title}"></p>
```

textarea의 기본값은 textarea 태그 안쪽에다 넣으면 된다. 
```js
<textarea name="description" placeholder="description">${description}</textarea>
```

여기서 submit을 했을 때, update_create로 사용자가 수정한 정보를 전송 할 것인데, 어떤 파일을 수정할 것인지를 알 수 있어야 한다.

그때 title로 전송한 정보를 바탕으로 하면 문제가 생긴다.

왜냐? 사용자는 자기가 제목을 수정할 수 있기 때문이다.

사용자가 수정하는 정보와 우리가 수정하고자 하는 정보를 파일을 구분해서 전송해야 한다.


```js
<input type="hidden" name="id" value="${title}">
```
이 코드를 통해 hidden으로 submit을 통해 넘겨오는 기존 title값을 id라는 이름으로 넘겨받는다.
hidden type은 페이지에 보여지지 않는다.
update_process에서 수정되지 않은, 수정 할 파일의 이름을 받을 수 있는 것이다!

title을 수정하면 
```
id = CSS
title = CSS3
```
이렇게 저장된다.

---

## 글수정-파일명 변경, 내용 저장

update_process로 data를 전송했기 때문에 저렇게 전송한 데이터를 받아서 처리하는 방법을 알아볼 것!

post방식으로 들어온 data를 받아야 한다.
앞에 create에서 했던거 복붙

만약 사용자가 제목을 변경했다면!
id != title
ex) CSS != CSS3
기존에 있었던 file중에 CSS라는 파일을 CSS3로 이름을 바꿔야 한다.(rename)

```js
// fs.rename(oldPath, newPath, callback);
fs.rename(`data/${id}`, `data/${title}`, function(){});
```

CSS3라는 파일의 내용을 바꾸려면 fs.rename의 callback function안에 아래 내용을 추가해준다.
```js
fs.writeFile(`data/${title}`, description, 'utf8', function(err){
  response.writeHead(302, {Location: `/?id=${title}`});
  response.end('Sucess');
});
```

파일의 이름을 수정한 다음에는 수정된 파일의 이름에 해당되는 것에 우리가 받은 description 정보를 주고 이렇게 처리한 다음에 그 id값으로 들어간다.