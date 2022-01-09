// function a() {
//   console.log('A');
// }
var a = function(){
  console.log('A');
}

function slowfunc(callback){ // 굉장히 오랜 시간이 걸리는 함수
// 이 기능을 호출한 쪽에게 이 함수 실행이 끝났으니 다음일 하라고 한다면 이 함수 인자로 callback을 받으면 된다.  
  callback();
}

slowfunc(a);