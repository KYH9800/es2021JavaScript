let $testColor = document.querySelector('#testColor'); // 클릭 색상 (clickEvent)
let $record = document.querySelector('#record'); // 평균을 계산하기 위한 기록 표시
let $speed = document.querySelector('#speed'); // 속도 측정
let $average = document.querySelector('#average'); // 평균 속도 측정

let record = [];
let randomSet = Math.floor(Math.random() * 9000) + 1000; // 랜덤 시간초

function ready() {
   setTimeout(() => {
      $testColor.style.background = 'green';
   }, randomSet);
}

const onClickColor = () => {
   $testColor.style.background = 'red'
   console.log(randomSet);
   ready(); // 준비화면 함수
}

$testColor.addEventListener('click', onClickColor);

/*
   record.push(' 2 ');
   $record.textContent = record;
*/

// function ifRed() {
//    if($testColor.style.background !== 'blue' && $testColor.style.background === 'red') {
//       $testColor.style.background = 'blue'
//       alert('nono')
//    }
// }