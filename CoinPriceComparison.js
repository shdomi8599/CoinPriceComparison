let upbit = [];

let upbitKrwList = [];

let marketList = [];

/**
배열 전용 필터 
query에 해당하는 문자열을 가진 배열들만 따로 추출해서 새로운 배열로 만들어줌
 */
function filterItems(query) {
  return arr.filter(function (el) {
    return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
  })
}

/**
 * 업비트 api 데이터
 */
const options = { method: 'GET', headers: { accept: 'application/json' } };

fetch('https://api.upbit.com/v1/market/all?isDetails=false', options)
  .then(response => response.json())
  .then(response => upbit = response)
  .then(upbit => upbitKrwList = upbit.filter(function (rowData) { return rowData.market.indexOf('KRW') !== -1 }))
  .then(upbitKrwList => fetch(`https://api.upbit.com/v1/ticker?markets=${upbitKrwList[0].market}`, options))
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

// 포문으로 모든 주소 호출
// (function (){
//     for (let i =0; i<upbitKrwList.length; i++){
//       console.log(`https://api.upbit.com/v1/ticker?markets=${upbitKrwList[i].market}`)
//    }
// })()

