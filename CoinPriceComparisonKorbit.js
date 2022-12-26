// KRW마켓의 코인들의 현재 정보데이터를 가져온 배열
let korbit = [];
// KRW마켓 코인이름만 가져온 배열
let korbitCoinList = [];
// 심볼KRW만 추출한 배열
let korbitCoinName = [];
// 최종 심볼만 추출한 배열
let korbitCoinNameLast = [];
// 현재 검색된 코인의 데이터를 보관하는 배열
let korbitPick = [];
// 현재 검색된 코인의 데이터 (객체형태)
let korbitNowCoin = [];
// 현재 검색된 코인의 데이터들을 추출해서 새로 만든 배열
let korbitNowCoinLast = [];
// 테스트용, 테이블 랭킹용 숫자
// let korbitRank = 1;

const korbitOptions = { method: 'GET', headers: { accept: 'application/json' } };

fetch('https://api.korbit.co.kr/v1/ticker/detailed/all', korbitOptions)
    .then(response => response.json())
    .then(response => korbit = response)
    .then(korbit => korbitCoinList = Object.keys(korbit))
    .then(korbitSymbol)
    .catch(err => console.error(err));


/**
 * 심볼명만 추출한 작업
 */
function korbitSymbol() {
    for (i of korbitCoinList) {
        korbitCoinName.push(i.replace('_', ''));
    }
    for (i of korbitCoinName) {
        korbitCoinNameLast.push(i.slice(0, -3))
    }
    korbitCoinNameLast.splice(28,1)
}

/**
 * korbitPick 배열안에 검색명이 일치하는 코인의 이름을 넣어주는 함수
 */
function kobitCoinSearch(name) {
    for (i of korbitCoinNameLast) {
        if (i.includes(name) === true) {
            return korbitPick.push(i)
        } 
    }
}

/**
 * korbitPick 배열에 들어간 현재 검색된 코인의 데이터를 갖고오는 함수
 */
function kobitPickCoin(name) {
    korbitPick = [];
    korbitNowCoin = [];
    korbitNowCoinLast = [];
    kobitCoinSearch(name);
    if (korbitPick[0] !== undefined){
    fetch(`https://api.korbit.co.kr/v1/ticker/detailed?currency_pair=${korbitPick[0]}_krw`, korbitOptions)
        .then(response => response.json())
        .then(response => korbitNowCoin = response)
        .then(forKorbitPick)
        .then(()=>callBundle(korbitNowCoinLast))
        .then(objKorbitData)
        .catch(err => console.error(err));
    }
}




function forKorbitPick() {
    korbitNowCoinLast.push('1');
    korbitNowCoinLast.push(korbitPick[0].toUpperCase());
    korbitNowCoinLast.push('코빗');
    korbitNowCoinLast.push(Number(korbitNowCoin.last).toLocaleString('ko-KR'));
    korbitNowCoinLast.push(Math.floor(korbitNowCoin.last * korbitNowCoin.volume).toLocaleString('ko-KR'));
    korbitNowCoinLast.push(Unix_timestamp((korbitNowCoin.timestamp / 1000).toFixed()).slice(11));
    korbitNowCoinLast.push('0.15%');
}
