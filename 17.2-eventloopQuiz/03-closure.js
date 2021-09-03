//! 실행 컨택스트
/* 여기서는 실행 컨텍스트와 클로저에 대해서 살펴보자 */
// 먼저 컨텍스트는 한국말로 번역하면 문맥이다. 쉽게 코드의 실행 환경이라고 이해하면 될 것 같다.
/* 코드 */
var name = 'zero'; // (1)변수 선언 (6)변수 대입
function wow(word) { // (2)변수 선언 (3)변수 대입
  console.log(word + ' ' + name); // (11)
}

function say() { // (4)변수 선언 (5)변수 대입
  var name = 'nero'; // (8)
  console.log(name); // (9)
  wow('hello'); // (10)
}
say(); // (7)
/* 코드 */
/*
먼저 위의 코드에서 console이 어떻게 찍힐지 생각해보자. 주석의 괄호 안의 숫자 순으로 실행된다.
lexical scoping을 기억한다면, 결과가 nero, hello zero 라는 걸 알 수 있다.
그럼 이것이 어떻게 실행되는지를 살펴보자.

일단 처음 코드를 실행하는 순간 모든 것을 포함하는 전역 컨텍스트가 생긴다. 모든 것을 관리하는 환경이다.
페이지가 종료될 때까지 유지된다.
전역 컨텍스트 말고도 함수 컨텍스트가 있는데, 전에 자바스크립트는 함수 스코프(범위)를 따른다고 했다.
함수를 호출할 떄마다 함수 컨텍스트가 하나씩 더 생긴다. 그럼 컨텍스트의 4가지 원칙을 보자.

*컨텍스트의 4가지 원칙
1. 먼저 전역 컨텍스트 하나 생성 후, 함수 호출 시마다 컨텍스트가 생긴다.
2. 컨텍스트 생성 시 컨텍스트 안에 변수객체(arguments(인수), variable), scope, this가 생성된다.
3. 컨텍스트 생성 후 함수가 실행되는데, 사용되는 변수들은 변수 객체 안에서 값을 찾고, 없으면
스코프 체인을 따라 올라가며 값을 찾는다.
4. 함수 실행이 마무리되면 해당 컨텍스트는 사라진다.(클로저 제외) 페이지가 종료되면 전역 컨텍스트가 사라진다.

이제 위의 코드를 이 원칙들에 따라서 실행해보자.

*전역 컨텍스트
전역 컨텍스트가 생성된 후 두 번째 원칙에 따라 변수객체, scope chain, this가 들어온다.
전역 컨텍스트는 arguments(함수의 인자)가 없고, variable은 해당 스코프의 변수들이다.
name, wow, say가 있다.

scope chain은 자기 자신인 전역 변수 객체이다. 따로 설정 되있지 않으면 this는 window다.
this를 바꾸는 방법이 바로 new를 호출하는 것이다. (또는 함수에 다른 this 값을 bind 할 수도 있다)
일반 함수의 this가 왜 window인지 알수있다. 원래 기본적으로 window고 new나 bind 같은 상황에서
this가 바뀌는 것이다.

!이걸 객체 형식으로 표현해보겠다.(keyPoint)

? 전역 컨텍스트: {
?   변수객체: {
?     arguments: null,
?     variable: ['name', 'wow', 'say'],
?   },
?   scopeChain: ['전역 변수객체(스코프)'],
?   this: window,
? }

이제 코드를 위에서부터 실행하는데, wow랑 say는 호이스팅 때문에 선언과 동시에 대입이 된다.
(호이스팅에 대해선 잠시후에 설명 예정이다) 그 후 variable의 name에 'zero'가 대입이 된다.

? variable: [{ name: 'zero'}, { wow: function }, { say: function }];

* 함수 컨텍스트
그 후 (7)번에서 say();를 하는 순간 새로운 컨텍스트인 say 함수 컨텍스트가 생긴다.
아까 전역 컨텍스트느 그대로 있다. arguments는 없고, variable은 name 뿐이다.
scope chain은 say 변수객체와 상위의 전역변수 객체입니다. this는 따로 설정해준적이 없으니 window이다.

? 'say 컨텍스트': {
?   변수객체: {
?     arguments: null,
?     variable: ['name'], // 초기화 후 [{ name: 'nero' }]가 됨
?   },
?   scopeChain: ['say 변수객체(스코프)', '전역 변수객체(스코프)'],
?   this: window,
? }

say를 호출한 후 위에서부터 차례대로((8)~(10) 실행한다. variable의 name에 nero를 대입해주고 나서
console.log(name);이 있다. name 변수는 say 컨텍스트 안에서 찾으면 된다.
variable에 name이 nero라고 되어 있습니다. name이 콘솔에 찍힌다.
그 다음엔 wow('hello')가 있는데. say 컨텍스트 안에서 wow 변수를 찾을 수 없다.
찾을 수 없다면 scope chain을 따라 올라가 상위 변수객체에서 찾는다.
그래서 전역 변수객체에서 찾는다. 전역 변수객체의 variable에 wow라는 함수가 있다. 이걸 호출한다.

(10)번에서 wow함수가 호출되었으니 wow 컨텍스트도 생기겠죠? arguments는 word = 'hello'고,
scope chain은 wow 스코프와 전역 스코프다.
여기서 중요한 게 lexical scoping에 따라 wow 함수의 스코프 체인은 선언 시에 이미 정해져 있다.
따라서 say 스코프는 wow 컨텍스트의 scope chain이 아니다. variable은 없고, this는 window다.

? 'wow 컨텍스트': {
?   변수객체: {
?     arguments: [{ word : 'hello' }],
?     variable: null,
?   },
?   scopeChain: ['wow 변수객체', '전역 변수객체'],
?   this: window,
? }

이제 컨텍스트가 생긴 후 함수가 실행 됩니다. say 함수는 아직 종료된 게 아닙니다.
wow 함수 안에서 console.log(word + ' ' + name);이 있는데요.
word랑 name 변수는 wow 컨텍스트에서 찾으시면 됩니다. word는 arguments에서 찾을 수 있고,
name은 wow 변수객체에는 값이 없으니, scope chain을 따라 전역 스코프에서 찾으시면 됩니다.
전역 변수객체로 올라가니 variable에 name이 zero라고 되어 있네요. 그래서 hello zero가 되는 겁니다.
hello nero가 아니라요. wow 컨텍스트에 따르면 wow 함수는 애초에 say 컨텍스트와 일절 관련이 없었던 겁니다.

이제 wow 함수 종료 후 wow 컨텍스트가 사라지고, say 함수의 실행이 마무리됩니다.
따라서 say 컨텍스트도 사라지고, 마지막에 전역 컨텍스트도 사라집니다.
함수 실행, 변수 선언 등 모든 게 다 논리적입니다.
그래서 컨텍스트 개념을 이해하면 자바스크립트의 모든 문제들을 풀 수 있습니다.
추가적으로 이벤트 루프까지 아신다면 완벽합니다.
(이벤트루프 블로그 참고: https://www.zerocho.com/category/JavaScript?page=2)
*/

