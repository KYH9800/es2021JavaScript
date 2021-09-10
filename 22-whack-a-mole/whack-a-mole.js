/* 마지막 게임: 두더지 잡기
이 게임에서는 복습이다. 지금껏 하면서 얻어 가야하는 것은 아래의 2가지다.
1. 비동기로 게임을 만들 때 이벤트 루프를 명확하게 파악한다
2. 버그를 발견 했을 때 이벤트루프를 통해 버그를 해결한다 */
const $readme = document.getElementById("readme");
const $table = document.getElementById("table");
const $button = document.getElementById("btn");
$button.addEventListener("click", () => {
  if ($button.textContent === "시작하기") {
    $button.textContent = "돌아가기";
    $readme.style.display = "none";
    startGame();
  } else if ($button.textContent === "돌아가기") {
    $button.textContent = "시작하기";
    $readme.style.display = "block";
    $table.textContent = "";
  }
});

let data = [];

function startGame() {
  const $$fragment = document.createDocumentFragment();
  for (let i = 0; i < 3; i += 1) {
    const $tr = document.createElement("tr");
    for (let j = 0; j < 3; j += 1) {
      const $td = document.createElement("td");
      $tr.appendChild($td);
    }
    $$fragment.appendChild($tr);
  }
  $table.appendChild($$fragment);
}
