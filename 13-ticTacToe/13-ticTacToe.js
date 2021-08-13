// todo: 이차원 배열 다루기 게임
//* querySelector
let $td01 = document.querySelector('#td01');
let $td02 = document.querySelector('#td02');
let $td03 = document.querySelector('#td03');
let $td04 = document.querySelector('#td04');
let $td05 = document.querySelector('#td05');
let $td06 = document.querySelector('#td06');
let $td07 = document.querySelector('#td07');
let $td08 = document.querySelector('#td08');
let $td09 = document.querySelector('#td09');
// reset
let $reset = document.querySelector('#reset');

let user = true; // user의 순서
let computer = false; // computer의 순서

//* listener function(callback function)
// clickBtn
const onClickButton = (num) => () => { // 고차함수
  // console.log(num);
  clickReset = num;
  if (user) {
    num.textContent = 'X';
    user = false;
    computer = true;
  } else if (computer) {
    num.textContent = 'O';
    user = true;
    computer = false;
  }
}

// reset
function onResetBtn() {
  //! 새로고침은 안된다, 리셋을 할 때, 칸을 다 지워준다
  history.go(0);
}


//* eventListener
$td01.addEventListener('click', onClickButton($td01));
$td02.addEventListener('click', onClickButton($td02));
$td03.addEventListener('click', onClickButton($td03));
$td04.addEventListener('click', onClickButton($td04));
$td05.addEventListener('click', onClickButton($td05));
$td06.addEventListener('click', onClickButton($td06));
$td07.addEventListener('click', onClickButton($td07));
$td08.addEventListener('click', onClickButton($td08));
$td09.addEventListener('click', onClickButton($td09));
// reset
$reset.addEventListener('click', onResetBtn);

// todo: 눌렸던 칸은 다시 클릭이 안되도록 한다
// todo: 리셋 클릭 시 칸을 비워준다
// todo: 가로 세로 대각선 3칸이 같은 모양이면, 승리
// todo: 게임이 끝나면 몇 초 뒤에 모든 칸이 리셋된다.