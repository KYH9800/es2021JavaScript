// todo: 이차원 배열 다루기 게임
let $td01 = document.querySelector('#td01');
let $td02 = document.querySelector('#td02');
let $td03 = document.querySelector('#td03');
let $td04 = document.querySelector('#td04');
let $td05 = document.querySelector('#td05');
let $td06 = document.querySelector('#td06');
let $td07 = document.querySelector('#td07');
let $td08 = document.querySelector('#td08');
let $td09 = document.querySelector('#td09');

let user = true; // user의 순서
let computer = false; // computer의 순서

const onClickButton = (num) => () => { // 고차함수
  // console.log(num);
  if(user) {
    num.textContent = 'X';
    user = false;
    computer = true;
  }
  else if(computer) {
    num.textContent = 'O';
    user = true;
    computer = false;
  }
}

$td01.addEventListener('click', onClickButton($td01));
$td02.addEventListener('click', onClickButton($td02));
$td03.addEventListener('click', onClickButton($td03));
$td04.addEventListener('click', onClickButton($td04));
$td05.addEventListener('click', onClickButton($td05));
$td06.addEventListener('click', onClickButton($td06));
$td07.addEventListener('click', onClickButton($td07));
$td08.addEventListener('click', onClickButton($td08));
$td09.addEventListener('click', onClickButton($td09));