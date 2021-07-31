//태그선택
let $result = document.querySelector('#result'); // 결과를 보여줄 input 창
let $division = document.querySelector('#division'); // 나누기
let $multiply = document.querySelector('#multiply'); // 곱하기
let $min = document.querySelector('#min'); // 빼기
let $plus = document.querySelector('#plus'); // 더하기
// number
let $one = document.querySelector('#one'); // 1
let $two = document.querySelector('#two'); // 2
let $three = document.querySelector('#three'); // 3
let $four = document.querySelector('#four'); // 4
let $five = document.querySelector('#five'); // 5
let $six = document.querySelector('#six'); // 6
let $seven = document.querySelector('#seven'); // 7
let $eight = document.querySelector('#eight'); // 8
let $nine = document.querySelector('#nine'); // 9
let $zero = document.querySelector('#zero'); // 0
// 기능 추가
let $dot = document.querySelector('#dot'); // 점(.)
let $reset = document.querySelector('#reset'); // C(reset)
let $calculate = document.querySelector('#calculate'); // 결과버튼

// 숫자를 담을 변수를 만든다
let numOne = ''; // 처음 숫자
let numTwo = ''; // 두번 째 숫자
// 연산자를 담을 변수
let operator = '';
// 연달아 계산하기
// let continueNum = '';

/* 콜백(리스너)함수 */
// 연산자 콜백 함수
const onClickOperator = (op) => () => { // 연달아 계산이 가능하도록..(숙제)
   if (numTwo) { // 연달아 계산 시 return 으로 함수를 종료하면 안된다
      // numTwo가 존재하는데, operator가 존재한다면 numOne과 numTwo를 바로 계산해서 띄운다
      // 이후 결과값을 numOne에 넣어준다
      // numTwo를 비워주고 다시 입력해서 op를 입력해 계산한다
      // =(resultButton)은 마지막에 클릭해서 답을 조회
      if (operator === '/') {
         numOne = parseFloat(numOne) / parseFloat(numTwo);
      } else if (operator === '*') {
         numOne = parseFloat(numOne) * (numTwo);
      } else if (operator === '-') {
         numOne = parseFloat(numOne) - parseFloat(numTwo);
      } else if (operator === '+') {
         numOne = parseFloat(numOne) + parseFloat(numTwo);
      }
      numTwo = '';
   }
   // 음수 허용
   if (!numOne) {
      if ((op === '-') || (op === '+')) {
         $result.value += op;
         numOne = $result.value;
      }
   } else {
      operator = op;
      $result.value += op;
      console.log('operator: ', operator);
   }
} // high order function

// number listener funtion
const onClickNumber = (number) => () => { // numOne이 음수도 가능하도록..(숙제)
   if (!operator) {
      numOne += number;
   } else {
      numTwo += number;
   }
   $result.value += number;
   console.log('numOne', numOne);
   console.log('numTwo', numTwo);
} // 고차 함수(high order function)

// 소수점 자리까지..
const dot = () => {
   if (numOne && !numTwo && !operator) {
      numOne += '.';
      $result.value += '.';
      return;
   } else if (numTwo && operator) {
      numTwo += '.';
      $result.value += '.';
      return;
   } else {
      alert('숫자를 입력하세요');
   }
}

// reset
const reset = () => {
   $result.value = '';
   numOne = '';
   numTwo = '';
   operator = '';
}

// 결과 버튼 (숙제: while Or for 문으로 바꿔보기)
const calculateButton = () => {
   console.log('calculateButton');
   if (numTwo && operator === '/') {
      $result.value = parseFloat(numOne) / parseFloat(numTwo);
      console.log($result.value);
      return;
   } else if (numTwo && operator === '*') {
      $result.value = parseFloat(numOne) * (numTwo);
      console.log($result.value);
      return;
   } else if (numTwo && operator === '-') {
      $result.value = parseFloat(numOne) - parseFloat(numTwo);
      console.log($result.value);
      return;
   } else if (numTwo && operator === '+') {
      $result.value = parseFloat(numOne) + parseFloat(numTwo);
      console.log($result.value);
      return;
   } else {
      alert('피연산자를 입력하세요');
   }
   numOne = $result.value
   console.log(numOne);
   operator = '';
   numTwo = '';
   return;
}

/* event listener */
// 연산자
$division.addEventListener('click', onClickOperator('/'));
$multiply.addEventListener('click', onClickOperator('*'));
$min.addEventListener('click', onClickOperator('-'));
$plus.addEventListener('click', onClickOperator('+'));
// number
$zero.addEventListener('click', onClickNumber('0'));
$one.addEventListener('click', onClickNumber('1'));
$two.addEventListener('click', onClickNumber('2'));
$three.addEventListener('click', onClickNumber('3'));
$four.addEventListener('click', onClickNumber('4'));
$five.addEventListener('click', onClickNumber('5'));
$six.addEventListener('click', onClickNumber('6'));
$seven.addEventListener('click', onClickNumber('7'));
$eight.addEventListener('click', onClickNumber('8'));
$nine.addEventListener('click', onClickNumber('9'));
// 소수점 허용
$dot.addEventListener('click', dot); // refactoring...
// 리셋
$reset.addEventListener('click', reset);
// 결과 버튼
$calculate.addEventListener('click', calculateButton);

/* 중첩 if문 확인 후 중첩 제거하기 */
// 1. 공통된 각 철차를 if문(분기점) 내부에 넣는다
// 2. 가장 긴 줄을 아래로 내린다 or 가장 짧은 절차를 위로 보낸다
// 3. 짧은 절차가 끝나면 return으로 함수 종료(for문: break;)
// 4. else 제거
// 5. 다음 중첩 if문이 나올 때까지 1~4번 반복

/* 연달아 계산 가능하도록 하기 */
// onClickOperator 클릭 시 numTwo가 존재하면 조건에 맞게 계산을 한다
// return은 빼야한다 함수가 종료되면 안된다
// 결과는 numOne에 담아준다
// numTwo를 reset한다

/* 음수(-)부로 numOne부터 가능하게 하기 */
// TODO: numOne이 비었나? && op가 - 또는 + 인가?
// TODO: 결과창에 op를 띄운다
// TODO: numOne에 넣어준다

/*
const calculateButton = () => { // 결과버튼
   console.log('calculateButton');
   if(numTwo) {
      switch(operator) {
         case '/': 
            $result.value = numOne / numTwo;
            break;
         case '*':
            $result.value = numOne * numTwo;
            break;
         case '-':
            $result.value = numOne - numTwo;
            break;
         case '+':
            $result.value = parseInt(numOne) + parseInt(numTwo);
            break;
      }
   } else {
      alert('피연산자를 입력하세요');
   }
} */