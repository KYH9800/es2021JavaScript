let $computer = document.querySelector('#computer'); // pc
let $pcScore = document.querySelector('#pcScore'); // pc score
let $userScore = document.querySelector('#userScore'); // user score
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
//* computer
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
//* user

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
   // console.log(userSrp);
   $user.style.background = `url(${IMG_URL}) ${rspX[userSrp]} 0`; // 가위
   $user.style.backgroundSize = 'auto 200px';
}

function reStart() { // 결과를 본 뒤 2초 뒤 재시작
   setTimeout(() => {
      // 연속 클릭 버그 해결을 위해 변수에 담긴걸 없애준다
      computerIntervalID = setInterval(changeComputerHand, 30); // 0.05초
      userIntervalID = setInterval(changeUserHand, 50); // 0.05초
      $scissors.addEventListener('click', onScissorsButton);
      $rock.addEventListener('click', onRockButton);
      $paper.addEventListener('click', onPaperButton);
      clicked = true;
   }, 2000);
}

// 승패 결과
function winOrLose(result) {
   // todo: 승부 결과를 TODO HERE..
   if (result === 'scissors') {
      if (computerChice === 'rock') {
         $result.textContent = '패배';
      } else if (computerChice === 'paper') {
         $result.textContent = '승리';
      } else {
         $result.textContent = '무승부';
      }
   }
   if (result === 'rock') {
      if (computerChice === 'paper') {
         $result.textContent = '패배';
      } else if (computerChice === 'scissors') {
         $result.textContent = '승리';
      } else {
         $result.textContent = '무승부';
      }
   }
   if (result === 'paper') {
      if (computerChice === 'scissors') {
         $result.textContent = '패배';
      } else if (computerChice === 'rock') {
         $result.textContent = '승리';
      } else {
         $result.textContent = '무승부';
      }
   }
   setTimeout(() => { // 승부결과 2초뒤 리셋
      $result.textContent = '';
   }, 2000);
}

// 클릭버튼 반복 함수
// todo: 가위 바위 보 승.패 결과를 여기에 작성한다
let clicked = true;
const onClickButton = (srpX) => {
   $scissors.removeEventListener('click', onScissorsButton);
   $rock.removeEventListener('click', onRockButton);
   $paper.removeEventListener('click', onPaperButton);
   if (clicked) { // 클릭을 했으면, 아래의 코드를 실행
      clearInterval(computerIntervalID); // computer의 srp를 멈춘다
      console.log('computerChice: ', computerChice); // 멈췄을때 computer의 결과
      clearInterval(userIntervalID); // user의 srp를 멈춘다
      userClearInterVal(srpX); // user의 선택: 가위
      clicked = false;
      // 나의 선택 조건문(삼항연산자)
      const myChoice = event.target.id;
      console.log('myChoice: ', myChoice);
      winOrLose(srpX);
      reStart(); // 재시작 함수
   }
}

const onScissorsButton = () => onClickButton('scissors'); // 가위
const onRockButton = () => onClickButton('rock'); // 바위
const onPaperButton = () => onClickButton('paper'); // 보

$scissors.addEventListener('click', onScissorsButton);
$rock.addEventListener('click', onRockButton);
$paper.addEventListener('click', onPaperButton);

//* 승부 결과를 비교하고 이긴 쪽의 score를 올린다 (삼항연산자 사용)
// return 조건 ? true : false;

/*
* ** .removeEventListener('click', () => {}) 의 주의점 **
   1. addEventListener의 함수와 removeEventListener의 함수를 === 연산을 할 때,
   false가 나온다

   2. 함수도 객체다. 객체끼리 즉, func(1) === func(1) // false 가 나온다

   3. [플래그변수] / let func1 = func(1); 변수에 함수(객체)를 담고.. 비교하면 비로소
   func1 === func1 // true가 나온다.
*/

/*
// 나의 선택 조건문(삼항연산자)
const myChoice = event.target.textContent === '바위' ?
         'rock' :
         event.target.textContent === '가위' ?
         'scissors' :
         'paper';
*/