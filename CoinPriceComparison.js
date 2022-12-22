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
let rank = 1;

let newTr = document.createElement('tr');

let newTd = document.createElement('td');

let tbody = document.body.querySelector('tbody');

let allTr = tbody.querySelectorAll('tr');

let allTd = tbody.querySelectorAll('td');

let priceHighButton = document.querySelector('#price_high')

let priceLowButton = document.querySelector('#price_low')

let volumeHighButton = document.querySelector('#volume_high')

let volumeLowButton = document.querySelector('#volume_low')

priceHighButton.addEventListener('click', () => priceReload());

priceLowButton.addEventListener('click', () => priceReload(-1));

volumeHighButton.addEventListener('click', () => volumeReload());

volumeLowButton.addEventListener('click', () => volumeReload(-1));

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
<<<<<<< HEAD
  .then(response => upbitCoinList = response)
  .then(() => upbitFinalEvent[0].price(1))
  .catch(err => console.error(err));

/**
 * 코인 가격 정렬용  x = 1은 높은 순 x= -1은 낮은 순
 */
function priceReload(x = 1) {
  removeAllchild(tbody);
  upbit = [];
  upbitKrwList = [];
  upbitCoinList = [];
  upbitMarketList = [];
  upbitPick = [];
  upbitNowCoin = [];
  upbitCoinName = [];
  upbitLastList = [];
  fetch('https://api.upbit.com/v1/market/all?isDetails=false', options)
    .then(response => response.json())
    .then(response => upbit = response)
    .then(upbit => upbitKrwList = upbit.filter(function (rowData) { return rowData.market.indexOf('KRW') !== -1 }))
    .then(upbitfullListing)
    .then(() => fetch(`https://api.upbit.com/v1/ticker?markets=${upbitMarketList}`, options))
    .then(response => response.json())
    .then(response => upbitCoinList = response)
    .then(() => upbitFinalEvent[0].price(x))
    .catch(err => console.error(err));
};

/**
 * 거래 대금 정렬용 x = 1은 높은 순 x= -1은 낮은 순
 */
function volumeReload(x = 1) {
  removeAllchild(tbody);
  upbit = [];
  upbitKrwList = [];
  upbitCoinList = [];
  upbitMarketList = [];
  upbitPick = [];
  upbitNowCoin = [];
  upbitCoinName = [];
  upbitLastList = [];
  fetch('https://api.upbit.com/v1/market/all?isDetails=false', options)
    .then(response => response.json())
    .then(response => upbit = response)
    .then(upbit => upbitKrwList = upbit.filter(function (rowData) { return rowData.market.indexOf('KRW') !== -1 }))
    .then(upbitfullListing)
    .then(() => fetch(`https://api.upbit.com/v1/ticker?markets=${upbitMarketList}`, options))
    .then(response => response.json())
    .then(response => upbitCoinList = response)
    .then(() => upbitFinalEvent[1].volume(x))
    .catch(err => console.error(err));
}

/**
 * 모든 자식 노드 삭제용 함수
 * 필터를 눌렀을 때, 데이터를 지우고 다시 채워넣기 위한 함수
 */
function removeAllchild(div) {
  while (div.hasChildNodes()) {
    div.removeChild(div.firstChild);
  }
  rank = 1;
}

/**
 * 1번째 fetch데이터로 사용
 * marketList에 모든 KRW마켓의 코인 종류를 담기 위한 함수
 */
function upbitfullListing() {
  for (let i = 0; i < upbitKrwList.length; i++) {
    upbitMarketList.push(upbitKrwList[i].market);
  }
}

/**
 2번째 fetch데이터로 사용
 필터 이후 재배치를 위한 함수(심볼명 추출용)
 upbitfullListing과 다른 용도  
 */
function upbitLastListing() {
  for (let i = 0; i < upbitCoinList.length; i++) {
    upbitLastList.push(upbitCoinList[i].market);
  }
}

/**
 * 마무리 작업 중 (1)번째 작업
 * 필터 이후의 코인 심볼명만 추출 
 */
function upbitCoinSymbol() {
  for (i of upbitLastList) {
    upbitCoinName.push(i.slice(4, 7))
  }
}

/**
 * 마무리 작업 중 (2)번째 작업
 * (1)로 전달
 * 업비트 거래소의 모든 KRW 코인 호출 및 td 삽입
 * upbitCoinSymbol 함수안에 넣어서 활용
 */
function upbitCoinSetting() {
  for (i of upbitCoinName) {
    upbitCoinPickUp(i);
    tdUpbitCreator()
  }
}

/**
 * 마무리 작업 중 (3)번째 작업
 * (2)로 전달
=======
  .then(response => upbitCoinList.push(response))
  .then(() => upbitCoinList = upbitCoinList[0])
  .then(upbitCoinSymbol)
  .catch(err => console.error(err));



/**
>>>>>>> f898085238555ee429a62f0c405dc7304da4e416
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
 * upbitCoinList의 데이터용 필터 (거래량순 전용)
 */
function upbitVolumeFilter(x) {
  upbitCoinList.sort(function (a, b) {
    if (a.acc_trade_price_24h > b.acc_trade_price_24h) {
      return -x;
    }
    if (a.acc_trade_price_24h < b.acc_trade_price_24h) {
      return x;
    }
    return 0;
  });
}

/**
 * upbitCoinList의 데이터용 필터 (코인 가격순 전용)
 * x=1 이라면 높은 순 / x=-1이라면 낮은순
 * upbitVolumeFilter와 upbitPriceFilter를 하나로 합쳐서 매개변수를 전달해서 
 * 사용하고 싶었으나 acc_trade_price_24h와 trade_price가 정의되지 않았다는 이유로
 * 에러가 발생했다. 스코프의 문제인 것 같기도 하면서 배열은 밖으로 나와있기 때문에
 * 문제가 없을 것 같은데 아직까진 정확한 이유를 찾지 못하겠다. 
 */
function upbitPriceFilter(x) {
  upbitCoinList.sort(function (a, b) {
    if (a.trade_price > b.trade_price) {
      return -x;
    }
    if (a.trade_price < b.trade_price) {
      return x;
    }
    return 0;
  });
}

/**
 * price와 volume필터를 포함한 객체 함수
 */
const upbitFinalEvent = [{
  price: function upbitPriceFinal(x) {
    upbitPriceFilter(x);
    upbitLastListing();
    upbitCoinSymbol();
    upbitCoinSetting()
  }
},
{
  volume: function upbitVolumeFinal(x) {
    upbitVolumeFilter(x);
    upbitLastListing();
    upbitCoinSymbol();
    upbitCoinSetting()
  }
}]
