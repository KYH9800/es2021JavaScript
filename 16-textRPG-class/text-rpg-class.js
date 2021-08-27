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
class Game {
  constructor(name) {
    this.monster = null;
    this.hero = new Hero(this, name);
    this.monsterList = [{
        name: '슬라임',
        hp: 25,
        att: 10,
        xp: 10,
      },
      {
        name: '스켈레톤',
        hp: 50,
        att: 15,
        xp: 20,
      },
      {
        name: '마왕',
        hp: 150,
        att: 35,
        xp: 50,
      }
    ];
    this.start(); // Game.start();
  }
  start() { // Game.prototype.start = function() {...};
    $gameMenu.addEventListener('submit', this.onGameMenuInput);
    $battleMenu.addEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('game');
  }
  changeScreen(screen) {
    if (screen === 'start') { // screen이 start면? 
      $startScreen.style.display = 'block';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'none';
    } else if (screen === 'game') { // screen이 game이면?
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'block';
      $battleMenu.style.display = 'none';
    } else if (screen === 'battle') { // screen이 battle이면?
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'block';
    }
  }
  onGameMenuInput = (e) => {
    e.preventDefault(); // 기본동작 막기
    const input = e.target['menu-input'].value;
    if (input === '1') { // 모험 ('battle')
      this.changeScreen('battle');
    } else if (input === '2') { // 휴식
      console.log('휴식');
    } else if (input === '3') { // 종료
      console.log('종료');
    }
  }
  onBattleMenuInput = (e) => {
    e.preventDefault(); // 기본동작 막기
    const input = e.target['battle-input'].value;
    if (input === '1') { // 공격
      console.log('공격');
    } else if (input === '2') { // 회복
      console.log('회복');
    } else if (input === '3') { // 도망
      console.log('도망');
    }
  }
}
// class Game {namw인자...this.hero = new Hero(this, name);}
class Hero {
  constructor(game, name) { // Game, '고윤혁'
    this.game = game; // hero.game = Game
    this.name = name; // hero.name = '고윤혁'
    this.lev = 1;
    this.maxHp = 100;
    this.hp = 100;
    this.xp = 0;
    this.att = 10;
  }
  // Hero.prototype.attack = function() {...}; 메서드를 생성(하단)
  attack(target) {
    target.hp -= this.att;
  }
  heal(monster) {
    this.hp += 20;
    this.hp -= monster.att;
  }
}

class Monster {
  constructor(game, name, hp, att, xp) {
    this.game = game;
    this.name = name;
    this.maxHp = hp;
    this.hp = hp;
    this.xp = xp;
    this.att = att;
  }
  attack(target) {
    target.hp -= this.att;
  }
}

let game = null; // 게임 시작 전으로 값은 null
// addEventListener function
$startScreen.addEventListener('submit', (e) => {
  e.preventDefault(); // 기본동작인 새로고침을 막아준다
  e.target['name-input'].focus();
  const name = e.target['name-input'].value;
  game = new Game(name);
  // console.log(game);
});

//! javaScript에서의 this란? 링크: zerocho.com >> JavaScript >> this란?
// this에 대해서 학습할 수 있다
//! ECMAScript >> ES2015(ES6) function(함수) [3페이지 부근]
// 화살표 함수에서 this는 어떻게 될까?
// 도대체 this 자체는 무엇인가?