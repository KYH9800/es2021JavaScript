// 태그 선택
const $form = document.querySelector('#form');
const $input = document.querySelector('#input');
const $record = document.querySelector('#record');
const $log = document.querySelector('#log');

/* PC */
// 제공된 숫자 범위를 배열에 1~9까지 만들어 담는다
let numbers = []; // 1~9까지의 숫자를 제공
for (let i = 0; i < 10; i++) {
   numbers.push(i);
}
// 4개의 숫자를 무작위로 뽑아 배열에 담는다
let answer = []; // pc가 뽑은 4자리의 숫자 배열
for (let n = 0; n < 4; n += 1) {
   // todo: 뽑은만큼 제공된 숫자의 배열 길이도 1씩 줄어든다
   const index = Math.floor(Math.random() * (numbers.length - n)); // 0 ~ 8의 정수
   answer.push(numbers[index]);
   numbers.splice(index, 1); // 뽑은 숫자는 지워준다
}
console.log("answer: ", answer);

/* user */
// 콜백(리스너) 함수
let tries = [];
// 검사하는 함수
const ckeckInput = (input) => {
   if (input.length !== 4) { // 길이가 4자리가 아닌가?
      return alert('4자리 숫자를 입력해 주세요');
   }
   if (new Set(input).size !== 4) { // 중복된 숫자가 있는가?
      // new Set() 중복된 숫자는 포함하지 않는 메서드
      return alert('숫자가 중복되지 않게 입력해주세요');
   }
   if (tries.includes(input)) { // 이미 시도한 값은 아닌가? 
      return alert('이미 시도한 값입니다');
   }
   return true;
}
// submit
const onSubmit = (event) => {
   event.preventDefault() // 기본동작 막기
   let inputTag = event.target[0]; // $input Tag 선택
   const value = inputTag.value; // input의 값을 변수에 담는다 / $input.value;
   inputTag.value = '';
   inputTag.focus(); // 커서를 집중
   // 검사하는 함수(위)
   if (!ckeckInput(value)) return;
   console.log('value:', value);
   // 홈런
   if (answer.join('') === value) { // answer의 값 === 입력값 ? 홈런 : count -1 && 다시시도
      $log.textContent = `${value} 홈런!! 게임에 승리했습니다`;
      return;
   }
   // 기회는 10번
   if (tries.length >= 9) {
      const massage = document.createTextNode(`패배!! 정답은 ${answer.join('')} 입니다`);
      $log.appendChild(massage);
      $record.append(`${value}`);
      return;
   }
   // todo: 몇 스트라이크 몇 볼인지 검사하기
   let strike = 0;
   let ball = 0;
   for (let i = 0; i < answer.length; i++) {
      const index = value.indexOf(answer[i]);
      if (index > -1) { // index가 존재하는가? (일치하는 숫자 발견)
         if (index === i) { // 자릿수도 동일 (스트라이크)
            strike += 1;
         } else { // ball
            ball += 1;
         }
      }
   }
   $record.append(`${value}`, document.createElement('br')); // 입력했던 숫자 기록
   $log.append(`${strike} 스트라이크 ${ball} 볼`, document.createElement('br'));
   tries.push(value);
}

// 이벤트 리스너
$form.addEventListener('submit', onSubmit);

// Math.floor(Math.random() * 9); 소수점 이하 자르고 정수를 0 ~ 9 까지 무작위로 뽑는다
// e.preventDefault() // 기본동작 막기
/*
// pc가 뽑은 answer에 담긴 숫자가 4자리라면 user가 게임을 실행
if (answer.length === 4 && answer.indexOf(undefined) === -1) { // answer의 길이가 4이고 undefined가 없다면 참
   $log.textContent = 'pc가 4개의 숫자를 뽑았습니다.';
} else {
   history.go(0);
}
 */

/* README.md
# nunberBaseBall-self-check

number Baseball Game

numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

1. pc가 랜덤으로 주어진 숫자에서 중복되지 않게 숫자 4자리를 뽑는다.
2. user가 고른 4자리의 숫자 중에 일치하는 숫자가 있다면 ball을 알린다
3. 숫자가 일치하고 자릿수도 동일하다면, strike을 알린다.
4. 일치하는 숫자가 존재하지 않는다면, out을 알린다
5. 3번의 out 시 패배 !!
6. 모든 숫자가 존재하고 위치도 일치하면, 홈런(승리)
 */