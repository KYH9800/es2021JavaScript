const $main = document.querySelector('main');
const $table = document.createElement('table');
const $result = document.createElement('div');

const rows = [];
let turn = 'O';

//* 승부확인
const checkWinner = (target) => {
  let rowIdx;
  let cellIdx;
  rows.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      if (cell === target) {
        rowIdx = ri;
        cellIdx = ci;
        console.log('가로줄: ', ri + '번째 인덱스 줄의 ', '\n세로칸: ', ci + '번째 인덱스 칸');
      }
    });
  });
  // 세칸은 다 채워졌나?
  let hasWinner = false;
  // 가로줄 검사
  if (
    (rows[rowIdx][0].textContent === turn) &&
    (rows[rowIdx][1].textContent === turn) &&
    (rows[rowIdx][2].textContent === turn)
  ) {
    hasWinner = true;
    console.log('가로 빙고 WIN!!');
  }
  // 세로줄 검사
  if (
    (rows[0][cellIdx].textContent === turn) &&
    (rows[1][cellIdx].textContent === turn) &&
    (rows[2][cellIdx].textContent === turn)
  ) {
    hasWinner = true;
    console.log('세로 빙고 WIN!!');
  }
  // 대각선 검사
  if (
    (
      rows[0][0].textContent === turn &&
      rows[1][1].textContent === turn &&
      rows[2][2].textContent === turn
    ) ||
    (
      rows[0][2].textContent === turn &&
      rows[1][1].textContent === turn &&
      rows[2][0].textContent === turn
    )
  ) {
    hasWinner = true;
    console.log('대각선 빙고 WIN!!');
  }
  return hasWinner;
}

//* check Winner and Draw
const checkWinnerAndDraw = (target) => {
  const hasWinner = checkWinner(target);
  if (hasWinner) {
    $result.textContent = `${turn}님의 승리!!`;
    $table.removeEventListener('click', callback);
    return;
  }
  let draw = rows.flat().every((cell) => cell.textContent);
  console.log('draw: ', draw);
  if (draw) {
    $result.textContent = '무승부 입니다';
    return;
  }
  turn = (turn === 'O' ? 'X' : 'O');
}

//* callback(listenner) function
let clickable = true; // todo: PC의 순서동안 클릭 못하도록 하자
const callback = (event) => {
  if (!clickable) return;
  if (event.target.textContent !== '') {
    console.log('빈칸이 아닙니다');
    return;
  }
  console.log('빈칸입니다')
  event.target.textContent = turn;
  // 승부 판단하기
  checkWinnerAndDraw(event.target);
  // PC차례
  // todo: self-check - 컴퓨터의 턴 만들기
  if (turn === 'X') {
    //! filter() 조건에 해당하는 것들을 걸러준다
    const emptyCells = rows.flat().filter((value) => !value.textContent);
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    clickable = false;
    setTimeout(() => {
      randomCell.textContent = 'X';
      checkWinnerAndDraw(randomCell); // 승부 판단하기
      clickable = true;
    }, 1000);
  }
}

for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr');
  const cells = [];
  for (let j = 0; j < 3; j++) {
    let $td = document.createElement('td');
    cells.push($td);
    $table.append($tr);
    $tr.appendChild($td);
  }
  rows.push(cells);
}

$table.addEventListener('click', callback, false);
$main.append($table);
$main.append($result);
document.querySelector('#reset').addEventListener('click', () => {
  history.go(0);
});