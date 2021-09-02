//* 이벤트루프 Quiz (이벤트 루프 분석)
/*
? 다음 코드를 실행할 때, 콘솔에 어떤 순서로 알파벳이 찍히는지 호출 스택과 이벤트 루프를 통해 설명해 보세요.
  이 문제는 회사에서 기술 면접 시 물어보는 문제 유형입니다.
  참고로 setTimeout에 0초가 들어 있는데, 거의 즉시 실행되는 타이머라고 보면 됩니다.
  '거의'가 붙은 이유는 setTimeout이 비동기 타이머이므로 진짜로 즉시 실행되지는 않기 때문입니다.
*/

function aaa() { // 3
  setTimeout(() => {
    console.log('d');
  }, 0);
  console.log('c');
}

setTimeout(() => { // 1
  console.log('a');
  aaa();
}, 0);

setTimeout(() => { // 2
  aaa();
  console.log('b');
}, 0);

// 호출스택: 3.anonymous(끝) >> setTimeout1 >> 1.(끝) >> setTimeout2 >> 2. (끝)
// 백그라운드: 타이머1-0초, 타이머2-0초 / 0초가 되는 순서대로 이동
// 태스크 큐: 타이머1-0초, 타이머2-0초
// 콘솔: a c c b d d