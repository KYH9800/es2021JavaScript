//! 함수의 범위 scope
/* 스코프(scope) */
var x = 'global';

function ex() {
  x = 'change';
}
ex();
alert(x); // 'change'
//? 아까와는 달리 ex 함수에 안에서 var을 선언하지 않았습니다. 이제는 x = 'change'를 했을 때 전역변수가 바뀌는데요.
//? 자바스크립트는 변수의 범위를 호출한 함수의 지역 스코프부터 전역 변수들이 있는 전역 스코프까지 점차 넓혀가며 찾기 때문입니다

/* scope chain */
// 바로 전역변수와 지역변수의 관계에서 스코프 체인(scope chain)이란 개념이 나옵니다
// 내부 함수에서는 외부 함수의 변수에 접근 가능하지만 외부 함수에서는 내부 함수의 변수에 접근할 수 없습니다.
var name = 'zero';

function outer() {
  console.log('외부', name);

  function inner() {
    var enemy = 'nero';
    console.log('내부', name);
  }
  inner();
}
outer();
console.log(enemy); // undefined
//  enemy가 undefined
// 모든 함수들은 전역 객체에 접근할 수 있다

//* scope chain의 예저 더
var name = 'zero';

function outer() {
  console.log('외부', name);

  function inner() {
    var enemy = 'nero';
    console.log('내부', name);
  }
  inner();
}
outer();
console.log(enemy); // undefined, 내부 함수에서는 외부 함수의 변수에 접근 가능하지만 외부 함수에서는 내부 함수의 변수에 접근할 수 없습니다
/**
 * inner 함수는 name 변수를 찾기 위해 먼저 자기 자신의 스코프에서 찾고,
 * 없으면 한 단계 올라가 outer 스코프에서 찾고, 없으면 다시 올라가 결국 전역 스코프에서 찾습니다.
 * 다행히 전역 스코프에서 name 변수를 찾아서 'zero'라는 값을 얻었습니다.
 * 만약 전역 스코프에도 없다면 변수를 찾지 못하였다는 에러가 발생합니다.
 */
//* 꼬리를 물고 계속 범위를 넓히면서 찾는 관계를 스코프 체인이라고 부릅니다.

//! 렉시컬 스코핑(lexical scoping)
/*
많이들 헷갈리는 개념인데 스코프는 함수를 호출할 때가 아니라 '선언'할 때 생깁니다. 호출이 아니라 선언!!
정적 스코프라고도 불립니다.
? 다음 코드에서 console이 어떻게 찍힐 지 예상해보자
*/
var name = 'zero';

function log() { // 4
  console.log(name); // nero
}

function wrapper() { // 2
  name = 'nero'; // 잔역 번수 값을 변경
  log(); // log() 호출 3
}
wrapper(); // 1

// 참 쉽다. 그럼 다음은? 문제를 살짝 바꿔서 보겟다.
var name = 'zero';

function log() { // 3
  console.log(name); // zero
}

function wrapper() { // 2
  var name = 'nero'; // 새로운 선언 (지역 변수)
  log(); // log() 호출
}
wrapper(); // 1

/*
답은 zero다. 스코프는 함수를 선언할 때 생긴다. log안의 name은 wrapper 안의 지역변수
name이 아니라, 전역변수 name을 카리키고 있는 것이다.
! 이것을 바로 lexical scoping 이라고 한다. 정적 스코프 (직역: 어휘적 범위)
*/