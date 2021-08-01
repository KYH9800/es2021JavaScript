//* 태그 선택 */
let $result = document.querySelector('#result');
let $bonus = document.querySelector('#bonus');

//* listener function (callback function) */
// 45개의 번호 배열을 생성 [1, 2, 3, ... 45];
const candidate = Array(45).fill().map((ele, idx) => idx + 1);
// console.log('1 ~ 45 숫자: ', candidate);
// 랜덤으로 담을 6자리 숫자
let shuffle = [];
// todo: 피셔 예이츠 셔플 (공 뽑기), splice() 원본을 바꿈, Math.floor(), Math.ramdom()
while (candidate.length > 0) {
   const randomIdx = Math.floor(Math.random() * candidate.length); // 무작위 인덱스 뽑기
   const spliceArray = candidate.splice(randomIdx, 1); // 뽑은 값은 배열에 들어있음
   const value = spliceArray[0]; // 배열에 들어있는 값을 꺼내어
   shuffle.push(value); // shuffle에 넣어준다
}
console.log('숫자 섞기: ', shuffle);

// todo: 공 정렬하기 slice() - 원본을 바꾸지 않음, sort()
let winBalls = shuffle.slice(0, 6).sort((a, b) => a - b); // 6개의 당첨 숫자
let bonusBall = shuffle[6]; // 7번째 보너스 볼
console.log('winBalls: ', winBalls, 'bonusBall: ', bonusBall);

// todo: setTomeout() 함수로 지정시간 뒤 코드가 실행될 수 있도록 해보자
//* refactoring (중복제거)
const showBalls = (number, $target) => { // 반복된 코드를 줄이기 위한 함수
   const $ball = document.createElement('div');
   $ball.className = 'ball';
   $ball.textContent = number;
   $target.appendChild($ball);
}
// 6개의 winBalls
// [0, 1, 2, 3, 4, 5] -> [1000, 2000, 3000, 4000, 5000, 6000] 
for (let i = 0; i < 6; i += 1) {
   setTimeout(() => {
      showBalls(winBalls[i], $result);
   }, (i + 1) * 1000); // 1000 2000 3000 4000 5000 6000
}
// bonusBall
setTimeout(() => {
   showBalls(bonusBall, $bonus);
}, 8000);

//* eventListener */

/*
for (let i = candidate.length; i > 0; i--) {
   const random = Math.floor(Math.random() * i); // 무작위 인덱스 뽑기
   const spliceArray = candidate.splice(random, 1); // 뽑은 값은 배열에 들어있음
   const value = spliceArray[0]; // 배열에 들어있는 값을 꺼내어
   shuffle.push(value); // shuffle에 넣어준다
}
console.log(shuffle);
 */