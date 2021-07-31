// 태그선택
let $button00 = document.querySelector('#button00');
let $button01 = document.querySelector('#button01');
let $button02 = document.querySelector('#button02');
let $button03 = document.querySelector('#button03');
let $button04 = document.querySelector('#button04');
let $button05 = document.querySelector('#button05');
let $button06 = document.querySelector('#button06');
let $button07 = document.querySelector('#button07');
let $button08 = document.querySelector('#button08');
let $button09 = document.querySelector('#button09');
// 카드 태그
let $user01Card01 = document.querySelector('#user01-card-1');
let $user01Card02 = document.querySelector('#user01-card-2');
let $user01Card03 = document.querySelector('#user01-card-3');
let $user01Card04 = document.querySelector('#user01-card-4');
// user01 Button
let $user01StartButton = document.querySelector('#start-game-user01');
let $user01DeleteButton = document.querySelector('#delete-user01');

// user02
let $button0 = document.querySelector('#button0');
let $button1 = document.querySelector('#button1');
let $button2 = document.querySelector('#button2');
let $button3 = document.querySelector('#button3');
let $button4 = document.querySelector('#button4');
let $button5 = document.querySelector('#button5');
let $button6 = document.querySelector('#button6');
let $button7 = document.querySelector('#button7');
let $button8 = document.querySelector('#button8');
let $button9 = document.querySelector('#button9');
// 카드태그
let $user02Card01 = document.querySelector('#user02-card-1');
let $user02Card02 = document.querySelector('#user02-card-2');
let $user02Card03 = document.querySelector('#user02-card-3');
let $user02Card04 = document.querySelector('#user02-card-4');
//user02 Button
let $user02StartButton = document.querySelector('#start-game-user02');
let $user02DeleteButton = document.querySelector('#delete-user02');
// Hint
let $ball = document.querySelector('#ball');
let $strike = document.querySelector('#strike');
let $count = document.querySelector('#count');
let $out = document.querySelector('#out');

// 변수
let user01CardArr = []; // user01의 Card
let user02CardArr = []; // user02의 Card

// 리스너(콜백함수)
/* user01 */
const onButtonClick = (btnNum) => () => { // user01의 카드 리스트
    // console.log(btnNum);
    if (user01CardArr.length !== 4) {
        user01CardArr.push(parseInt(btnNum));
        console.log('arr', user01CardArr);
    } else {
        alert('4장의 카드를 모두 선택하셨습니다');
    }
    // 카드 input 값을 '*'로 변환
    if (user01CardArr.length === 1) {
        $user01Card01.value = '*';
    }
    if (user01CardArr.length === 2) {
        $user01Card02.value = '*';
    }
    if (user01CardArr.length === 3) {
        $user01Card03.value = '*';
    }
    if (user01CardArr.length === 4) {
        $user01Card04.value = '*';

    }
}

// onStartButtonUser01의 변수
let clicked = false; // user01의 제출 여부를 판별

const onStartButtonUser01 = () => {
    if (
        user01CardArr.length === 3 ||
        user01CardArr.length === 2 ||
        user01CardArr.length === 1 ||
        user01CardArr.length === 0
    ) {
        clicked = false
        alert('카드를 마저 선택하세요(총 4장의 카드여야 합니다)');
    } else {
        clicked = true;
        console.log('clicked: ', clicked);
        $user01StartButton.textContent = '카드보기'
        alert('user01님의 선택한 카드 숫자는 ' + user01CardArr + ' 입니다');
        return;
    }
}

const onDeleteButtonUser01 = () => {
    if (clicked === false) {
        user01CardArr.pop(); // 뒤에서부터 하나씩 제거
        console.log(user01CardArr);
        // 카드 input 값을 초기값으로 변환
        if (user01CardArr.length === 3) {
            $user01Card04.value = '';
        }
        if (user01CardArr.length === 2) {
            $user01Card03.value = '';
        }
        if (user01CardArr.length === 1) {
            $user01Card02.value = '';
        }
        if (user01CardArr.length === 0) {
            $user01Card01.value = '';
        }
    } else {
        alert('이미 게임은 시작됬다 씨발년아');
        return;
    }
}
// user01이 시작해야 user02도 게임 시작이 가능하다
const onButtonClick02 = (btnNum) => () => {
    if (clicked) {
        if (user02CardArr.length !== 4) {
            user02CardArr.push(parseInt(btnNum));
            console.log('user02Card: ', user02CardArr);
        } else {
            alert('4장의 카드를 모두 선택하셨습니다');
        }

        if (user02CardArr.length === 1) $user02Card01.value = user02CardArr[0];
        if (user02CardArr.length === 2) $user02Card02.value = user02CardArr[1];
        if (user02CardArr.length === 3) $user02Card03.value = user02CardArr[2];
        if (user02CardArr.length === 4) $user02Card04.value = user02CardArr[3];
    } else {
        alert('User01이 아직 시작하지 않았습니다');
    }
}

