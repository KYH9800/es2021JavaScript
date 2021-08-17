// todo: 눌렸던 칸은 다시 클릭이 안되도록 한다
// todo: 리셋 클릭 시 칸을 비워준다
// todo: 가로 세로 대각선 3칸이 같은 모양이면, 승리
// todo: 게임이 끝나면 몇 초 뒤에 모든 칸이 리셋된다.
// tag
const $main = document.querySelector('main'); // main tag

let turn = 'O';
// 이차원 배열 3X3, 배열 안에 배열을 3개 넣어준다
const data = [];
for (let i = 0; i < 3; i++) {
  data.push([]); // [ [], [], [] ] 이차원 배열
}
// 3X3 테이블 생성 (html 구조 참고)
const $table = document.createElement('table');
for (let i = 0; i < 3; i++) { // tr tag를 table에 3번 넣어주자
  const $tr = document.createElement('tr');
  for (let i = 0; i < 3; i++) { // td tag를 tr에 3번 넣어주자
    let $td = document.createElement('td');
    $td.addEventListener('click', (event) => { //! click 시 표시는 여기
      //? 칸에 글자가 있나? 클자가 있으면, 그 칸은 함수 종료
      if (event.target.textContent) return;
      //* 순서는 'O'부터 시작, 이후 턴 전환하기
      event.target.textContent = turn;
      //* 승부확인
      
      if (turn === 'O') {
        turn = 'X';
      } else if (turn === 'X') {
        turn = 'O';
      }
    });
    $tr.appendChild($td);
    $table.append($tr);
  }
}
$main.append($table); // main tag 안에 테이블을 생성

/* 표를 자바스크립트로 표시하면 다음과 같다
[
 [null, 'X', null],
 ['O', null, 'X'],
 [null, 'O', null],
}
*/

//? 구조분해 할당