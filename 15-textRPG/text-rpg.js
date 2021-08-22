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

// 주인공의 초기 정보(객체 리터럴)
const heroInitialStat = {
  name: '',
  lev: 1,
  maxHp: 100,
  hp: 100,
  xp: 0,
  att: 10,
};
// 몬스터가 아직 생성이 안됨
let monster = null;
//! 배열, 랜덤으로 몬스터를 생성할 예정
const monsterList = [{
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
  },
];

// addEventListener function
$startScreen.addEventListener('submit', (e) => {
  e.preventDefault(); // 기본동작인 새로고침을 막아준다
  const name = e.target['name-input'].value; // e.target[0].value;

  $startScreen.style.display = 'none';
  $gameMenu.style.display = 'block';
  $heroName.textContent = name;
  $heroLevel.textContent = `${heroInitialStat.lev} Lev,\n`;
  $heroHp.textContent = `HP: ${heroInitialStat.hp} / ${heroInitialStat.maxHp},\n`;
  $heroXp.textContent = `XP: ${heroInitialStat.xp} / ${15 * heroInitialStat.lev},\n`;
  $heroAtt.textContent = `ATT: ${heroInitialStat.att}`;
  heroInitialStat.name = name;
});

$gameMenu.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = e.target['menu-input'].value;

  if (input === '1') {
    $gameMenu.style.display = 'none';
    $battleMenu.style.display = 'block';
    monster = JSON.parse(
      JSON.stringify(monsterList[Math.floor(Math.random() * monsterList.length)])
    );
    monster.maxHp = monster.hp;
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp} / ${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;
  } else if (input === '2') {
    // todo code
  } else if (input === '3') {
    // todo code
  }
});

$battleMenu.addEventListener('submit', (e) => {
  e.preventDefault()
  const input = e.target['battle-input'].value;
  if (input === '1') {

  } else if (input === '2') {

  } else if (input === '3') {

  }
  // todo: battle menu
});