/* 호이스팅 && 클로저 */
/*
! 위를 학습했다면 해당 블로그에서 호이스팅과 클로저를 학습하자
* https://www.zerocho.com/category/JavaScript/post/5741d96d094da4986bc950a0
*/

/*
호이스팅: 변수를 선언하고 초기화 했을 때 선언 부분이 최상단으로 끌어올려지는 현상
- 함수 표현삭이 아닌 함수 선언식일 때는 식 자체가 통째로 끌어올려진다.
- 실행 컨텍스트에 대입해보면 함수 표현식이 아닌 이유르 알 수 있다.
*/

/*
클로저: IIFE(즉시 호출 함수 표현식)에서 비공개 변수를 가질 수 있는 환경에 있는 함수가 클로저이다.
- 비공개 변수는 클로저 함수 내부에 생성한 변수도 아니고, 매개변수도 아닌 변수를 의미한다.
- 클로저를 말할 때는 스코프/ 컨텍스트/ 비공개 변수와 함수의 관계를 같이 말해주어야 합니다.

클로저는 비공개 변수를 만들어 사용할 수 있는데, 비공개 변수이기 때문에 남들이 조작할 걱정은 없다.
프로그램 사용자는 만든이가 공개한 메소드만 사용해야 한다.
사용자가 예상을 뒤엎는 행동을 막을 수 있다. 사용자를 믿지말라. 무슨 짓을 할지 모른다.
1. 해킹을 시도 할수도 있고, 프로그램에 버그를 만들수도 있다.
2. 특히 서버와 연결되어 있는 경우는 더 조심해야 한다.
3. 그렇기에 사용자가 할 수 있는 모든 행동과 경우의 수를 통제하고 있어야 한다.
! 자바스크립트에서 사용자를 통제하기 위한 기본적인 방법이 클로저이다.

? 클로저의 단점
- closure의 비공개 변수는 자바스크립트에서 언제 메모리 관리를 해야할 지 모르기 때문에
자칫 메모리 낭비로 이어질 수 있다.
- 프로그램을 만들면서 메모리 문제가 발생한다면, 클로저를 의심해보자.
- 또한 scope chain을 거슬러 올라가는 행동을 하기 때문에 조금 느리다.
*/

//? 이벤트 리스너에 for문으로 연결했을 때 왜 오류가 날까?
for (var i = 0; i < 5; i++) {
  $('#target' + i).on('click', function () {
    alert(i);
  });
}
/* 컨텍스트에 대한 이해가 부족해서 그렇다. lexical scoping에 따라 함수는 선언할 때 스코프가 생긴다.
즉, 이벤트 리스너 안의 i는 외부의 i를 계속 참조하고 있다. i는 반복문 종료 후 최종적으로 5가 되기 때문에
결국 alert 결과가 모두 5가 된다. */

for (var i = 0; i < 5; i++) {
  (function (j) {
    $('#target' + j).on('click', function () {
      alert(j);
    });
  })(i);
}
/* 이렇게 IIFE(즉시 호출 함수 표현식)를 사용하여 클로저를 만들어주면 j 값은 i에 해당하는 숫자로
고정되기 때문에 해결된다.(고정된 j에 대한 클로저인 function을 만드는 셈이다.*/