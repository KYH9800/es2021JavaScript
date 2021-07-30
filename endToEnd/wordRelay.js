// 1. 몇 명이 참가할지 정한다
const number = parseInt(prompt('몇 명이 참가하나요?'));
// 태그 선택
const $button = document.querySelector('button');
const $input = document.querySelector('input');
const $word = document.querySelector('#word');
const $order = document.querySelector('#order');
$input.focus();
// 변수 지정
let word; // 제시어
let newWord; // 새로 입력한 단어

// 버튼 클릭 이벤트 함수
const onClickButton = () => {
    console.log('click');
    if (!word) { // 제시어가 비어있는가?
        // 비어 있다
        word = newWord; // 입력한 단어가 제시어가 된다
        $word.textContent = word; // 화면에 제시어 표시
        $input.value = '';
        $input.focus();

        // 현재 순서 파악
        const order = parseInt($order.textContent);
        // 다음 사람에게 순서를 넘긴다
        if (order === number) { // 현재 순서에 1을 더한 값이 number 보다 큰가?
            $order.textContent = 1; // 다시 처음 순서로
        } else { // 아니라면, 다음 순서로
            $order.textContent = order + 1;
        }

    } else {
        // 비어 있지 않다 => 입력한 단어가 올바른가?
        // if(word[word.length - 1] === newWord[0]){}
        if (word.charAt(word.length - 1) === newWord.charAt(0)) { // 올바른가
            word = newWord;
            $word.textContent = word;
            $input.value = '';
            $input.focus();

            // 현재 순서 파악
            const order = parseInt($order.textContent);
            // 다음 사람에게 순서를 넘긴다
            if (order === number) { // 현재 순서에 1을 더한 값이 number 보다 큰가?
                $order.textContent = 1; // 다시 처음 순서로
            } else { // 아니라면, 다음 순서로
                $order.textContent = order + 1;
            }

        } else { // 올바르지 않은가
            alert($order.textContent + '번째 님이 패배 하였습니다');
            $input.value = '';
            $order.textContent = 1;
            $word.textContent = '';
            history.go(0); // 페이지 새로고침(초기화, 다시시작)
        }
    }
}

// 입력창 이벤트 함수
const onInput = (e) => {
    console.log(e.target.value);
    newWord = e.target.value;
}

// 이벤트 리스너
$input.addEventListener('input', onInput);
$button.addEventListener('click', onClickButton);


/* 첫번째 참가자인지를 어떻게 알까? */
// 1. 첫번째 참가자는 제시어가 없는 상태여야 한다