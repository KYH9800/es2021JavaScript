// todo: 13장 - 키보드, 마우스 이벤트 사용하기(2048 게임)
const $table = document.getElementById("table");
const $score = document.getElementById("score");
//! 함수의 재사용을 원활하게 하기 위해서는 global scope의 변수를 최소화 하는것이 좋다.
// data와 화면이 똑같아야 된다. 허나 서로 일치 시키는 것이 정말 귀찮은 작업이다
// 그래서 react, vue, angular javaScript 라이브러리를 사용한다
// 장점: 데이터를 바꾸면 화면을 알아서 바꿔주고, 화면 바뀔 일이 있다면 데이터도 같이 바꿔준다
/* fragment의 역할
 * 성능 때문에 사용, 테이블을 그릴 때 칸이 많으면 그리는데 시간이 많이 걸린다
 * 즉, 무수히 많은 table의 태그는 그리는데 동작이 느릴 수 있다
 * fragment는 하위 tr, td 태그를 가상의 메모리 fragment에 구조를 저장
 * 이 후 한번에 불러온다. 이 후 fragment는 사라진다. (한번만 그리면 된다)
 ! 화면을 빈번하게 조작하는 (자주 그릴경우) 경우 이 fragment를 사용하는 것이 좋다
 */
let data = []; //! 2048 Game의 핵심적인 data 변수
// 게임을 시작하는 함수를 만든다
function startGame() {
  //* table > fragment(메모리 안에만 존재한다) > tr > td
  const $fragment = document.createDocumentFragment(); // 메모리 안애만 존재하는 tag
  [1, 2, 3, 4].forEach(function () {
    const rowData = [];
    data.push(rowData);
    const $tr = document.createElement("tr");
    [1, 2, 3, 4].forEach(function () {
      rowData.push(0);
      const $td = document.createElement("td");
      $tr.appendChild($td);
    });
    $fragment.appendChild($tr);
  });
  $table.appendChild($fragment);
  put2ToRandomCell(); // 2를 랜덤한 칸에 넣어준다
  draw(); // 테이블을 넣어준다
}

function put2ToRandomCell() {
  // todo: put '2' To Random-Cell
  const emptyCells = [];
  data.forEach((rowData, i) => {
    rowData.forEach((cellData, j) => {
      // 칸의 값이 0(false)이 아니면
      if (!cellData) {
        emptyCells.push([i, j]); // [0, 0] ~ [0, 3], [1, 0] ~ [1, 3] ...
      }
    });
  });
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  data[randomCell[0]][randomCell[1]] = 2;
}

function draw() {
  // todo: draw table
  data.forEach((rowData, i) => {
    rowData.forEach((cellData, j) => {
      const $target = $table.children[i].children[j];
      if (cellData > 0) {
        $target.textContent = cellData;
        $target.className = "color-" + cellData;
      } else {
        $target.textContent = "";
        $target.className = "";
      }
    });
  });
}

startGame();

//! 개발을 위한 dummy data && todo list
data = [
  [0, 2, 4, 2],
  [0, 0, 8, 0],
  [2, 0, 0, 2],
  [0, 16, 0, 4],
];
draw();

