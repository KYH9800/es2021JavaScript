/* my-self 직접 만들어보기 (막히면 진도뺴기) */
// todo: 12장 재귀함수 (지뢰찾기)
// todo: 13장 키보드 마우스 이벤트
// todo: 14장 복습
const $tbody = document.querySelector('#table tbody');
const $result = document.querySelector('#result');
// 재귀함수를 통해 지뢰찾기를 구현하세요
const rows = []; // 가로 배열
let mine = 'X'; // 지뢰

function startGame() {
  createTable();
  for (let i = 0; i < 10; i++) { // 지뢰는 10를 심어준다
    const rowsFlat = rows.flat(); // 1차원 배열로 만들고
    const randomIdx = Math.floor(Math.random() * rowsFlat.length); // 랜덤 인덱스
    rowsFlat[randomIdx].textContent = mine;
  }
}
// 지뢰를 심을 때, 자바스크립트 데이터 따로 화면의 그림 따로
function onClickButton(e) {
  // 죄클릭인가?
  // 칸이 비어있는가?
  // 지뢰가 있는가?
  if(e.target.textContent === 'X') {
    console.log('지뢰');
  }
  // 우클릭인가? (yes) >> 깃발을 심는다
  console.log(e.target);
}

function createTable() {
  for (let i = 0; i < 10; i += 1) {
    const $tr = document.createElement('tr');
    const cells = []; // 세로 행
    for (let j = 0; j < 10; j += 1) {
      const $td = document.createElement('td');
      cells.push($td);
      $td.addEventListener('click', onClickButton);
      $tbody.append($tr);
      $tr.appendChild($td);
    }
    rows.push(cells);
  }
}
startGame();

/* 순서도 */
/* 테이블을 생성한다 (10 X 10)
- 이차원 배열을 생성한다.
[ [], [], [] ... , []], 가로 10칸
[ [], [], [] ... , []], 가로 10칸
... 세로 10칸 */

/* 지뢰를 랜덤하게 심는다
- flat()으로 1차원 배열을 만든다
- mainArr.push(Math.floor(Math.random() * arr.length)); 랜덤으로 지뢰를 넣는다 */

/* 칸을 좌클릭하는 절차
조건: 지뢰가 있는가? (no)
- 주변에 지뢰가 몇개가 있는지를 표시한다
- 대기 

조건: 빈칸인가? (yes)
- 주변의 빈칸들도 같이 열어준다
- 대기

지뢰가 있는가? (yes)
- 지뢰를 밟으면 게임이 끝나고 모든 지뢰를 보여준다
- 리셋(게임종료) */

/* 칸을 우클릭하는 절차
- 깃발을 꽂아준다 */