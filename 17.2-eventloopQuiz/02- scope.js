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
/* 많이들 헷갈리는 개념인데 스코프는 함수를 호출할 때가 아니라 '선언'할 때 생깁니다. 호출이 아니라 선언!!
정적 스코프라고도 불립니다.
? 다음 코드에서 console이 어떻게 찍힐 지 예상해보자 */
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

/* 답은 zero다. 스코프는 함수를 선언할 때 생긴다. log안의 name은 wrapper 안의 지역변수
name이 아니라, 전역변수 name을 카리키고 있는 것이다.
! 이것을 바로 lexical scoping 이라고 한다. 정적 스코프 (직역: 어휘적 범위)

전역번수를 만드는 일은 자제하는 것이 좋다. 이유는 변수가 섞일 수 있기 때문이다
js로 여러명과 개발을 하며 협동도 하고, 다른 사람의 라이브러리를 사용하는 일도 많다.
그런데 전역변수를 사용하다보면, 우연의 일치로 인해 같은 변수 이름을 사용해서 이전에
있던 변수를 덮어쓰는 불상사가 발생 할 수 있다.
* 간단한 해결 방법은 전역변수 대신 한 번 함수 안에 넣어 지역변수로 만드는 것이다.
* 아니면 객체 안의 속성으로 만들 수도 있다. */

var obj = {
  x: 'local',
  y: function () {
    alert(this.x);
  }
}
/* 위 처럼 하면 obj.x, obj.y() 이렇게 접근해야 하기 때문에 다른 사람과 섞일 염려가 없다.
obj를 통째로 덮어쓰지 않는 이상, 전역변수를 하나로 최소화해서 변수가 겹칠 우려도 최소화한다.
*이런 방법을 네임스페이스를 만든다고 표현한다. obj라는 고유 네임스페이스를 만들어서 겹치지 않게 하는 것 
대부분의 라이브러리가 네임스페아스를 사용하고 있다.
하지만 위 방법의 단점은 누군가 고의적으로 코드 밑에 스크립트를 추가해서 x와 y를 바꿀 수 있다.
obj를 통째로 바꾸지 않더라도 밑에 obj.x = 'hacked'; 라고 한 줄 추가만 하면 obj.y();를 했을 시,
local 대신 hacked가 alert 된다. 그것을 방지하려면*/

var another = function () {
  var x = 'local';

  function y() {
    alert(x);
  }
  return {
    y: y
  };
}
var newScope = another();

/* 조금 복잡하지만 위와 같이 하면 된다. 위의 코드를 보면 return하는 변수는 공개 변수이고,
다른 것은 비공개 변수이다. 위의 코드를 단략하게 또 바꾸면 */

var newScope = (function () {
  var x = 'local';
  return {
    y: function () {
      alert(x);
    }
  };
})();

/* 위와 같이 쓸 수 있다. 처음보는게 나왔다. 바로 (function(){...})(); 구문이다.
*IIFE(즉시 호출 함수 표현식)이라고도 하고, 모듈패턴이라고도 하는데, 함수를 선언하자마자 바로 실행 시켜버린다.
function(){...}로 선언과 동시에 ()를 붙이니까 즉시 실행된다. 이 구문은 라이브러리를 만들 때 기본입니다.
비공개 변수가 없는 자바스크립트에 비공개 변수를 만들어주기 떄문이다.
!이 패턴은 꼭 기억하자!! */