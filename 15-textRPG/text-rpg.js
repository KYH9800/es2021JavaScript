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

$gameMenu.addEventListener('submit', (e) => { // game-menu
  e.preventDefault();
  const input = e.target['menu-input'].value;

  if (input === '1') { // 모험
    $gameMenu.style.display = 'none';
    $battleMenu.style.display = 'block';
    monster = JSON.parse( //! 깊은 복사 (간단하게 샤용 가능, But 진짜 깊은 복사는 다른 사람이 쓴 코드를 활용)
      JSON.stringify(monsterList[Math.floor(Math.random() * monsterList.length)])
    );
    monster.maxHp = monster.hp; // 몬스터의 max HP가 없어서 넣어줬다
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp} / ${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;

    function studyNote() {
      //*-------------------------깊은복사 && 얕은 복사 && 참조관계 -------------------------//
      //! 깊은복사 && 얕은 복사 && 참조관계 알아두기!!
      // 객체의 정보만 필요한거지 객체 자체가 필요한건 아니다 원본이 바뀌면 안되기 때문에 깊은 복사를 통해 정보만 가져왔다
      // 깊은 복사: 모두 참조관계가 끊긴다
      const monster1 = JSON.parse(JSON.stringify(monsterList[0])); // 깊은 복사
      const monster2 = monsterList[0]; // 객체를 대입하면, '참조'
      const monster3 = {
        ...monster[0] // 얕은 복사: 껍대기만 복사, 내부는 참조관계 (겉 껍대기만 참조관계가 끊긴다)
      }
      monster1.name = 'new monster';
      console.log(monsterList[0].name); // 슬라임
      monster2.name = 'new monster';
      console.log(monsterList[0].name); // 새 몬스터
      console.log(monsterList[0] === monster1); // false, 깊은 복사
      console.log(monsterList[0] === monster2); // true, 참조 관계
      /*
      ? 제로초 의견
      ? 간단한 객체는 JSON.parse(JSON.stringify(객체));를 사용해도 크게 문제는 없다
      ? 다만 성능도 느리고 함수나 Math, Data 같은 객체를 복사할 수 없다는 단점이 있다
      ? 따라서 실무에서는 lodash 같은 라이브러리(다른 사람이 미리 만들어 둔 코드)를 사용하곤 한다
      ! lodash 안에 clone이라는 함수가 있는데 그걸 쓰면 깊은 복사를 할 수 있다
      */
      // 배열의 얕은 복사는 크게 두가지가 있다 [ ...arr ];, arr.slice();
    }
    studyNote(); //* console.log를 실행하기 위한 목적

  } else if (input === '2') { // 휴식
    // todo code
  } else if (input === '3') { // 종료
    // todo code
  }
});

$battleMenu.addEventListener('submit', (e) => {
  e.preventDefault()
  const input = e.target['battle-input'].value;
  if (input === '1') {
    // 1을 입력하면 공격
  } else if (input === '2') {
    // 2를 선택하면 회복
  } else if (input === '3') {
    // 3을 선택하면 도망
  }
  // todo: battle menu
});