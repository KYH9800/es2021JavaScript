/* 마지막 게임: 두더지 잡기
이 게임에서는 복습이다. 지금껏 하면서 얻어 가야하는 것은 아래의 2가지다.
1. 비동기로 게임을 만들 때 이벤트 루프를 명확하게 파악한다
2. 버그를 발견 했을 때 이벤트루프를 통해 버그를 해결한다 */
const $readme = document.getElementById("readme");
const $button = document.getElementById("btn");
const $row = document.getElementById("row");

const $timer = document.querySelector("#timer");
const $score = document.querySelector("#score");
const $game = document.querySelector("#game");
const $$cell = document.querySelectorAll(".cell");
const $life = document.querySelector("#life");

const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let started = false;
let score = 0;
let tickId = null;
let timerId = null;
let time = 10;
let life = 3; // 목숨 3개

$row.style.display = "none"; // none으로 바꿔서 시작화면 감추기
$button.addEventListener("click", () => {
  if ($button.textContent === "시작하기") {
    start();
  } else if ($button.textContent === "돌아가기") {
    resetGame();
  }
});

function resetGame() {
  clearInterval(tickId);
  clearInterval(timerId);
  time = 10;
  life = 3;
  $life.textContent = 3;
  $timer.textContent = 0;
  $score.textContent = 0;
  $button.textContent = "시작하기";
  $readme.style.display = "block";
  $row.style.display = "none";
}

function start() {
  // 시작할 떄 점수 초기화, 타임 아웃 시 매번 reset하면 점수 결과가 계속 0으로 나온다.
  score = 0;
  $button.textContent = "돌아가기";
  $readme.style.display = "none";
  $row.style.display = "block";
  // 이미 시작했으면 무시
  if (started) return;
  timerId = setInterval(() => {
    //! 컴퓨터가 소수점은 잘 계산하지 못한다. 때문에 정수로 바꿔서 계산을 해야된다
    time = (time * 10 - 1) / 10; // 소수점 계산시 문제있음
    $timer.textContent = time;
    if (time === 0) {
      clearInterval(timerId);
      clearInterval(tickId);
      setTimeout(() => {
        alert(`게임 오버!! 점수는 ${score}점 입니다.`);
      }, 50);
      resetGame();
    }
  }, 100);
  tickId = setInterval(tick, 1000);
  tick();
}
/* 두더지와 폭탄 결정하기
- 두더지와 빈 칸의 비율은 tick 함수에 설정
- 두더지의 비율 30%, 폭탄의 비율 20% 빈 칸의 비율을 50%로 설정
*/
let gopherPercent = 0.3; // 30%
let bombPercent = 0.5; // 50%

function tick() {
  holes.forEach((hole, index) => {
    if (hole) return; // 무언가 일어나고 있으면 return (event loop 보호장치)
    const randomValue = Math.random(); // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    if (randomValue < gopherPercent /* 0, 1, 2 */) {
      const $gopher = $$cell[index].querySelector(".gopher");
      // 1초 뒤에 사라짐
      holes[index] = setTimeout(() => {
        // console.log("add");
        $gopher.classList.add("hidden");
        holes[index] = 0;
      }, 1000);
      // console.log("remove");
      $gopher.classList.remove("hidden");
    } else if (randomValue < bombPercent /* 3, 4 */) {
      const $bomb = $$cell[index].querySelector(".bomb");
      // 1초 뒤에 사라짐
      holes[index] = setTimeout(() => {
        // console.log("add");
        $bomb.classList.add("hidden");
        holes[index] = 0;
      }, 1000);
      // console.log("remove");
      $bomb.classList.remove("hidden");
    }
  });
}

$$cell.forEach(($cell, index) => {
  // 두더지 클릭
  $cell.querySelector(".gopher").addEventListener("click", (e) => {
    if (!e.target.classList.contains("dead")) {
      score += 1; // 5점획득
      $score.textContent = score;
    } // else {...}
    e.target.classList.add("dead");
    e.target.classList.add("hidden");
    clearTimeout(holes[index]); // 기존에 내려가는 타이머 제거
    setTimeout(() => {
      holes[index] = 0;
      e.target.classList.remove("dead"); // 새로운 두더지를 위해 잡은 두더지 제거
    }, 1000);
  });
  // 폭탄 클릭
  $cell.querySelector(".bomb").addEventListener("click", (e) => {
    if (!e.target.classList.contains("boom")) {
      life--;
      $life.textContent = life;
      if (life === 0) {
        setTimeout(() => {
          alert(`게임오버!! 점수는 ${score}점 입니다.`);
        }, 50);
        resetGame();
      }
    }
    e.target.classList.add("boom");
    e.target.classList.add("hidden");
    clearTimeout(holes[index]); // 기존에 내려가는 타이머 제거
    setTimeout(() => {
      holes[index] = 0;
      e.target.classList.remove("boom"); // 새로운 폭탄을 위해 터진건 제거
    }, 1000);
  });
});

/*
$$cell[index].addEventListener("click", () => {
  console.log(`${[index + 1]}칸`);
});
*/
