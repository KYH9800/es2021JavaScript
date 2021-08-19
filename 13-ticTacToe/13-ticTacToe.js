// todo: 눌렸던 칸은 다시 클릭이 안되도록 한다
// todo: 리셋 클릭 시 칸을 비워준다
// todo: 가로 세로 대각선 3칸이 같은 모양이면, 승리
// todo: 게임이 끝나면 몇 초 뒤에 모든 칸이 리셋된다.
// tags
/** //! uncaught typeerror: illegal invocation
 //! 구조분해할당시 querySelector, createElement 는 할 수 없다 (결론)
 * const { querySelector, createElement } = document
 * const $main = querySelector('main');
 * const $table = createElement('table');
 */
// const { body } = document; => document.body //* destructuring (사용가능)
const $main = document.querySelector('main'); // main tag
const $table = document.createElement('table'); // tableTag
const $result = document.createElement('div'); // resultTag

const rows = []; // 가로열: 이차원 배열 3X3, 배열 안에 배열을 3개 넣어준다
let turn = 'O'; //* 순서는 'O' 부터 시작

//* callback(listenner) function
const callback = (event) => { //! td 칸 click 시 표시는 여기
  //? 칸에 글자가 있나? 클자가 있다면, 그 칸은 함수 종료
  // if (event.target.textContent) return; //* 아래와 동일한 동작의 로직
  if (event.target.textContent !== '') {
    console.log('빈칸이 아닙니다');
    return;
  } // else 빈칸이면
  console.log('빈칸입니다')
  event.target.textContent = turn;
  //* 턴 전환하기
  turn = (turn === 'O') ? 'X' : 'O'; // 삼항연산자
  // todo: 승부확인
}

// 3X3 테이블 생성 (html 구조 참고)
//! 반복문을 통해 이차원 배열을 생성 (주의: 제대로 생각하고 만들기)
for (let i = 0; i < 3; i++) { // tr tag를 table에 3번 넣어주자(반복문 변수 i)
  const $tr = document.createElement('tr'); // 가로
  const cells = []; // 세로행
  for (let j = 0; j < 3; j++) { // td tag를 tr에 3번 넣어주자(반복문 변수 j)
    let $td = document.createElement('td'); // 세로
    cells.push($td); // 이차원 배열
    console.log('cells: ', cells); // 세로
    //! (하단: 이벤트 버블링 #table에 이벤트 리스너 작동)
    // $td.addEventListener('click', callback); //* 칸 callback function으로 위로 만듦
    $table.append($tr);
    $tr.appendChild($td);
  }
  rows.push(cells); // 가로행
  console.log('rows: ', rows);
}
$table.addEventListener('click', callback); //! 이벤트 버블링
$main.append($table); // main tag 안에 테이블을 생성
$main.append($result); // main tag 안에 결과를 보여줄 태그 생성

//! --------------------------------- 학습 메모 --------------------------------- !//

/* 표를 자바스크립트로 표시하면 다음과 같다
[
 [null, 'X', null],
 ['O', null, 'X'],
 [null, 'O', null],
}
*/
/* //* 구조분해할당(destructuring)
const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: {
      f: 4
    }
  }
}
const { a, b, c: { d. e: { f } } } = obj;
console.log(a, b, d, f);
결과 > { 1, 2, 3, 4 } // c, e는 변수가 되지 않는다
? 문제: e만 골라서 출력해라
1. const { c: { e } } = obj;
2. const { c } = obj >> obj.c
   const { e } = c; >> c.e
*/
/*
const data = []; // 이차원 배열 3X3, 배열 안에 배열을 3개 넣어준다
for (let i = 0; i < 3; i++) {
  data.push([]); // [ [], [], [] ] 이차원 배열
}
*/
//* tr 태그를 3번 순회해서 [] 배열을 3번 넣는다
//* tr 태그마다 td 태그를 3번씩 넣는다 / []배열 안에 []배열을 3번씩 또 넣어준다
/* //* 이차원 배열
  tr
  1. []
  2. []
  3. []
  td
  1. [ [] ,[], [] ] 
  2. [ [], [], [] ] 
  3. [ [], [], [] ]
*/
//* 턴 전환하기 (리팩토링 전 version)
/*
if (turn === 'O') {
  turn = 'X';
} else if (turn === 'X') {
  turn = 'O';
}
*/
/** //* Event Bubbling && Capturing (이벤트 버블링, 캐처링)
 *! 이벤트 버블링이란? (html 현상이므로 반드시 알아두자)
 *  1. html의 특성을 미리 알아보자
 *    - html은 addEventListenner click 이벤트 발생 시 동작이 선택한 태그의 상위 부모 태그들로 올라간다
 *    - ex) td Click >> tr >> table >> body
 *  2. event가 부모 태그를 따라서 방울처럼 계속 올라간다 (공기방울이 수면위로 올라가듯이)
 *? 3. $table 태그를 click 시 이벤트 버블링 현상으로 td, tr 을 거쳐서 table이 실행되기 떄문에 정상 작동되는 것
 *  4. 만일 callback 함수 안에서 table을 가져오고 싶다면, event.currentTarget 하면된다
 *  5. event.target은 target이 누가 될지 모르는 반면, event.currentTarget은 항상 확실하게 지정한 태그만 가져온다
 *  6. 제한을 두기보다는 잘 이해하고 잘 쓰면된다
 */