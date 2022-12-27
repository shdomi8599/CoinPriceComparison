let textBox = document.body.querySelector('#textBox')

let textLimit = document.body.querySelector('#textLimit')

textLimit.innerText = `( ${textBox.textLength} / 300 )`

/**
 * 최대 글자수 제한 표시
 */
function liveChatLimit(){
    textLimit.innerText = `( ${textBox.textLength} / 300 )`
    if (textBox.textLength === 300) {
        alert('hi')
    }
}

textBox.addEventListener('input',liveChatLimit);

/**
 * 현재 시각  출처 : https://hianna.tistory.com/325
 */
let today = new Date();   

let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜
let day = today.getDay();  // 요일
let hours = today.getHours(); // 시
let minutes = today.getMinutes();  // 분
let seconds = today.getSeconds();  // 초

/**
 * 채팅 내용을 쓰고 엔터키를 누르면 댓글이 달리게 만든 이벤트
 */
// textBox.addEventListener("keyup", function (event) {
//     if (event.keyCode === 13) {
//         event.preventDefault();
//         chatSignButton.click();
//     }
// });

let liveChatList = document.body.querySelector('#liveChatList')

let chatSignButton = document.body.querySelector("#chatSign")

/**
 * 새로운 채팅 생성
 */
function newChat(){
    if( textBox.value !== ''){
    let div = document.createElement('div')
    let liveChat = liveChatList.appendChild(div)
    liveChat.className ="liveChat"
    let divId = document.createElement('div')
    let divBox = document.createElement('div')
    let divLike = document.createElement('div')
    liveChat.appendChild(divId).className = "liveChatId"
    liveChat.appendChild(divBox).className = "liveChatBox"
    liveChat.appendChild(divLike).className = "liveChatLike"
    divId.innerText = "아이디";
    divBox.innerText = textBox.value;
    let div1 = document.createElement('div')
    let div2 = document.createElement('div')
    let div3 = document.createElement('div')
    let div4 = document.createElement('div')
    divLike.appendChild(div1)
    divLike.appendChild(div2).innerText = '0' //나중엔 다른 변수를 넣고 좋아요가 눌릴때마다 +1 -1 되는 함수 넣어야함
    divLike.appendChild(div3)
    divLike.appendChild(div4).innerText = '0' //나중엔 다른 변수를 넣고 좋아요가 눌릴때마다 +1 -1 되는 함수 넣어야함
    let upButton = document.createElement('button')
    let downButton = document.createElement('button')
    div1.appendChild(upButton)
    div3.appendChild(downButton)
    let upImg = document.createElement('img')
    let downImg = document.createElement('img')
    upImg.className = "thumb"
    upImg.id = "thumbUp" // + 함수를 위한 아이디
    downImg.className = "thumb"
    downImg.id = "thumbDown" // - 함수를 위한 아이디
    upButton.appendChild(upImg).src = "../img/thumb-up.png"
    downButton.appendChild(downImg).src = "../img/thumb-down.png"
    textBox.value = '';
    textLimit.innerText = `( 1 / 300 )`;
    }else{
    alert("내용을 입력해주세요.")
    }
}


chatSignButton.addEventListener('click', newChat)