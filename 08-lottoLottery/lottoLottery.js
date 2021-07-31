/* 태그 선택 */
let $result = document.querySelector('#result');
let $bonus = document.querySelector('#bonus');

/* listener function (callback function) */
// 45개의 번호 배열을 생성 [1, 2, 3, ... 45];
const candidate = Array(45).fill().map((ele, idx) => idx + 1);
// 랜덤으로 담을 6자리 숫자
let shuffle = [];
//* 피셔 예이츠 셔플 (공 뽑기)
while (candidate.length > 0) {
   const random = Math.floor(Math.random() * candidate.length); // 무작위 인덱스 뽑기
   const spliceArray = candidate.splice(random, 1); // 뽑은 값은 배열에 들어있음
   const value = spliceArray[0]; // 배열에 들어있는 값을 꺼내어
   shuffle.push(value); // shuffle에 넣어준다
}
console.log(shuffle);
//* 공 정렬하기 sort() method
// TODO

/* eventListener */
/*$result.addEventListener();
$bonus.addEventListener();*/

/*
for (let i = candidate.length; i > 0; i--) {
   const random = Math.floor(Math.random() * i); // 무작위 인덱스 뽑기
   const spliceArray = candidate.splice(random, 1); // 뽑은 값은 배열에 들어있음
   const value = spliceArray[0]; // 배열에 들어있는 값을 꺼내어
   shuffle.push(value); // shuffle에 넣어준다
}
console.log(shuffle);
 */