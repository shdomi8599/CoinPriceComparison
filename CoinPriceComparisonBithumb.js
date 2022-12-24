// KRW마켓만 골라낸 배열
let bithumb = [];
// KRW마켓의 코인들의 현재 정보데이터를 가져온 배열
let bithumbCoinList = [];
// bithumbCoinPickUp(name)필터를 통해 나온 값을 잠깐 저장하고 리턴하기위한 수단 
// 다른 거래소들과의 기준을 똑같이 맞추기 위한 용도 / ex.bithumbCoinPickUp('BTC')로 검색
let bithumbCoinName = [];
// 현재 검색된 코인의 데이터를 보관하는 배열
let bithumbPick = [];
// 현재 검색된 코인의 데이터들을 추출해서 새로 만든 배열
let bithumbNowCoin = [];
// 현재 검색된 코인의 거래량 데이터를 보관하는 배열
let bithumbVolume = [];
// 테스트용, 테이블 랭킹용 숫자
// let bithumbRank = 1;

const bithumbOptions = {
    method: 'GET',
    headers: { accept: 'application/json', 'content-type': 'application/json' }
};

/**
 * bithumbPickCoin(name) 함수에서 사용되는 템플릿 리터럴에 검색용으로 넣기 위한 함수
 */
function bithumbCoinPickUp(name) {
    bithumbCoinName = bithumbCoinList.filter(function (data) { return data.indexOf(name) !== -1 })
    return bithumbCoinName[0]
}



fetch('https://api.bithumb.com/public/ticker/ALL_KRW', bithumbOptions)
    .then(response => response.json())
    .then(response => bithumb = response)
    .then(() => bithumbCoinList.push(Object.keys(bithumb.data)))
    .then(() => bithumbCoinList = bithumbCoinList[0])
    // .then(() => bithumbPickCoin("BTC"))
    .catch(err => console.error(err));

/**
 * name에 코인 심볼명을 문자열의 형태로 입력받으면 그 코인의 최신 체결가와 거래량을 배열에 저장해주는 함수
 */
function bithumbPickCoin(name) {
    bithumbVolume = [];
    bithumbPick = [];
    bithumbNowCoin = [];
    bithumbCoinName = bithumbCoinList.filter(function (data) { return data.indexOf(name) !== -1 });
    fetch(`https://api.bithumb.com/public/transaction_history/${bithumbCoinName[0]}_KRW`, bithumbOptions)
        .then(response => response.json())
        .then(response => bithumbPick.push(response.data[19]))
        .then(() => bithumbPick = bithumbPick[0])
        .then(() => fetch(`https://api.bithumb.com/public/ticker/${bithumbCoinName[0]}_KRW`, bithumbOptions))
        .then(response => response.json())
        .then(response => bithumbVolume.push(response))
        .then(() => bithumbVolume = bithumbVolume[0])
        .then(forBithumbPick)
        .then(()=>callBundle(bithumbNowCoin))
        .then(objBithumbData)
        .catch(err => console.error(err));
}

/**
 * bithumbPickCoin(name)함수를 통해 수집한 데이터를 갖고와서 bithumbNowCoin배열안에 저장해주는 함수
 */
function forBithumbPick() {
    bithumbNowCoin.push('1');
    bithumbNowCoin.push(bithumbCoinName[0]);
    bithumbNowCoin.push('빗썸');
    bithumbNowCoin.push(Number(bithumbPick.price).toLocaleString('ko-KR'));
    bithumbNowCoin.push(Math.floor(bithumbVolume.data.acc_trade_value).toLocaleString('ko-KR'));
    bithumbNowCoin.push(bithumbPick.transaction_date.slice(11));
    bithumbNowCoin.push('0.25%');
    // console.log(bithumbNowCoin);
    // console.log(upbitNowCoin);
}

