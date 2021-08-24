/* text RPG game */
const $startScreen = document.querySelector('#start-screen');
const $gameMenu = document.querySelector('#game-menu');
const $battleMenu = document.querySelector('#battle-menu');
// 주인공의 정보
const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroXp = document.querySelector('#hero-xp');
const $heroAtt = document.querySelector('#hero-att');
// 몬스터의 정보
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');
// 게임의 상황 알림 메시지
const $message = document.querySelector('#message');

// todo: class로 게임을 재구성 해보자

// addEventListener function
$startScreen.addEventListener('submit', (e) => {
  e.preventDefault(); // 기본동작인 새로고침을 막아준다
  // todo code
});

$gameMenu.addEventListener('submit', (e) => { // game-menu
  e.preventDefault();
  const input = e.target['menu-input'].value;

  if (input === '1') { // 모험
    // todo code
  } else if (input === '2') { // 휴식
    // todo code
  } else if (input === '3') { // 종료
    // todo code
  }
});

// todo: battle menu
$battleMenu.addEventListener('submit', (e) => {
  e.preventDefault()
  const input = e.target['battle-input'].value;
  if (input === '1') { // 공격
    // todo code
  } else if (input === '2') { // 회복
    // todo code
  } else if (input === '3') { // 도망
    // todo code
  }
});

//! javaScript에서의 this란? 링크: zerocho.com >> JavaScript >> this란?
// this에 대해서 학습할 수 있다
//! ECMAScript >> ES2015(ES6) function(함수) [3페이지 부근]
// 화살표 함수에서 this는 어떻게 될까?
// 도대체 this 자체는 무엇인가?