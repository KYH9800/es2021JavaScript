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
    $td.addEventListener('click', callback); //* 칸 callback function으로 위로 만듦
    $table.append($tr);
    $tr.appendChild($td);
  }
  rows.push(cells); // 가로행
  console.log('rows: ', rows);
}
$main.append($table); // main tag 안에 테이블을 생성
$main.append($result); // main tag 안에 결과를 보여줄 태그 생성

/* 표를 자바스크립트로 표시하면 다음과 같다
[
 [null, 'X', null],
 ['O', null, 'X'],
 [null, 'O', null],
}
*/

/*
  const $main = document.querySelector('main'); // main tag
  const $table = document.createElement('table'); // tableTag
  const $result = document.createElement('div'); // resultTag
*/
/*
  const {
    querySelector,
    createElement
  } = document; //* 구조분해할당(destructuring)
*/
/*
const data = []; // 이차원 배열 3X3, 배열 안에 배열을 3개 넣어준다
for (let i = 0; i < 3; i++) {
  data.push([]); // [ [], [], [] ] 이차원 배열
}
*/
//! tr 태그를 3번 순회해서 [] 배열을 3번 넣는다
//! tr 태그마다 td 태그를 3번씩 넣는다 / []배열 안에 []배열을 3번씩 또 넣어준다
//* 이차원 배열
/*
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