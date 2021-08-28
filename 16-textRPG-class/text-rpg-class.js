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
//! 상속은 여러번에 걸쳐서 할 수 있다 (위로 올라가며 공통된 로직을 싹 찾는다. 없으면 error)
// class ParentUnit {...todo}; Unit extends ParentUnit {...todo};
class Unit { // Parent Class (다중상속 X)
  constructor(game, name, hp, att, xp) {
    this.game = game;
    this.name = name;
    this.maxHp = hp;
    this.hp = hp;
    this.att = att;
    this.xp = xp;
  }
  attack(target) {
    target.hp -= this.att;
  } // 공통부분, 다른부분은 밑에 super.attack(target);으로 공통된걸 불러온 후 로직 추가
}
class Hero extends Unit { // 상속
  constructor(game, name) { // Game, '고윤혁'
    super(game, name, 100, 10, 0); // 부모 클래스에서 받아온 공통인자
    this.lev = 1;
  } // attack(){...}이 Unit에 있어서 뺸다(상속)
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
class Monster extends Unit {
  constructor(game, name, hp, att, xp) {
    super(game, name, hp, att, xp);
  } // attack(){...}이 Unit에 있어서 뺸다(상속)
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

  // start()의 this는 Game 객체이다
  // 화살표 함수를 써야 밖같의 this를 가져온다
  // 그냥 function 함수를 쓰면 addEventListener의 this는 $gameMenu의 form이 된다
*/
/*
class Hero extends Unit {
  constructor(){
    super(game, name, 인자값, 인자값, 인자값);
    (이어서)... 공통되지 못한 로직 추가
  }
* 공통된 메서드는 뺴도된다
? 공통된 메서드에 각각 다르게 추가할 로직이 있다면? (아래와 같이 super.객체 활용)
! attack() {
!   super.attack(target); 부모 클래스의 attack
!   ...부모 클래스 attack 외의 동작
! }
}
*/

//* 정리
//? window
// 브라우저에서 document와 console은 실제로 window.document, window.console이다
// 앞의 window가 생략된 것
//? this
// this는 기본적으로 window다 어떤 떄 다른 값을 가지는지만 외우면 된다
// Node에서는 globalThis가 window다
// 객체를 통해 this를 사용할 때는 this가 해당 객체를 가리키게 된다
// 특정 메서드는 콜백 함수의 this를 바꿉니다. addEventListener가 대표적이다(this는 tag를 가리킴)
// this가 바뀌는 것을 원하지 않을 때는, 함수 선언문 대신 화살표 함수를 사용한다

//? 참조, 깊은복사, 얕은복사
// 깊은복사: JSON.parse(JSON.stringify(...));
// - 껍데기와 안까지 모두 참조관계가 끊기고 복사가 되므로 값이 변하지 않는다
// 얕은복사: slice(), 이 두개가 목적에 제일 부합하다 [...arr]; {...obj};
// - 껍대기만 복사하고 안의 갚은 수정이 가능하거나 바뀐다
//! 실무에서는 깊은복사 경우 라이브러리를 통해 깊은 복사를 한다
//! (참고: lodash 라이브러리의 clone함수)
// 예시 code (하단)
/*
const arr = [{
  j: 'k'
}, {
  l: 'm'
}];
const reference = arr; // 참조
const shallowCopy = [...arr]; // 얕은복사
const deepCopy = JSON.parse(JSON.stringify(arr)); // 깊은복사

console.log(arr === reference); // true
console.log(arr[0] === reference[0]); // true
console.log(arr === shallowCopy); // false
console.log(arr[0] === shallowCopy[0]); // true
console.log(arr === deepCopy); // false
*/