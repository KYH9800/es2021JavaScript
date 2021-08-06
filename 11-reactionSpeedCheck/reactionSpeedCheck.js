let $testColor = document.querySelector('#testColor'); // 클릭 색상 (clickEvent)
let $record = document.querySelector('#record'); // 평균을 계산하기 위한 기록 표시
let $speed = document.querySelector('#speed'); // 속도 측정
let $average = document.querySelector('#average'); // 평균 속도 측정

const onClickColor = () => {
   console.log('click');
}

$testColor.addEventListener('click', onClickColor);