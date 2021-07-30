let number = parseInt(prompt('참가할 인원 수를 입력해주세요'));
console.log(number);

if (number >= 2) {
    alert('쿵쿵따 게임을 시작합니다');
} else {
    alert('참가할 인원 수가 부족합니다, 인원 수를 다시 입력해 주세요');
    history.go(0);
}

/* 게임을 시작 */
let word; // 제시어
let newWord; // 새로 입력한 제시어

// 태그선택
const $input = document.querySelector('input');
const $button = document.querySelector('button');
const $word = document.querySelector('#word');
const $order = document.querySelector('#order');
const $wrong = document.querySelector('#wrong-alert');

// 시작부터 입력창 커서를 포커스
$input.focus();

// 콜백 함수 생성
const onClickButton = () => {
    // 단어의 조건이 부합할 시 다음 순서로 넘기기 위한 함수
    const nextOrder = () => {
        // order라는 변수에 #order text 값을 가져온다
        const order = parseInt($order.textContent); // 정수여야 한다
        // 가져온 숫자가 입력한 number와 같지 않으면 1씩 증가
        if (order !== number) {
            $order.textContent = order + 1;
        } else { // 그외 조건(입력한 수보다 order 수가 크면 1로 초기화)
            $order.textContent = 1;
        }
    }
    // 제시어가 비었고 t, 단어가 올바른가? t = t
    if (!word || word.charAt(word.length - 1) === newWord.charAt(0)) {
        if (newWord.length === 3) {
            $wrong.textContent = '' // 3글자 조건 알림은 비운다 
            word = newWord; // 새로 입력한 단어가 제시어가 된다
            $word.textContent = word; // span tag에 제시어를 띄워준다
            $input.value = ''; // 입력창을 비운다
            nextOrder(); // 다음 순서로 넘긴다
            // $input.focus(); // 커서를 집중시킨다
        } else {
            $wrong.textContent = '저런~ 단어는 3글자여야 합니다, 다시 확인하세요';
            // $input.focus(); // 커서를 집중시킨다
        }
    } else {
        alert('단어가 이어지질 않네요.. 다음 기회에는 꼭! 이겨봐요!!');
        history.go(0);
    }
    $input.focus(); // 커서를 집중시킨다
}

const onInput = (e) => {
    newWord = e.target.value;
}
// onKeyPress 키보드 enter 기능 function
function onKeyPress() {
    if (window.event.keyCode == 13) {
        onClickButton();
    }
}

// 이벤트 리스너
$button.addEventListener('click', onClickButton);
$input.addEventListener('input', onInput);
$input.addEventListener('keydown', onInput);