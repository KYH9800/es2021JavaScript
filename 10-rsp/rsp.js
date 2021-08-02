let $computer = document.querySelector('#computer'); // pc
let $score = document.querySelector('#score'); // score
let $result = document.querySelector('#result'); // 결과
let $user = document.querySelector('#user'); // user
let $scissors = document.querySelector('#scissors'); // 가위
let $rock = document.querySelector('#rock'); // 바위
let $paper = document.querySelector('#paper'); // 보
const IMG_URL = './rsp.png';
// computer img
// $computer.style.background = `url(${IMG_URL}) -225px 0`; // 바위
// $computer.style.background = `url(${IMG_URL}) 162px 0`; // 보
$computer.style.background = `url(${IMG_URL}) 0 0`; // 가위
$computer.style.backgroundSize = 'auto 200px';
// user img
$user.style.background = `url(${IMG_URL}) 0 0`; // 가위
$user.style.backgroundSize = 'auto 200px';

const rspX = { // 객체 리터럴
   scissors: '0', // 가위
   rock: '-225px', // 바위
   paper: '162px', // 보
}
// computer
function rspXImg(rsp) { // 가위 바위 보 이미지
   computerChice = rsp;
   $computer.style.background = `url(${IMG_URL}) ${rspX[computerChice]} 0`; // 가위
   $computer.style.backgroundSize = 'auto 200px';
}

let computerChice = 'rock';
const changeComputerHand = () => {
   if (computerChice === 'scissors') { // 가위면
      rspXImg('rock'); // 바위로
   } else if (computerChice === 'rock') { //바위면
      rspXImg('paper'); // 보로
   } else { // 보면
      rspXImg('scissors'); // 가위로
   }
}
let computerIntervalID = setInterval(changeComputerHand, 30); // 0.05초

user

function userRspXImg(rsp) { // 가위 바위 보 이미지
   userChoice = rsp;
   $user.style.background = `url(${IMG_URL}) ${rspX[userChoice]} 0`; // 가위
   $user.style.backgroundSize = 'auto 200px';
}

let userChoice = 'scissors';
const changeUserHand = () => {
   if (userChoice === 'scissors') { // 가위면
      userRspXImg('rock'); // 바위로
   } else if (userChoice === 'rock') { //바위면
      userRspXImg('paper'); // 보로
   } else { // 보면
      userRspXImg('scissors'); // 가위로
   } // setTimeout(changeUserHand, 55);
}
let userIntervalID = setInterval(changeUserHand, 50); // 0.05초
// setTimeout(changeUserHand, 55);

// let ID = setInterval(function, milliSec); // 시작
// clearInterval(ID); 종료
// todo: 버튼 click 시 승부가 날 수 있도록 이미지 정지 -> 결과 보여주기(score)
function userClearInterVal(userSrp) { // user가 선택한 묵찌빠 중 하나
   console.log(userSrp);
   $user.style.background = `url(${IMG_URL}) ${rspX[userSrp]} 0`; // 가위
   $user.style.backgroundSize = 'auto 200px';
}

function reStart() { // 결과를 본 뒤 2초 뒤 재시작
   setTimeout(() => {
      computerIntervalID = setInterval(changeComputerHand, 30); // 0.05초
      userIntervalID = setInterval(changeUserHand, 50); // 0.05초
   }, 2000);
}

const onScissorsButton = () => {
   clearInterval(computerIntervalID); // computer의 srp를 멈춘다
   clearInterval(userIntervalID); // user의 srp를 멈춘다
   userClearInterVal('scissors'); // user의 선택: 가위
   reStart(); // 재시작 함수
}

const onRockButton = () => {
   clearInterval(computerIntervalID); // computer의 srp를 멈춘다
   clearInterval(userIntervalID); // user의 srp를 멈춘다
   userClearInterVal('rock'); // user의 선택: 바위
   reStart(); // 재시작 함수
}

const onPaperButton = () => {
   clearInterval(computerIntervalID); // computer의 srp를 멈춘다
   clearInterval(userIntervalID); // user의 srp를 멈춘다
   userClearInterVal('paper'); // user의 선택: 보
   reStart(); // 재시작 함수
}

//* 승부 결과를 비교하고 이긴 쪽의 score를 올린다 (2021.08.03 화요일 할 일...)
// TODO here

$scissors.addEventListener('click', onScissorsButton);
$rock.addEventListener('click', onRockButton);
$paper.addEventListener('click', onPaperButton);