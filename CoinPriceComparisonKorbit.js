// KRW마켓만 골라낸 배열
let korbit = [];
// KRW마켓의 코인들의 현재 정보데이터를 가져온 배열
let korbitCoinList = [];
// 
let korbitCoinName = [];
// 현재 검색된 코인의 데이터를 보관하는 배열
let korbitPick = [];
// 현재 검색된 코인의 데이터들을 추출해서 새로 만든 배열
let korbitNowCoin = [];
// 현재 검색된 코인의 거래량 데이터를 보관하는 배열
let korbitVolume = [];
// 테스트용, 테이블 랭킹용 숫자
let korbitRank = 1;

const korbitOptions = { method: 'GET', headers: { accept: 'application/json' }};

fetch('https://api.korbit.co.kr/v1/ticker/detailed/all', korbitOptions)
    .then(response => response.json())
    .then(response => korbit = response)
    .then(() => console.log(korbit) )
    .catch(err => console.error(err));

    