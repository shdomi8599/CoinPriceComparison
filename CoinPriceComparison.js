let upbit = [];

let upbitKrwList = [];

let upbitCoinList = [];

let upbitMarketList = [];

let upbitPick = [];


function Unix_timestamp(t) {
  var date = new Date(t * 1000);
  var year = date.getFullYear();
  var month = "0" + (date.getMonth() + 1);
  var day = "0" + date.getDate();
  var hour = "0" + date.getHours();
  var minute = "0" + date.getMinutes();
  var second = "0" + date.getSeconds();
  return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
}

/**
배열 전용 필터 
query에 해당하는 문자열을 가진 배열들만 따로 추출해서 새로운 배열로 만들어줌
 */
function filterItems(query) {
  return upbitCoinList.filter(function (el) {
    return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
  })
}

/**
 * marketList에 모든 KRW마켓의 코인 종류를 담기 위한 함수
 */
function fullList() {
  for (let i = 0; i < upbitKrwList.length; i++) {
    upbitMarketList.push(upbitKrwList[i].market);
  }
}

/** 
 * 업비트 api 데이터
 * USDT 마켓과 BTC 마켓을 제외하고 KRW 마켓만 추출하기 위한 작업을 위해 최초 1회 실행 되고
 * marketList 배열 안에 각 코인 마켓명을 배열로 저장하고 그 배열 값을 이용해 현재 시세를 호출하여 
 * upbitCoinList 배열 안에 순서대로 추가한다. 
 */
const options = { method: 'GET', headers: { accept: 'application/json' } };

fetch('https://api.upbit.com/v1/market/all?isDetails=false', options)
  .then(response => response.json())
  .then(response => upbit = response)
  .then(upbit => upbitKrwList = upbit.filter(function (rowData) { return rowData.market.indexOf('KRW') !== -1 }))
  .then(upbitKrwList => fullList())
  .then(upbitKrwList => fetch(`https://api.upbit.com/v1/ticker?markets=${upbitMarketList}`, options))
  .then(response => response.json())
  .then(response => upbitCoinList.push(response))
  .then(response => upbitCoinList = upbitCoinList[0])
  .catch(err => console.error(err));

/**
 * upbitCoinList에서 코인 심볼명을 매개변수로 넣고 함수를 실행하면 심볼명에 맞는 코인이 upbitPick 안에 들어감
 * 새롭게 검색(호출)되기 전까진 값을 유지하다가 새 검색 시 초기화 후 리턴
 * 나중에 검색용으로 만들 예정
 * ex) upbitCoinPickUp('BTC')
 */
function upbitCoinPickUp(name) {
  upbitPick = [];
  upbitPick = upbitCoinList.filter(function (rowData) { return rowData.market.indexOf(name) !== -1 })
  console.log(`코인명 : ${name}`)
  console.log(`현재 거래 가격 : ${upbitPick[0].trade_price}`)
  console.log(`거래량 : ${upbitPick[0].acc_trade_volume}`)
  console.log(`마지막 거래 시간 : ${Unix_timestamp((upbitPick[0].trade_timestamp / 1000).toFixed())}`)
  console.log('거래소명 : 업비트')
}

function any(_name) {
  var add = "";
  return add + _name + add;
}