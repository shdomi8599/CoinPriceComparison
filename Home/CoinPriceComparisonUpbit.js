//최초 업비트 api  순수 데이터
let upbit = [];
// KRW마켓만 골라낸 배열
let upbitKrwList = [];
// KRW마켓의 코인들의 현재 정보데이터를 가져온 배열
let upbitCoinList = [];
// KRW마켓 코인들의 심볼명을 가져오기 위한 배열
let upbitMarketList = [];
// 현재 검색된 코인을 가르키기 위한 배열
let upbitPick = [];
// 현재 검색된 코인의 데이터들을 추출해서 새로 만든 배열
let upbitNowCoin = [];
// KRW- 를 제거하고 완벽하게 심볼명만 가져온 배열
let upbitCoinName = [];
//필터 이후 마지막 리스트 정렬된 배열
let upbitLastList = [];
//순위 리스트를 위한 변수 rank
// let rank = 1;
//업비트 코인 영어이름
let upbitEngName = [];


/** 
 * 업비트 api 데이터
 * USDT 마켓과 BTC 마켓을 제외하고 KRW 마켓만 추출하기 위한 작업을 위해 최초 1회 실행 되고
 * marketList 배열 안에 각 코인 마켓명을 배열로 저장하고 그 배열 값을 이용해 현재 시세를 호출하여 
 * upbitCoinList 배열 안에 순서대로 추가한다. 
 */
const options = { method: 'GET', headers: { accept: 'application/json' } };


function upbitLastCall(name) {
  upbitPick = [];
  upbitNowCoin = [];
  upbitKrwList = [];
  upbitMarketList = [];
  upbitCoinList =[];
fetch('https://api.upbit.com/v1/market/all?isDetails=false', options)
  .then(response => response.json())
  .then(response => upbit = response)
  .then(upbit => upbitKrwList = upbit.filter(function (rowData) { return rowData.market.indexOf('KRW') !== -1 }))
  .then(upbitObject)
  .then(upbitfullListing)
  .then(() => fetch(`https://api.upbit.com/v1/ticker?markets=${upbitMarketList}`, options))
  .then(response => response.json())
  .then(response => upbitCoinList = response)
  .then(upbitLastListing)
  .then(upbitCoinSymbol)
  .then(()=> upbitCoinPickUp(name))
  .then(()=>callBundle(upbitNowCoin))
  .then(objUpbitData)
 .then(imgChange)
  .catch(err => console.error(err));
}


/**
 * 1번째 fetch데이터로 사용
 * marketList에 모든 KRW마켓의 코인 종류를 담기 위한 함수
 */
function upbitfullListing() {
  for (let i = 0; i < upbitKrwList.length; i++) {
    upbitMarketList.push(upbitKrwList[i].market);
  }
  upbitMarketList.splice(109,1)
}

/**
 2번째 fetch데이터로 사용
 필터 이후 재배치를 위한 함수(심볼명 추출용)
 upbitfullListing과 다른 용도  
 */
function upbitLastListing() {
  upbitLastList = [];
  for (let i = 0; i < upbitCoinList.length; i++) {
    upbitLastList.push(upbitCoinList[i].market);
  }
}

/**
 * 마무리 작업 중 (1)번째 작업
 * 필터 이후의 코인 심볼명만 추출 
 */
function upbitCoinSymbol() {
  upbitCoinName = [];
  for (i of upbitLastList) {
    upbitCoinName.push(i.slice(4, 7))
  }
}



/**
 * upbitCoinList에서 코인 심볼명을 매개변수로 넣고 함수를 실행하면 심볼명에 맞는 코인이 upbitPick 안에 들어감
 * 새롭게 검색(호출)되기 전까진 값을 유지하다가 새 검색 시 초기화 후 리턴
 * 나중에 검색용으로 만들 예정
 * ex) upbitCoinPickUp('BTC')
 */
function upbitCoinPickUp(name) {
  if(upbitCoinName.indexOf(name) !== -1){
  upbitPick = upbitCoinList.filter(function (rowData) { return rowData.market.indexOf(name) !== -1 })
  upbitNowCoin.push('1');
  upbitNowCoin.push(name);
  upbitNowCoin.push('업비트');
  upbitNowCoin.push(upbitPick[0].trade_price.toLocaleString('ko-KR'));
  upbitNowCoin.push(Math.floor(upbitPick[0].acc_trade_price_24h).toLocaleString('ko-KR'));
  upbitNowCoin.push(Unix_timestamp((upbitPick[0].trade_timestamp / 1000).toFixed()).slice(11));
  upbitNowCoin.push('0.05%');
  }

}


