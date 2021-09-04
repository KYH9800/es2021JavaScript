/* my-self */
// todo: 12장 재귀함수 (지뢰찾기)
// todo: 13장 키보드 마우스 이벤트
// todo: 14장 복습
const $tbody = document.querySelector('#table tbody');
const $result = document.querySelector('#result');
// 재귀함수를 통해 지뢰찾기를 구현하세요
const rows = 10; // 가로
const cells = 8; // 세로

function startGame() {
  createTable(); // 테이블을 생성한다 (18 X 14)
}

function onClickButton() {
  console.log('click');
}

function createTable() {
  for (let i = 0; i < cells; i += 1) { // 세로가 14칸
    const $tr = document.createElement('tr');
    for (let j = 0; j < rows; j += 1) { // 가로가 18칸
      let $td = document.createElement('td');
      $tbody.append($tr);
      $tr.appendChild($td);
      $td.addEventListener('click', onClickButton);
    }
  }
}
startGame();
// 지뢰를 랜덤하게 심는다
// 칸을 좌클릭하는 절차
// 지뢰가 있는가? (no)
// 주변에 지뢰가 몇개가 있는지를 표시한다
// 지뢰가 있는가? (yes)
// 지뢰를 밟으면 게임이 끝나고 모든 지뢰를 보여준다 
// 칸을 우클릭하는 절차
// 깃발을 꽂아준다