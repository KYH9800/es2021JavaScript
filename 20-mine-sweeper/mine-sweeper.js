// todo: make a game for using reculsion function (재귀함수를 이용해 게임을 구현하세요)
const $tbody = document.querySelector('#table tbody');
const $result = document.querySelector('#result');

const row = 10; // 가로 줄
const cell = 10; // 칸
const mine = 10; // 지뢰
const CODE = { // data code
  NORMAL: -1, // 닫힌 칸(지뢰 X)
  QUESTION: -2, // 물음표 칸(지뢰 X)
  FLAG: -3, // 깃발 칸(지뢰 X)
  QUESTION_MINE: -4, // 물음표 칸(지뢰 O)
  FLAG_MINE: -5, // 깃발 칸(지뢰 O)
  MINE: -6, // 닫힌 칸(지뢰 O)
  OPENED: 0, // 0 이상이면 모두다 열린 칸
}
let data;

function plantMine() { // mine을 생산
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i; // [ 1, 2, 3, ... 99];
  });
  const suffle = [];
  while (candidate.length > row * cell - mine) {
    const mathRandom = Math.floor(Math.random() * candidate.length);
    const chosen = candidate.splice(mathRandom, 1)[0]; // [0]은 0번째 인덱스에서 값만 뺴준 것
    suffle.push(chosen);
  } // 10개를 랜덤하게 뽑는다
  const data = [];
  for (let i = 0; i < row; i += 1) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j += 1) {
      rowData.push(CODE.NORMAL); // 닫힌 칸(지뢰 X)
    }
  }
  //! 몇 칸 몇번 쨰 줄인지 나타내는 것은 사람과 똑 같다
  // suffle = [ 75, 35, 21, 5, 34, 78, 87, 97, 12, 45 ]; 예시
  for (let k = 0; k < suffle.length; k += 1) { // 0 ~ 9 번째 인덱스를 순차대로 대입
    const ver = Math.floor(suffle[k] / cell); // 0번째idx값: 75 / cell: 10 = 나눈 값: 7.5 >> 7
    const hor = suffle[k] % cell; // 0번째idx값: 75 / 10 = 나머지 값: 5
    data[ver][hor] = CODE.MINE; // data[7][5];
  }
  return data; // 해당 함수에서 제공하는 data (선언 시 전역변수와는 참조관계가 끊김)
}

function drawTable() {
  data = plantMine(); // 전역변수 data에 return으로 제공한 data 삽입
  console.log(data); //! console.log
  data.forEach((row) => {
    const $tr = document.createElement('tr');
    row.forEach((cell) => {
      const $td = document.createElement('td');
      if (cell === CODE.MINE) {
        $td.textContent = 'X'; // 개발의 편의를 위해
      }
      $tr.append($td);
    });
    $tbody.append($tr);
  });
}
drawTable();

//* 지뢰심기
//* 우 클릭으로 깃발 심기
//* 주변 지뢰 갯수 세기(optional chaining)
//? nullish coalescing, 논리 연산자의 진짜 뜻
//* 주변 칸 한번에 열기(재귀)
//* 승리 조건 체크하기(재귀 최적화)
//* 줄, 칸, 지뢰 개수 입력받기
//* 셀프체크: 첫 클릭에는 지뢰 안나오게 하기

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