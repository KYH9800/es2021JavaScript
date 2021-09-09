// todo: 13장 - 키보드, 마우스 이벤트 사용하기(2048 게임)
const $table = document.getElementById("table");
const $score = document.getElementById("score");

// data와 화면이 똑같아야 된다. 허나 서로 일치 시키는 것이 정말 귀찮은 작업이다
// 그래서 react, vue, angular javaScript 라이브러리를 사용한다
// 장점: 데이터를 바꾸면 화면을 알아서 바꿔주고, 화면 바뀔 일이 있다면 데이터도 같이 바꿔준다
let data = [];
// 게임을 시작하는 함수를 만든다
function startGame() {
  put2ToRandomCell(); // 2를 랜덤한 칸에 넣어준다
  draw(); // 테이블을 넣어준다
}

function put2ToRandomCell() {
  // todo: put '2' To Random-Cell
}

function draw() {
  // todo: draw table
}

startGame();
