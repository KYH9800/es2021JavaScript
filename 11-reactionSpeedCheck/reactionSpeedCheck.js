let $screen = document.querySelector('#screen'); // 클릭 색상 (clickEvent)
let $button = document.querySelector('#btn'); // 클릭 색상 (clickEvent)
let $speed = document.querySelector('#speed'); // 속도 측정
let $average = document.querySelector('#average'); // 평균 속도 측정

// todo: waiting-blue, ready-red, now-green
// 전역 scope
let startTime;
let endTime;
const average = []; // 평균값을 구하기 위한 배열
// listenner function
$screen.addEventListener('click', (event) => {
   // console.log('ready: ', event.target.classList.contains('ready'));
   if (event.target.classList.contains('waiting')) { // 파랑 화면인가?
      event.target.classList.replace('waiting', 'ready');
      $screen.textContent = '초록색이 되면 클릭하세요';

      setTimeout(function () { // () => {};
         // 시간재기 new Date();
         startTime = new Date();
         $screen.textContent = '클릭하세요!!';
         $screen.classList.replace('ready', 'now');
      }, Math.floor(Math.random() * 1000) + 2000); // 2000~3000 사이

   } else if (event.target.classList.contains('ready')) { // 빨간 화면인가?
      $screen.textContent = '준비!!';
      alert('성급했어요. 다시 처음으로 돌아갑니다.');
      clearTimeout('ready');
      event.target.classList.replace('ready', 'waiting');
      $screen.textContent = '준비가 됬다면 클릭하세요';

   } else if (event.target.classList.contains('now')) { // 초록 화면인가?
      // 끝 시간 재가
      endTime = new Date(); // 시간을 나타내주는 메서드
      // 시간 차이 저장하기
      $speed.textContent = `${endTime - startTime}ms` // 현재 반응속도
      average.push(endTime - startTime); // 현재 반응 값을 평균 배열에 넣는다
      // reduce를 통해 평균 배열 안의 모든 값을 더한다
      let allNum = average.reduce((idx, currValue) => { // todo: reduce 활용하기
         return idx + currValue;
      }, 0); // 끝의 0은 초기값
      let divide = allNum / average.length // 모두 더한 값을 배열의 길이만큼 나눈다
      $average.textContent = `${Math.floor(divide)}ms` // 나타내준다
      startTime = null;
      endTime = null; // 시간을 초기화 해준다(혹시나를 대비)
      event.target.classList.replace('now', 'waiting');
      $screen.textContent = '준비가 됬다면 클릭하세요';
   }
});
$button.addEventListener('click', () => { // 초기화 버튼
   startTime = '';
   endTime = '';
   average = [];
   $speed.textContent = '0';
   $average.textContent = '0';
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