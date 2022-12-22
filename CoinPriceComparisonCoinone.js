// KRW마켓의 코인들의 현재 정보데이터를 가져온 배열
let coinone = [];
// KRW마켓 코인 데이터들을 가져온 배열
let coinoneData = [];
// 심볼명 추출한 배열
let coinoneCoinName = [];
// 최종 심볼만 추출한 배열
let coinoneCoinNameLast = [];
// 현재 검색된 코인의 데이터를 보관하는 배열
let coinonePick = [];
// 현재 검색된 코인의 데이터 (객체형태)
let coinoneNowCoin = {};
// 현재 검색된 코인의 데이터들을 추출해서 새로 만든 배열
let coinoneNowCoinLast = [];
// 테스트용, 테이블 랭킹용 숫자
let coinoneRank = 1;

const coinoneOptions = { method: 'GET', headers: { accept: 'application/json' } };


fetch('https://api.coinone.co.kr/public/v2/markets/KRW', coinoneOptions)
    .then(response => response.json())
    .then(response => coinone = response)
    .then(coinoneSymbol)
    .then(forCoinoneData)
    .catch(err => console.error(err));


/**
 * 심볼명 추출
 */
function coinoneSymbol() {
    for (i of coinone.markets) {
        coinoneCoinName.push(i.target_currency.toLowerCase())
    }

}

/**
 * KRW마켓에 모든 코인들의 데이터를 가져오기 위한 함수
 */
function forCoinoneData() {
    fetch('https://api.coinone.co.kr/public/v2/ticker_new/KRW', coinoneOptions)
        .then(response => response.json())
        .then(response => coinoneData = response.tickers)
        .then(() => coinoneCoinData('btc'))
        .catch(err => console.error(err));
}

/**
 * name을 통해 검색된 코인의 객체를 반환하는 함수
 */
function coinoneDataSerach(name) {
    for (i of coinoneData) {
        if (i.target_currency === name) {
            return coinoneNowCoin = i;
        }
    }
}

/**
 * coinoneDataSerach 함수로 얻은 인덱스로 coinoneNowCoinLast 배열안에 데이터를 저장하는 함수
 */
function coinoneCoinData(name) {
    coinoneDataSerach(name);
    coinoneNowCoinLast.push(coinoneRank);
    coinoneNowCoinLast.push(name.toUpperCase());
    coinoneNowCoinLast.push('코인원');
    coinoneNowCoinLast.push(Number(coinoneNowCoin.last).toLocaleString('ko-KR'));
    coinoneNowCoinLast.push(Math.floor(coinoneNowCoin.last * coinoneNowCoin.target_volume).toLocaleString('ko-KR'));
    coinoneNowCoinLast.push(Unix_timestamp((coinoneNowCoin.timestamp / 1000).toFixed()));
    coinoneNowCoinLast.push('0.2%');
}


function coinList(name) {
    upbitCoinPickUp(name.toUpperCase())
    kobitPickCoin(name)
    bithumbPickCoin(name.toUpperCase())
    coinoneCoinData(name)
    console.log(korbitNowCoinLast);
    console.log(bithumbNowCoin);
    console.log(upbitNowCoin);
    console.log(coinoneNowCoinLast);
}