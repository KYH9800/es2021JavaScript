let $screen = document.querySelector('#screen'); // 클릭 색상 (clickEvent)
let $record = document.querySelector('#record'); // 평균을 계산하기 위한 기록 표시
let $speed = document.querySelector('#speed'); // 속도 측정
let $average = document.querySelector('#average'); // 평균 속도 측정

// todo: waiting-blue, ready-red, now-green
let time = 0;
let record = [];
// listenner function
$screen.addEventListener('click', (event) => {
   // console.log('ready: ', event.target.classList.contains('ready'));
   if (event.target.classList.contains('waiting')) { // 파랑 화면인가?
      event.target.classList.replace('waiting', 'ready');
      $screen.textContent = '초록색이 되면 클릭하세요';

      setTimeout(function () { // () => {};
         $screen.classList.replace('ready', 'now');
         $screen.textContent = '클릭하세요!!';
         // 시간재기
      }, Math.floor(Math.random() * 1000) + 2000); // 2000~3000 사이

   } else if (event.target.classList.contains('ready')) { // 빨간 화면인가?
      $screen.textContent = '준비!!';
      alert('성급했어요. 다시 처음으로 돌아갑니다.');
      clearTimeout(ready);
      event.target.classList.replace('ready', 'waiting');
      $screen.textContent = '준비가 됬다면 클릭하세요';

   } else if (event.target.classList.contains('now')) { // 초록 화면인가?
      // 끝 시간 재가
      // 시간 차이 저장하기
      event.target.classList.replace('now', 'waiting');
      $screen.textContent = '준비가 됬다면 클릭하세요';
   }
});

/**
 ** event.target.classList.replace('원래 클래스', '바꿀 클래스'); - class 바꾸기
 ** event.target.classList.remove('클래스'); - class 삭제하기
 ** event.target.classList.add('클래스'); - class 추가하기
 */

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

// new Date();