// todo: 이동 방향 판단하기 (keyup, keydown)
// 방향 판단 후 모션을 취해 줄 함수 moveCells
// 해당 칸의 같은 숫자가 있으면 두 숫자를 더한다 (중간에 다른 숫자가 있으면 못 더함)
// 2를 없애고 더한 숫자를 이동한 칸 쪽으로 몰아버린다
function moveCells(direction) {
  switch (direction) {
    //* case에 {...} block scope 활용, moveCells 함수 안에서 선언된 동명변수의 참조 관계를 끊기 위해
    case "left": {
      // 임시로 새로운 데이터를 만들어 값을 넣어준다
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (cellData) {
            const currentRow = newData[i];
            const prevData = currentRow[currentRow.length - 1];
            // 이전 값과 현재 값이 같으면
            if (prevData === cellData) {
              currentRow[currentRow.length - 1] *= -2; // 연속적으로 합쳐지지 않게 음수로 변형
            } else {
              newData[i].push(cellData);
            }
          }
        });
      });
      // 다시 돌면서 newData로 원본 data를 바꿔준다(값이 false면 0을 넣어준다)
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[i][j] = Math.abs(newData[i][j]) || 0; // 음수 값을 다시 정수로
        });
      });
      console.log(data);
      break;
    }
    case "right": {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          // j: 0 1 2 3 >> 3 - j: 3 2 1 0
          if (rowData[3 - j]) {
            const currentRow = newData[i];
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === rowData[3 - j]) {
              currentRow[currentRow.length - 1] *= -2;
            } else {
              newData[i].push(rowData[3 - j]);
            }
          }
        });
      });
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[i][3 - j] = Math.abs(newData[i][j]) || 0; // 음수 값을 다시 정수로
        });
      });
      console.log(data);
      break;
    }
    case "up": {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (cellData) {
            const currentRow = newData[j];
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === cellData) {
              currentRow[currentRow.length - 1] *= -2;
            } else {
              newData[j].push(cellData);
            }
          }
        });
      });
      console.log("up: ", newData);
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[j][i] = Math.abs(newData[i][j]) || 0; // 음수 값을 다시 정수로
        });
      });
      console.log(data);
      break;
    }
    case "down": {
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (data[3 - i][j]) {
            const currentRow = newData[j];
            const prevData = currentRow[currentRow.length - 1];
            if (prevData === data[3 - i][j]) {
              currentRow[currentRow.length - 1] *= -2;
            } else {
              newData[j].push(data[3 - i][j]);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[3 - j][i] = Math.abs(newData[i][j]) || 0; // 음수 값을 다시 정수로
        });
      });
      break;
    }
  }
  put2ToRandomCell();
  draw();
}
// 좌, 우, 아래, 위 방향키로 조절해보자
window.onkeyup = (e) => {
  if (e.key === "ArrowUp") {
    moveCells("up");
  }
  if (e.key === "ArrowDown") {
    moveCells("down");
  }
  if (e.key === "ArrowLeft") {
    moveCells("left");
  }
  if (e.key === "ArrowRight") {
    moveCells("right");
  }
};
// 마우스 드래그로 이동하는 효과를 만들어보자
let startcoord; // 시작 좌표
window.addEventListener("mousedown", (e) => {
  startcoord = [e.clientX, e.clientY];
  console.log(startcoord);
});
// 시작 좌표로 부터 움직인 구간만큼의 방향을 받아오자
window.addEventListener("mouseup", (e) => {
  const endcoord = [e.clientX, e.clientY];
  const diffX = endcoord[0] - startcoord[0]; // diff(차이)
  const diffY = endcoord[1] - startcoord[1];
  if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
    moveCells("left");
  } else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
    moveCells("right");
  } else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    moveCells("down");
  } else if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
    moveCells("up");
  }
});

// window.addEventListener("keyup", (e) => { console.log(e); });
// window.addEventListener("mousemove", (e) => { console.log(e); });

// 시작
/* const data;
for (let i = 0; i < 4; i += 1) {
  >> tr 만들고
  let row = []
  for (let j = 0; j < 4; j += 1) {
    >> $td만들고
    $tr.append('td')
    let cell = [];
    data = row.push(cell);
  }
} */
// 랜덤한 위치에 2를 놓는다
// 대기

/*
- 마우스 or 키보드 이벤트 발생
- 방향을 판단한다
- 그 방향으로 숫자들을 보낸다

if(합쳐지는 게 있는가?) { //yes
  숫자를 합쳐서 2배를 만든다
  if(2048이 되었나?) {
    yes 승리 >> 끝
  } else { // 2048이 안됬다면
    랜덤한 위치에 2를 놓는다 >> 대기
  }
} else { // no
  if(공간이 있는가?) { // yes
    랜덤한 위치에 2를 놓는다
  } else { // no
    패배 >> 끝
  }
} */