/* user02 */
// 제공되는 기회
let count = parseInt(10);
// ball, strike
let ball = 0;
let strike = 0;

const onStartButtonUser02 = () => {
    if (clicked) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                //TODO: 스트라이크와 볼이 겹칠때는 중복을 제거해준다 (How..??)
                if (user01CardArr[i] === user02CardArr[j]) {
                    if (i === j) {
                        strike++;
                        $strike.textContent = strike;
                        console.log('strike: ', strike)
                    } else {
                        ball++;
                        $ball.textContent = ball;
                        console.log('ball: ', ball)
                    }
                    $out.textContent = '';
                }
            }
        }
        // 일차하는 ball이 없을 때, out이라고 알린다
        if (strike === 0 && ball === 0) {
            $out.textContent = 'OUT 입니다.'
        }
        // 숫자 힌트는 매 판 마다 리셋
        if (strike === 0) $strike.textContent = '0';
        if (ball === 0) $ball.textContent = '0';
        if (strike === 4) {
            $ball.textContent = '0';
            alert('4 스트라이크로 홈런입니다. YOU WIN !!');
            history.go(0);
            return;
        }
        strike = 0;
        ball = 0;
    } else {
        alert('user01의 순서가 끝나지 않았습니다');
    }
    // 남은 횟수
    count--;
    console.log('남은 기회는' + count + '회');
    $count.textContent = count;

    if (count === 0) {
        alert('기회가 모두 소진 됬습니다 아쉽지만 패배');
        history.go(0);
    }
    // 순회하며 숫자가 존재하는지 확인(존재 시 n ball)
    // 존재하고 순서도 맞으면 스트라이크
    // 4 strike면 홈런
}

const onDeleteButtonUser02 = () => {
    if (clicked) {
        user02CardArr.pop();
        console.log(user02CardArr);
    } else {
        alert('user01의 순서가 끝나지 않았습니다');
    }

    if (user02CardArr.length === 3) $user02Card04.value = '';
    if (user02CardArr.length === 2) $user02Card03.value = '';
    if (user02CardArr.length === 1) $user02Card02.value = '';
    if (user02CardArr.length === 0) $user02Card01.value = '';
}

// 이벤트 리스너
/* user01 */
$button00.addEventListener('click', onButtonClick('0'));
$button01.addEventListener('click', onButtonClick('1'));
$button02.addEventListener('click', onButtonClick('2'));
$button03.addEventListener('click', onButtonClick('3'));
$button04.addEventListener('click', onButtonClick('4'));
$button05.addEventListener('click', onButtonClick('5'));
$button06.addEventListener('click', onButtonClick('6'));
$button07.addEventListener('click', onButtonClick('7'));
$button08.addEventListener('click', onButtonClick('8'));
$button09.addEventListener('click', onButtonClick('9'));
// button
$user01StartButton.addEventListener('click', onStartButtonUser01);
$user01DeleteButton.addEventListener('click', onDeleteButtonUser01)

/* user02 */
$button0.addEventListener('click', onButtonClick02('0'));
$button1.addEventListener('click', onButtonClick02('1'));
$button2.addEventListener('click', onButtonClick02('2'));
$button3.addEventListener('click', onButtonClick02('3'));
$button4.addEventListener('click', onButtonClick02('4'));
$button5.addEventListener('click', onButtonClick02('5'));
$button6.addEventListener('click', onButtonClick02('6'));
$button7.addEventListener('click', onButtonClick02('7'));
$button8.addEventListener('click', onButtonClick02('8'));
$button9.addEventListener('click', onButtonClick02('9'));
// button
$user02StartButton.addEventListener('click', onStartButtonUser02);
$user02DeleteButton.addEventListener('click', onDeleteButtonUser02);

/* user02 */
/*
 * 1. user02의 arr에 4자리의 숫자가 담긴다
 * 제출하기를 누르면 arr에 담긴 수를 반복문을 통해 순회하며 찾는다(2번)
 */
/*
* 2. 반복문을 사용해서 찾아보자
* i, j, x, y 4자리 수를 순회하도록 반복문을 만든다
* 순서와 상관 없이 arr에 숫자가 있다면, ball을 알린다 (array.indexOf !== -1)
* 숫자도 맞고 순서도 맞는다면, 스트라이크를 알린다
if(array.indexOf !== -1 && array.indexOf(i) === user01Arr.indexOf(i))
* 기회 10번 이내에 4 ball 4 strike 라면, 승리를 알린다
*/
// 제출을 클릭 시 user02 array의 숫자들을 반복문으로 순회한다
// 조건에 부합하면 힌트를 제공한다