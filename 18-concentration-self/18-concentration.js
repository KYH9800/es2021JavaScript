// todo self-check: 카드 수 늘리기, 몇초 걸렸는지 체크하기
const $wrapper = document.querySelector('#wrapper');

const total = parseInt(prompt('카드 갯수를 짝수로 입력하세요(최대 20)'));
console.log(total);
// if(total%2 === 1) {
//   alert('카드의 갯수는 짝수여야 합니다.');
//   return;
// }
const colors = [
  'red', 'orange', 'yellow', 'green', 'white', 'pink', 'purple', 'blue', 'silver', 'skyblue'
];
let colorSlice = colors.slice(0, total / 2); // 최대 장에서 나누기 2
// concat() 같은 배열 복사해서 똑같이 뒤에 추가(얕은복사 역할도 가능)
let colorCopy = colorSlice.concat(colorSlice); // 나눈것을 복사
let shuffled = [];
let clicked = [];
let completed = []; // 완료된 카드 배열
let clickable = false;
let startTime; // 시간을 재기 위한 startTime

function shuffle() { // 피셔 - 예이츠 셔플
  for (let i = 0; colorCopy.length > 0; i += 1) {
    const randomIdx = Math.floor(Math.random() * colorCopy.length);
    const spliced = colorCopy.splice(randomIdx, 1);
    shuffled = shuffled.concat(spliced);
  }
}
// div.card > div.card-inner > (div.card-front + div.card-back) - '형제관계'
function createCard(i) {
  const card = document.createElement('div');
  card.className = 'card'; // .card 태그 생성
  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner'; // .card-inner 태그 생성
  const cardFront = document.createElement('div');
  cardFront.className = 'card-front'; // .card-front 태그 생성
  const cardBack = document.createElement('div');
  cardBack.className = 'card-back'; // card-back 태그 생성
  cardBack.style.backgroundColor = shuffled[i];
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  return card;
}
// clicked: [2, 5, 8, 9]
// 태스크 큐: 8, 9 위로 / 아직 setTimeout이 마저 다 끝나기 전에 올라감
// 백: addEventListener(12),
function onClickCard() {
  // clickable이 true면 클릭 X, 2개가 이미 완성 된 카드면 클릭 X, 이미 한번 클릭했으면 클릭 X
  if (!clickable || completed.includes(this) || clicked[0] === this) {
    return;
  }
  // e.target.classList.toggle();
  this.classList.toggle('flipped'); // 클릭한 card가 this가 된다(addEventListenner)
  clicked.push(this);
  // 카드가 2장이 되었는가? yes? >> 대기
  if (clicked.length !== 2) return;
  // 두 카드가 똑같은가?
  const firstBackColor = clicked[0].querySelector('.card-back').style.backgroundColor;
  const secondBackColor = clicked[1].querySelector('.card-back').style.backgroundColor;
  if (firstBackColor === secondBackColor) { // 두 카드가 같은가?
    // todo 시간 체크하기
    const endTime = new Date(); //! 미래시간
    // 한번 뒤집힌 카드는 다시 클릭할 수 없다
    //* clicked = completed.concat(clicked); 아래의 3줄을 이렇게 한 줄로 구현
    completed.push(clicked[0]);
    completed.push(clicked[1]);
    clicked = [];
    // 모든 카드가 짝이 다 맞았다면 축하 메세지, 게임종료
    if (completed.length !== total) {
      return;
    } // else
    setTimeout(() => {
      alert(`축하합니다 ${Math.floor((endTime - startTime) / 1000)}초 걸렸습니다.`);
      resetGame(); // 게임이 끝나면 리셋
    }, 1000)
    return;
  } // 두 카드가 다른가?
  //* 이벤트루프를 통해 원리를 파악하고 문제점을 찾아냈고 해결했다
  //! 2. 이벤트루프 문제를 해결하기 위해 clickable을 false로 두고 카드가 두개가 됬을 때 true로 바꿔 클릭 못하게 하고 버그를 막아준다
  clickable = false; //? 이벤트루프 문제 해결을 위함
  setTimeout(() => {
    clicked[0].classList.remove('flipped'); // 다시 뒤집어 주고
    clicked[1].classList.remove('flipped'); // 다시 뒤집어 주고
    clicked = []; // 초기화
    clickable = true; //? 이벤트루프 문제 해결을 위함
  }, 600); //! 1. 백그라운드(background) >> 태스크 큐(task queue) >> 아벤트 루프(event loop) >> 호출 함수(call stack)
};

function startGame() {
  clickable = false;
  shuffle();
  for (let i = 0; i < total; i += 1) {
    const card = createCard(i);
    card.addEventListener('click', onClickCard);
    $wrapper.appendChild(card);
  }
  document.querySelectorAll('.card').forEach((card, index) => { // 초반 카드 공개
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });
  setTimeout(() => { // 카드 감추기
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('flipped');
    });
    clickable = true;
    startTime = new Date();
  }, 5000);
};
startGame();

function resetGame() {
  $wrapper.innerHTML = '';
  colorCopy = colorSlice.concat(colorSlice);
  shuffled = [];
  completed = [];
  startGame();
}