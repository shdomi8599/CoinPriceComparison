let upbit = [];

let upbitKrwList = [];

let upbitCoinList = [];

let upbitMarketList = [];

let upbitPick = [];

let upbitNowCoin = [];

let upbitCoinName = [];

let newTr = document.createElement('tr');

let newTd = document.createElement('td');

let tbody = document.body.querySelector('tbody');

let rank = 1;

/**
 * 참고자료 : https://reword12.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Unix-TimeStamp%EB%B3%80%ED%99%98-javascript
 * 업비트의 타임스탬프를 시간으로 치환하기 위한 함수
 */
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
*현재 사용 용도 없음*
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
  .then(fullList)
  .then(() => fetch(`https://api.upbit.com/v1/ticker?markets=${upbitMarketList}`, options))
  .then(response => response.json())
  .then(response => upbitCoinList.push(response))
  .then(() => upbitCoinList = upbitCoinList[0])
  .then(upbitCoinSymbol)
  .catch(err => console.error(err));



/**
 * upbitCoinList에서 코인 심볼명을 매개변수로 넣고 함수를 실행하면 심볼명에 맞는 코인이 upbitPick 안에 들어감
 * 새롭게 검색(호출)되기 전까진 값을 유지하다가 새 검색 시 초기화 후 리턴
 * 나중에 검색용으로 만들 예정
 * ex) upbitCoinPickUp('BTC')
 */
function upbitCoinPickUp(name) {
  upbitPick = [];
  upbitNowCoin = [];
  upbitPick = upbitCoinList.filter(function (rowData) { return rowData.market.indexOf(name) !== -1 })
  upbitNowCoin.push(rank);
  upbitNowCoin.push(name);
  upbitNowCoin.push('업비트');
  upbitNowCoin.push(upbitPick[0].trade_price.toLocaleString('ko-KR'));
  upbitNowCoin.push(Math.floor(upbitPick[0].acc_trade_price_24h).toLocaleString('ko-KR'));
  upbitNowCoin.push(Unix_timestamp((upbitPick[0].trade_timestamp / 1000).toFixed()));
  upbitNowCoin.push('0.005BTC');
  rank++;
}



/**
 * (1)
 * 코인 심볼명만 추출 
 */
function upbitCoinSymbol() {
  for (i of upbitMarketList) {
    upbitCoinName.push(i.slice(4, 7))
  }
  upbitCoinSetting()
}

/**
 * (2)
 * (1)로 전달
 * 업비트 거래소의 모든 KRW 코인 호출 및 td 삽입
 * upbitCoinSymbol 함수안에 넣어서 활용
 */
function upbitCoinSetting() {
  for (i of upbitCoinName) {
    upbitCoinPickUp(i);
    tdUpbitCreator()
  }
  filter1()
}

/**
 * (3)
 * (2)로 전달
 * upbitCoinPickUp(name)함수에서 upbitNowCoin배열에 push한 값들을 활용해서
 * 새로운 tr 1줄과 td 7개를 생성해주는 작업 
 */
function tdUpbitCreator() {
  let newTr = document.createElement('tr');
  tbody.appendChild(newTr)
  for (let i = 0; i < 7; i++) {
    let newTd = document.createElement('td');
    newTr.appendChild(newTd).innerText = upbitNowCoin[i];
  }
}

/**
 * (4)
 * (2)로 전달
 * 가져온 코인 데이터들의 td값이 모두 채워졌을 때, 실행할 수 있도록
 * upbitCoinSetting 함수 안에 넣어두었다.
 */
function filter1() {
  allTd = document.querySelectorAll('td');
  allTr = tbody.querySelectorAll('tr');
}

// let arr = [];

// for (i of allTd) {
//   arr.push(i)
// }


// function arrSolution(n,...arr) {
//   return arr[n];
//   }

