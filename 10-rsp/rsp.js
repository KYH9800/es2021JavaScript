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

const rspX = {
   scissors: '0', // 가위
   rock: '-225px', // 바위
   paper: '162px', // 보
}
// computer
function rspXImg(rsp) { // 가위 바위 보 이미지
   coord = rsp;
   $computer.style.background = `url(${IMG_URL}) ${rsp} 0`; // 가위
   $computer.style.backgroundSize = 'auto 200px';
}

let coord = 0;
setInterval(() => {
   if (coord === rspX.scissors) { // 가위면
      rspXImg(rspX.rock); // 바위로
   } else if (coord === rspX.rock) { //바위면
      rspXImg(rspX.paper); // 보로
   } else { // 보면
      rspXImg(rspX.scissors); // 가위로
   }
}, 50); // 0.05초

// user
function userRspXImg(rsp) { // 가위 바위 보 이미지
   userCoord = rsp;
   $user.style.background = `url(${IMG_URL}) ${rsp} 0`; // 가위
   $user.style.backgroundSize = 'auto 200px';
}

let userCoord = 0;
setInterval(() => {
   if (userCoord === rspX.scissors) { // 가위면
      userRspXImg(rspX.rock); // 바위로
   } else if (userCoord === rspX.rock) { //바위면
      userRspXImg(rspX.paper); // 보로
   } else { // 보면
      userRspXImg(rspX.scissors); // 가위로
   }
}, 55); // 0.05초

// todo: 버튼 click 시 승부가 날 수 있도록 이미지 정지 -> 결과 보여주기(score)