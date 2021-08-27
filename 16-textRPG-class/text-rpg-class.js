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
    this.start(name); // Game.start();
  }
  // start()의 this는 Game 객체이다
  // 화살표 함수를 써야 밖같의 this를 가져온다
  // 그냥 function 함수를 쓰면 addEventListener의 this는 $gameMenu의 form이 된다
  start(name) { // Game.prototype.start = function() {...}, start: function() {...}
    this.hero = new Hero(this, name);
    $gameMenu.addEventListener('submit', this.onGameMenuInput);
    $battleMenu.addEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('game');
    this.updateHeroStat();
  };
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
  };
  onGameMenuInput = (e) => { // 밖같의 this를 가져오기 위해 화살표 함수를 쓴다
    e.preventDefault(); // 기본동작 막기
    const input = e.target['menu-input'].value;
    if (input === '1') { // 모험 ('battle')
      this.changeScreen('battle');
      const randomIdx = Math.floor(Math.random() * this.monsterList.length);
      const randomMonster = this.monsterList[randomIdx];
      this.monster = new Monster( // 새 게임에 새 몬스터 객체 생성
        this,
        randomMonster.name,
        randomMonster.hp,
        randomMonster.att,
        randomMonster.xp,
      );
      //* 재사용 되는 메서드는 따로 빼놔서 만들어 놓는것이 좋다
      this.updateMonsterStat();
      1
      this.showMessage(`몬스터와 마주쳤다. ${this.monster.name}인 것 같다!!`);
    } else if (input === '2') { // 휴식
      if (this.hero.hp === this.hero.maxHp) {
        this.showMessage(`현재 HP가 완전합니다`);
        return;
      } else {
        this.hero.hp += 20;
      }
      this.showMessage(`20의 데미지를 회복. 현재 HP: ${this.hero.hp}`);
      this.updateHeroStat();
    } else if (input === '3') { // 종료
      this.quit();
    }
  };
  onBattleMenuInput = (e) => {
    e.preventDefault(); // 기본동작 막기
    const input = e.target['battle-input'].value;
    if (input === '1') { // 공격
      const {
        hero,
        monster
      } = this;
      hero.attack(monster);
      monster.attack(hero);
      if (hero.hp <= 0) { // hero의 hp가 0보다 작거나 같으면, 새로운 캐릭터를 생성한다
        this.showMessage(`${hero.lev}레벨에서 전사. 새로운 주인공을 생성하세요`);
        this.quit(); // 게임종료
      } else if (monster.hp <= 0) { // monster의 hp가 0보다 작거나 같으면, 새로운 monster가 나온다
        this.showMessage(`몬스터를 잡아 ${monster.xp}의 경험치를 얻었다.`);
        hero.getXp(monster.xp);
        this.monster = null;
        this.changeScreen('game');
      } else { // 전투 진행중
        this.showMessage(`${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`);
      }

      this.updateHeroStat();
      this.updateMonsterStat();
    } else if (input === '2') { // 회복
      const {
        hero,
        monster
      } = this;
      if (hero.hp === hero.maxHp) {
        this.showMessage(`현재 HP가 완전합니다`);
      } else {
        hero.heal(monster);
        this.showMessage(`20의 데미지를 회복하고, ${monster.att}의 데미지를 받았다.`);
        this.updateHeroStat();
        this.updateMonsterStat();
      }
    } else if (input === '3') { // 도망
      this.changeScreen('game');
    }
  };
  updateHeroStat() { // 업데이트 hero stat
    const {
      hero
    } = this; // this.hero
    // 주인공이 없다면, 값을 비운다
    if (hero === null) {
      $heroName.textContent = '';
      $heroLevel.textContent = '';
      $heroHp.textContent = '';
      $heroXp.textContent = '';
      $heroAtt.textContent = '';
      return;
    }
    $heroName.textContent = hero.name;
    $heroLevel.textContent = `, ${hero.lev}Lev`;
    $heroHp.textContent = `, HP: ${hero.hp} / ${hero.maxHp}`;
    $heroXp.textContent = `, XP: ${hero.xp} / ${15 * hero.lev}`;
    $heroAtt.textContent = `, ATT: ${hero.att}`;
  }
  updateMonsterStat() {
    const {
      monster
    } = this; // const monster = this.monster;
    console.log(monster);
    if (monster === null) {
      $monsterName.textContent = '';
      $monsterHp.textContent = '';
      $monsterAtt.textContent = '';
      return;
    }
    // 메세지에 나타날 몬스터의 정보
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp} / ${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;
  }
  showMessage(text) { // message
    $message.textContent = text;
  }
  quit() { // 게임종료
    this.hero = null;
    this.monster = null;
    this.updateHeroStat();
    this.updateMonsterStat();
    $gameMenu.removeEventListener('submit', this.onGameMenuInput); // 지워준다
    $battleMenu.removeEventListener('submit', this.onBattleMenuInput); // 지워준다
    this.changeScreen('start');
    game = null; // game은 class 밖같 위치 class가 아님
  }
};
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
  getXp(monsterXp) {
    this.xp += monsterXp;
    if (this.xp >= this.lev * 15) {
      this.xp -= this.lev * 15;
      this.lev += 1;
      this.maxHp += 5;
      this.att += 5;
      this.hp = this.maxHp;
      this.game.showMessage(`Level Up!! Level: ${this.lev}`);
    }
  }
}

class Monster {
  constructor(game, name, hp, att, xp) {
    this.game = game; // Game.game
    this.name = name; // Monster.this.randommonster[randomIdx].name;
    this.maxHp = hp; // Monster.this.randommonster[randomIdx].hp;
    this.hp = hp; // Monster.this.randommonster[randomIdx].hp;
    this.xp = xp; // Monster.this.randommonster[randomIdx].xp;
    this.att = att; // Monster.this.randommonster[randomIdx].att;
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

/*
* this는 호출 시점에 따라 가르키는 객체가 달라잔다
! function 함수
document.addEventListener('click', function() { // addEventListener의 this는 document
  console.log(this); // document
});

! arrow function 화살표 함수
document.addEventListener('click', () => { // 밖같의 this는 window
  console.log(this); // window
});
*/