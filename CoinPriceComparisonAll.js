/**
 * 참고자료 : https://reword12.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Unix-TimeStamp%EB%B3%80%ED%99%98-javascript
 * 타임스탬프를 시간으로 치환하기 위한 함수
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

let searchTextBox = document.body.querySelector('#searchCoinText');

let searchButton = document.body.querySelector('#searchCoin_btn');

/**
 * 검색어를 쓰고 엔터키를 누르면 검색결과가 나오게 만든 이벤트
 */
searchTextBox.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchButton.click();
    }
});

/**
 * 4대 거래소 검색 결과 이벤트
 */
let buttonEvent = searchButton.addEventListener('click', coinList);

function coinList() {
    allrank = 0;
    removeAllchild()
    upbitLastCall(searchTextBox.value.toUpperCase())
    kobitPickCoin(searchTextBox.value)
    bithumbPickCoin(searchTextBox.value.toUpperCase())
    coinoneLastCall(searchTextBox.value)

}

/**
 * 데이터 삽입
 */
let resultBox = document.body.querySelector('#resultBox');

let allrank = 0;

function callBundle(name) {
    let div = document.createElement('div')
    resultBox.appendChild(div).setAttribute("class", "dataBundle");
    function callData() {
        let rankDiv = document.createElement('div')
        div.appendChild(rankDiv).setAttribute("class", "resultData");
        rankDiv.innerText = allrank;
        for (let i = 1; i < 7; i++) {
            let rowDiv = document.createElement('div')
            div.appendChild(rowDiv).setAttribute("class", "resultData");
            rowDiv.innerText = name[i];
        }
    }
    allrank++;
    callData()
}


/**
 * 모든 자식 데이터 삭제
 */

function removeAllchild() {
    while (resultBox.hasChildNodes()) {
        resultBox.removeChild(resultBox.firstChild);
    }
}

/**
 * 필터를 위한 데이터 비교 
 */
let objUpbit = {};
let objBithumb = {};
let objKorbit = {};
let objCoinone = {};

let allArr = [];

// function allObj() {
//     for (let i = 0; i < upbitNowCoin.length; i++) {
//         objUpbit[`key${i}`] = upbitNowCoin[i]
//         objBithumb[`key${i}`] = bithumbNowCoin[i]
//         objCoinone[`key${i}`] = coinoneNowCoinLast[i]
//         objKorbit[`key${i}`] = korbitNowCoinLast[i]
//     }
//     allArr.push(objUpbit)
//     allArr.push(objBithumb)
//     allArr.push(objKorbit)
//     allArr.push(objCoinone)
// }

function objUpbitData(){
for (let i = 0; i < upbitNowCoin.length; i++) {
        objUpbit[`key${i}`] = upbitNowCoin[i]
    }
    allArr.push(objUpbit)
}

function objBithumbData(){
    for (let i = 0; i < upbitNowCoin.length; i++) {
        objBithumb[`key${i}`] = bithumbNowCoin[i]
    }
    allArr.push(objBithumb)
}

function objCoinoneData(){
    for (let i = 0; i < upbitNowCoin.length; i++) {
        objCoinone[`key${i}`] = coinoneNowCoinLast[i]
    }
    allArr.push(objCoinone)
}

function objKorbitData(){
    for (let i = 0; i < upbitNowCoin.length; i++) {
        objKorbit[`key${i}`] = korbitNowCoinLast[i]
    }
    allArr.push(objKorbit)
}

function filterPriceLow(){
    allArr.sort(function(a, b) {
        return a.key3 - b.key3;
      });
}

function filterPriceHigh(){
    allArr.sort(function(a, b) {
        return b.key3 - a.key3
      });
}

function filterVolumeHigh(){
    allArr.sort(function(a, b) {
        return Number(b.key4.replaceAll(",", "")) - Number(a.key4.replaceAll(",", ""))
      });
}

function filterVolumeLow(){
    allArr.sort(function(a, b) {
        return Number(a.key4.replaceAll(",", "")) - Number(b.key4.replaceAll(",", ""))
      });
}

let priceHigh = document.body.querySelector("#filterPriceHigh");
let PpriceLow = document.body.querySelector("#filterPriceLow");
let volumeHigh = document.body.querySelector("#filterVolumeHigh");
let volumeLow = document.body.querySelector("#filterVolumeLow");

priceHigh.addEventListener('click',filterPriceHigh)
PpriceLow.addEventListener('click',filterPriceLow)
volumeHigh.addEventListener('click',filterVolumeHigh)
volumeLow.addEventListener('click',filterVolumeLow)