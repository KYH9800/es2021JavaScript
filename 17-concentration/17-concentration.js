/* 카드 뒤집기 효과는 CSS로 구현, flipped class 유무에 따라 잎, 뒤로 뒤집힌다 (추가: 앞으로 뒤집, 제거: 뒤로 뒤집) */
const $wrapper = document.querySelector('#wrapper');

const total = 12;
const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink'];
// concat() 같은 배열 복사해서 똑같이 뒤에 추가(얕은복사 역할도 가능)
let colorCopy = colors.concat(colors);
let shuffled = [];
let clicked = [];
let completed = []; // 완료된 카드 배열

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
// todo: 효과 발생중 클릭하는 것 막기 (2021/08/29)
function onClickCard() {
  // e.target.classList.toggle();
  this.classList.toggle('flipped'); // 클릭한 card가 this가 된다(addEventListenner)
  clicked.push(this);
  // 카드가 2장이 되었는가? yes? >> 대기
  if (clicked.length !== 2) return;
  // 두 카드가 똑같은가?
  const firstBackColor = clicked[0].querySelector('.card-back').style.backgroundColor;
  const secondBackColor = clicked[1].querySelector('.card-back').style.backgroundColor;
  if (firstBackColor === secondBackColor) { // 두 카드가 같은가?
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
      alert('축하합니다 모든 카드를 다 맞추셨네요');
      //! return startGame(); 카드를 다 지우고 새로 생성 (게임 재시작)
    }, 1000)
    return;
  } // 두 카드가 다른가?
  setTimeout(() => {
    clicked[0].classList.remove('flipped'); // 다시 뒤집어 주고
    clicked[1].classList.remove('flipped'); // 다시 뒤집어 주고
    clicked = []; // 초기화
  }, 600);
};

function startGame() {
  // clickable = false;
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
  }, 5000);
};
startGame();