// todo: make a game for using reculsion function (재귀함수를 이용해 게임을 구현하세요)
const $timer = document.querySelector("#timer");
const $tbody = document.querySelector("#table tbody");
const $result = document.querySelector("#result");
const $button = document.querySelector("#btn");

$button.addEventListener("click", () => {
  $button.style.display = "none"; // 시작하면 버튼은 없애준다
  $timer.style.display = "block"; // 시작하면 타이머를 보여준다
  // todo: 초보 중수 고수 단계 나누기
  // const row = Math.floor(prompt("가로줄 길이를 입력하세요")); // 가로 줄
  // const cell = Math.floor(prompt("세로칸은 몇칸 하실건가요?")); // 칸
  // const mine = Math.floor(prompt("몇개의 지뢰를 심을까요?")); // 지뢰 개수
  const row = 10; // 가로 줄
  const cell = 10; // 칸
  const mine = 10; // 지뢰
  const CODE = {
    // data code
    NORMAL: -1, // 닫힌 칸(지뢰 X)
    QUESTION: -2, // 물음표 칸(지뢰 X)
    FLAG: -3, // 깃발 칸(지뢰 X)
    QUESTION_MINE: -4, // 물음표 칸(지뢰 O)
    FLAG_MINE: -5, // 깃발 칸(지뢰 O)
    MINE: -6, // 닫힌 칸(지뢰 O)
    OPENED: 0, // 0 이상이면 모두다 열린 칸 / 0 ~ 8
  };
  let data;
  let openCount = 0;
  let startTime = new Date();
  // setInterval() 정해진 초마다 실행해준다
  const interval = setInterval(() => {
    const time = Math.floor((new Date() - startTime) / 1000);
    $timer.textContent = `${time}초`;
  }, 1000); // 매 초마다 하나씩 올려준다

  function plantMine() {
    // mine을 생산
    const candidate = Array(row * cell)
      .fill()
      .map((arr, i) => {
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
    for (let k = 0; k < suffle.length; k += 1) {
      // 0 ~ 9 번째 인덱스를 순차대로 대입
      const ver = Math.floor(suffle[k] / cell); // 0번째idx값: 75 / cell: 10 = 나눈 값: 7.5 >> 7
      const hor = suffle[k] % cell; // 0번째idx값: 75 / 10 = 나머지 값: 5
      data[ver][hor] = CODE.MINE; // data[7][5];
    }
    return data; // 해당 함수에서 제공하는 data (선언 시 전역변수와는 참조관계가 끊김)
  }
  // todo: 우 클릭으로 갓발 꽂기
  function onRightClick(e) {
    e.preventDefault();
    const target = e.target; // td값
    const rowIndex = target.parentNode.rowIndex; // tr
    const cellIndex = target.cellIndex; // td
    const cellData = data[rowIndex][cellIndex];
    // 지뢰면 지뢰로 없으면 없는대로
    if (cellData === CODE.MINE) {
      // 지뢰면?
      data[rowIndex][cellIndex] = CODE.QUESTION_MINE; // 물음표 지뢰로
      target.className = "question";
      target.textContent = "?";
    } else if (cellData === CODE.QUESTION_MINE) {
      // 물음표 지뢰면?
      data[rowIndex][cellIndex] = CODE.FLAG_MINE; // 깃발 지뢰로
      target.className = "flag";
      target.textContent = "!";
    } else if (cellData === CODE.FLAG_MINE) {
      // 깃발 지뢰면?
      data[rowIndex][cellIndex] = CODE.MINE; // 지뢰로
      target.className = "";
      target.textContent = "X";
    } else if (cellData === CODE.NORMAL) {
      // 닫힌 칸이면?
      data[rowIndex][cellIndex] = CODE.QUESTION; // 물음표로
      target.className = "question";
      target.textContent = "?";
    } else if (cellData === CODE.QUESTION) {
      // 물음표면?
      data[rowIndex][cellIndex] = CODE.FLAG; // 깃발로
      target.className = "flag";
      target.textContent = "!";
    } else if (cellData === CODE.FLAG) {
      // 깃발이면?
      data[rowIndex][cellIndex] = CODE.NORMAL; // 닫힌칸으로
      target.className = "";
      target.textContent = "";
    }
  }

  function countMine(rowIndex, cellIndex) {
    // 지뢰 개수를 세고 개수를 return 해준다
    const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
    let i = 0; // 지뢰 개수
    //* optional chaining ( ?. ) 앞의 값이 없다면 실행 X
    mines.includes(data[rowIndex - 1]?.[cellIndex - 1]) && i++;
    mines.includes(data[rowIndex - 1]?.[cellIndex]) && i++;
    mines.includes(data[rowIndex - 1]?.[cellIndex + 1]) && i++;
    mines.includes(data[rowIndex][cellIndex - 1]) && i++;
    mines.includes(data[rowIndex][cellIndex + 1]) && i++;
    mines.includes(data[rowIndex + 1]?.[cellIndex - 1]) && i++;
    mines.includes(data[rowIndex + 1]?.[cellIndex]) && i++;
    mines.includes(data[rowIndex + 1]?.[cellIndex + 1]) && i++;
    return i;

    //? A && B >> A가 존재하면(true) B를 실행해라
    //? A || B >> A가 존재하지 않으면(false) B를 실행해라
    //! ?. optional chaining 연산자 (true면 실행해라)
  }

  function resetGame() {
    history.go(0); // 그냥 새로고침
  }

  function open(rowIndex, cellIndex) {
    //! Uncaught TypeError: Cannot read property '5' of undefined >> 기억해두자!! optional chaining (?. 이거 추가)
    // 브라우저에서도 어디서 에러가 나는지 개발자 도구 Source 창에서 보여준다
    if (data[rowIndex]?.[cellIndex] >= CODE.OPENED) return; //* 한번 열었던 칸은 다시 열지 않는다
    const target = $tbody.children[rowIndex]?.children[cellIndex];
    if (!target) {
      return;
    }
    const count = countMine(rowIndex, cellIndex); // 지뢰 개수를 센다
    target.textContent = count || ""; // 지뢰가 있으면 세어주고 없으면, 빈문자, || 이거 말고 ??은 undifined, null일때만 뒤에를 실행
    target.className = "opened";
    data[rowIndex][cellIndex] = count;
    openCount++;
    console.log(openCount); // 몇칸을 열었는지 새어준다
    // 칸의 개수가 (지뢰를 뺀) 칸 90개를 열었으면 게임은 끝
    if (openCount === row * cell - mine) {
      const time = (new Date() - startTime) / 1000;
      clearInterval(interval); // interval 멈춰주고
      $tbody.removeEventListener("contextmenu", onRightClick);
      $tbody.removeEventListener("click", onLeftClick);
      setTimeout(() => {
        alert(`게임에서 승리하셨습니다. ${Math.floor(time)}초가 걸렸습니다.`);
        resetGame();
      }, 1000); // 1초
    }
    return count;
  }
  //! RangeError: Maximum call stack size exceeded. (reculsion function problem)
  // 해당 에러는 호출스택이 터져서 발생한 에러로 setTimeout을 통해 백그라운드로 보낸 뒤 해결
  //? 그런데 동작이 느리다. 왜일까? 브라우저도 렉이 걸린다.
  // open function 에서 열었던 칸은 열지 않도록 보호장치를 만든다 (해결 완료)
  function openAround(rI, cI) {
    setTimeout(() => {
      const count = open(rI, cI);
      if (count === 0) {
        openAround(rI - 1, cI - 1);
        openAround(rI - 1, cI);
        openAround(rI - 1, cI + 1);
        openAround(rI, cI - 1);
        openAround(rI, cI + 1);
        openAround(rI + 1, cI - 1);
        openAround(rI + 1, cI);
        openAround(rI + 1, cI + 1);
      }
    }, 0);
  }

  // todo: 좌 클릭, 주변 지뢰 갯수 세기(optional chaining)
  function onLeftClick(e) {
    const target = e.target;
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;
    const cellData = data[rowIndex]?.[cellIndex]; // optional chaining

    if (cellData === CODE.NORMAL) {
      // 닫힌 칸이면?
      openAround(rowIndex, cellIndex); // 주변의 칸을 열어준다
    } else if (cellData === CODE.MINE) {
      // 지뢰칸이면?
      target.style.background = "red";
      target.textContent = "펑";
      target.className = "opened";
      clearInterval(interval); // interval 멈춰주고
      $tbody.removeEventListener("contextmenu", onRightClick);
      $tbody.removeEventListener("click", onLeftClick);
      // 지뢰 밟으면 게임을 다시시작
      setTimeout(() => {
        alert("지뢰를 밟으셨네요. 게임을 다시 시작합니다.");
        history.go(0);
      }, 1000);
    } // 나머지는 무시
    // 아무동작도 안함
  }

  function drawTable() {
    data = plantMine(); // 전역변수 data에 return으로 제공한 data 삽입
    data.forEach((row) => {
      const $tr = document.createElement("tr");
      row.forEach((cell) => {
        const $td = document.createElement("td");
        if (cell === CODE.MINE) {
          $td.textContent = "X"; // 개발의 편의를 위해
        }
        $tr.append($td);
      });
      $tbody.append($tr);
      $tbody.addEventListener("contextmenu", onRightClick); // event Bubling
      $tbody.addEventListener("click", onLeftClick); // event Bubling
      // (td -> tr -> table -> tbody) 이벤트 버블링
      // 장점: removeEventListener를 한번만 하면되니까 편하다
    });
  }
  drawTable();
});

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
//! reculsion function try catch()
/* let i = 0;
function reculse() {
  i++;
  reculse();
}
try {
  openAround(rI, cI);
} catch (err) {
  console.log("errMsg", err);
} */
