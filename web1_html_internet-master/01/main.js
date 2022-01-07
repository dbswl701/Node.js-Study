// query string에 따라서 다른 정보를 출력하는 웹 어플리케이션...

// http, fs, url이라는 것들은 module이라고 하는데, Node.js가 가지고 있는 
// 수많은 기능들을 비슷한 것들끼리 그룹핑 한 것들을 말한다
// url이라는 모듈은 url이라는 변수를 통해서 사용 할 것이다!
// url이라는 객체를 가져와 좌항의 url이 상속받는다.
var http = require('http');
var fs = require('fs');
var url = require('url');
 
var app = http.createServer(function(request,response){
  // request.url : query string의 값을 가져옴 id=HTML에서 HTML의 값을 가져온다.
    var _url = request.url;

    //url 모듈을 보면 parse라는 매소드가 있는데, 이는 request로 요청된 url을 객체로 분리시켜준다.
    // request된 url의 전달방식이 http면 protocol:http라고 객체로 담는다.
    // 두번째 인자가 true라면 객체형식을 가져온다.
    // parse의 인자로 url을 전달해주고 분리된 여러 객체 중에서 속성 query를 가져온다.
    var queryData = url.parse(_url, true).query;
    // /?id=HTMl이면 queryData.id, /?name=HTMl이면 queryData.name을 사용
    console.log(queryData.id);
    if(_url == '/'){
      _url = '/index.html';
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
      
    }
    response.writeHead(200);

    //response.end(fs.readFileSync(__dirname + _url)); // 사용자가 접속한 url에 따라서 파일들을 읽어주는 코드
    response.end(queryData.id);
 
});
app.listen(3000);
