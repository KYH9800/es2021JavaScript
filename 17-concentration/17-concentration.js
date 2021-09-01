/* 카드 뒤집기 효과는 CSS로 구현, flipped class 유무에 따라 잎, 뒤로 뒤집힌다 (추가: 앞으로 뒤집, 제거: 뒤로 뒤집) */
const $wrapper = document.querySelector('#wrapper');

const total = 12;
const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink'];
// concat() 같은 배열 복사해서 똑같이 뒤에 추가(얕은복사 역할도 가능)
let colorCopy = colors.concat(colors);
let shuffled = [];
let clicked = [];
let completed = []; // 완료된 카드 배열
let clickable = false;

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
  }, 5000);
};
startGame();

function resetGame() {
  $wrapper.innerHTML = '';
  colorCopy = colors.concat(colors);
  shuffled = [];
  completed = [];
  startGame();
}
/* finction resetGame 에서
원본이 바뀌는 얘들은 colors에 쓰면 곤란하다
원본이 바뀌는 push, pop, unshift, shift, splice, sort() 등등...

그리고 웬만하면 원본이 안바뀌는 메서드가 재사용성이 좋다
아래의 메서드 암기 시 유용하다
concat(), slice(), every(), some(), map(), forEach(() => {...}),
find(), findIndex(), indexOf(), includes() 등등 ...
 */

/** 프로젝트를 만들때는...
 ** 서비스(프로젝트)를 기획할 때는 바보도 쓸 수 있도록 쉽게 만들어야 한다
 ** 보안적인 측면에서는 사용자가 해커라고 생각하고 서비스를 안전하게 만들어야 된다
 */

/** 효과 발생중 카드 클릭 막기
 * 이제 버그를 잡아보자
 * 1. 처음에 카드를 잠깐 보여줬다가 다시 뒤집히는 동안에는 카드를 클릭 할 수 없어야 하는데,
 * 카드를 클릭하면 카드가 뒤집힌다
 * 2. 이미 짝이 맞춰진 카드를 클릭해도 카드가 뒤집힌다
 * 3. 한 카드를 두번 연달아 클릭하면 더 이상 그 카드가 클릭되지 않는다
 * 4. 한 카드를 여러번 연달아 클릭하면 모두 다 맞췄다고 버그가 뜬다
 * 5. 서로 다른 4가지 색의 카드를 연달아 클릭하면 마지막 두 카드가 앞면을 보인 채 남아있다
 */

//! 호출 스택과 이벤트 루프 *(중요)*
/** 호출 스택과 이벤트 루프
 * 클릭 이벤트는 비동기 이벤트 입니다. 그런데 그 안에 setTimeout 같은 비동기 함수들이
 * 또 들어있으니 코드 실행 순서가 헷갈릴 수 밖에 없습니다.
 * 코드의 실행 순서를 명확하게 알고 있어야 정확하게 코드를 설계할 수 있습니다.
 * 코드의 실행 순서를 파악하려면, 호출 스택(call stack)과 이벤트 루프(event loop)라는
 * 개념을 알아야 합니다. 이제는 마주할 때가 됨. 이 문턱을 넘어야 자바스크립트를 정복함
 * 
 * 정확한 개념은 아니지만, 코드의 실행 순서를 이해 할 수 있게 어느정도 추상화 하겠음
 *!(호출 스택과 이벤트 루프 개념도를 참고 / 제로초 유튜브: 자바스크립트 강좌 11-5 참고)
 * 이정도만 알고 있어도 코드 실행 순서를 파악하는데 크게 지장은 없다
 * 
 **우선 호출 스택(call stack)은 동기 코드를 담당하고,
 **이벤트 루프(event loop)는 비동기 코드를 담당한다고 생각하면 된다.
 * 추가로 비동기 코드 실행에는 백그라운드(background)와 태스크 큐(task queue)라는
 * 개념도 등장한다
 */

/* 호출 스택, 이벤트 루프, 백그라운드, 태스크 큐

- 백그라운드: 타이머를 처리하고 이벤트를 저장하는 공간, setTimeout || addEventListener 의
콜백함수 실행 시 태스크 큐로 보냄

- 태스크 큐: queue라는 단어는 줄이라는 뜻. 실행 되어야 할 콜백 함수들이 줄서서 대기하는 곳
들어온 순서대로 실행 (함수를 직접 실행하지 않는다 / 함수는 모두 호출 스택에서 실행된다)

- 이벤트 루프: 태스크 큐에 있는 콜백 함수를 이동 시키는 존재다 (호출 스택으로)
들어온 순서대로 꺼내겠지? 호출 스택으로 이동한 함수는 그제서야 실행된다
!실행이 완료된 함수는 호출 스택을 빠져나가고, 호출 스택이 비어있으면 이벤트 루프는 태스큐에 있는 다음 함수를
!호출스택으로 옮긴다
 */

// console.trace(); 호출스택을 보여주는 메서드

//* 이벤트루프를 해결하면서...
// 이벤트루프를 알아야 버그를 찾아 해결할 수 있다
// debugger를 통해서도 찾을수 있으나 브라우저에서 중간에 멈추기 때문에 찾기 힘든 경우도 있다
// 때문에 결국 이벤트루프를 모르면 전혀 해결할 수 없다

// 제로초: 자바스크립트 강좌 11-6. 이벤트 루프 분석으로 버그 해결하기 