let changeName = '';

let nowCoinName = document.body.querySelector('#nowCoinName')

let upbitObj = {};
let upbitEngObj = {};
let upbitKeyArr = [];
let upbitValueArr = [];


let allCoin = {비트코인: 'BTC', 리플: 'XRP', 이더리움 : 'ETH',디비전: 'DVI', 쿠사마: 'KSM', 네스트리: 'EGG', 밸런서: 'BAL', 퀴즈톡: 'QTCON', 프론티어: 'FRONT', 고머니: 'GOM2', 제로엑스: 'ZRX', 리니어파이낸스: 'LINA', 저스트: 'JST', 썬: 'SUN', 오미세고: 'OMG', 스와이프: 'SXP', 에이다: 'ADA', 렌: 'REN', 위드: 'WIKEN', 알케미페이: 'ACH', 벨라프로토콜: 'BEL', 어셈블프로토콜: 'ASM', 오르빗체인: 'ORC', 식스: 'SIX', 더그래프: 'GRT', 페이코인: 'PCI', 우마: 'UMA', 카르테시: 'CTSI', 코스모스: 'ATOM', 클레이튼: 'KLAY', 울트라: 'UOS', 유니스왑: 'UNI', 네오핀: 'NPT', 너보스: 'CKB', 힙스: 'HIBS', 맵프로토콜: 'MAP', 아발란체: 'AVAX', 템코: 'TEMCO', 컴파운드: 'COMP', 뱅코르: 'BNT', 다오메이커: 'DAO', 오리진프로토콜: 'OGN', 알파: 'ARPA', 이더리움: 'ETH', 스시스왑: 'SUSHI', 소다코인: 'SOC', 콘텐토스: 'COS', 신세틱스: 'SNX', 갈라: 'GALA', 미버스: 'MEV', 마일벌스: 'MVC', 아모코인: 'AMO', 에이피이앤에프티: 'NFT', 베이직: 'BASIC', 연파이낸스: 'YFI', 바이낸스코인: 'BNB', 다이: 'DAI', 메이커: 'MKR', 루프링: 'LRC', 랠리: 'RLY', 티드랍: 'TDROP', 엘론드: 'EGLD', 라이브피어: 'LPT', 오션프로토콜: 'OCEAN', 엘프: 'ELF', 파워렛저: 'POWR', 스트라티스: 'STRAX', 스테이터스네트워크토큰: 'SNT', 코르텍스: 'CTXC', 웨이브: 'WAVES', 이오스트: 'IOST', 라이즌: 'ATOLO', 밸러토큰: 'VALOR', 코넌: 'CON', 믹스마블: 'MIX', 펑션엑스: 'FX', 크로미아: 'CHR', 머신익스체인지코인: 'MXC', 트러스트버스: 'TRV', 왐토큰: 'WOM', 보아: 'BOA', 엘리시아: 'EL', 프로톤: 'XPR', 베라시티: 'VRA', 피트네트워크: 'FIT', 크레딧코인: 'CTC', 에이피엠코인: 'APM', 센트럴리티: 'CENNZ', 이브이지: 'EVZ', 리저브라이트: 'RSR', 뉴메레르: 'NMR', 아이젝: 'RLC', 옵저버: 'OBSR', 폴라리스쉐어: 'POLA', 에이아이워크: 'AWO', 어댑터토큰: 'ADP', 게이머코인: 'GHX', 블로서리: 'BLY', 이포스: 'WOZX', 애니버스: 'ANV', 바이오패스포트: 'BIOT', 제노토큰: 'XNO', 라이파이낸스: 'SOFI', 콜라토큰: 'COLA', 오키드: 'OXT', 플레이댑: 'PLA', 셀러네트워크: 'CELR', 아로와나토큰: 'ARW', 바이프로스트: 'BFC', 마이네이버앨리스: 'ALICE', 코티: 'COTI', 팬케이크스왑: 'CAKE', 비너스: 'XVS', 트러스트스왑: 'SWAP', 우네트워크: 'WOO', 벨로프로토콜: 'VELO', 웨이키체인: 'WICC', 썸씽: 'SSX', 셴투: 'CTK', 심볼: 'XYM', 고체인: 'GO', 디파인: 'DFA', 코인: 'C98', 보바토큰: 'BOBA', 이피니티토큰: 'EFI', 재스미코인: 'JASMY', 타이탄스왑: 'TITAN', 리퀘스트: 'REQ', 캐스퍼: 'CSPR', 스포티움: 'SPRT', 레이: 'REI', 마브렉스: 'MBX', 알타바: 'TAVA', 아치루트: 'ALT', 체인: 'XCN', 갤럭시아: 'GXA', 아지트: 'AZIT', 스텝앱: 'FITFI'};


let coinoneObj = {};


let korbitObj = {};


/**
 * 이미지 삽입을 위한 업비트 영문명
 */
function upbitObject(){
for (i of upbitKrwList){
    upbitKeyArr.push(i.market.slice(4))
}
for (i of upbitKrwList){
    upbitValueArr.push(i.korean_name)
}
for (i of upbitKrwList) {
    upbitEngName.push(i.english_name);
 }
for ( let z = 0; z < upbitValueArr.length; z++) {
    upbitObj[upbitValueArr[z]] = upbitKeyArr[z]
  }
  for ( let z = 0; z < upbitValueArr.length; z++) {
    upbitEngObj[upbitEngName[z]] = upbitKeyArr[z]
  }
}


    
    
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
    allArr = [];
    allrank = 0;
    if (allCoin[searchTextBox.value] !== undefined){
    changeName = allCoin[searchTextBox.value]
    removeAllchild()
    upbitLastCall(changeName)
    kobitPickCoin(changeName.toLowerCase())
    bithumbPickCoin(changeName)
    coinoneLastCall(changeName.toLowerCase())
    nowCoinName.innerText = searchTextBox.value;
    }
    else {
        openErrorBox()
    }
}



/**
 * 데이터 삽입
 */
let resultBox = document.body.querySelector('#resultBox');

let allrank = 0;

function callBundle(name) {
    if(name[0] !== undefined){
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
 * 필터를 위한 선언
 */
let objUpbit = {};
let objBithumb = {};
let objKorbit = {};
let objCoinone = {};

let allArr = [];

/**
 * 필터를 위한 데이터 삽입 작업
 */
function objUpbitData(){
for (let i = 0; i < upbitNowCoin.length; i++) {
        objUpbit[`key${i}`] = upbitNowCoin[i]
    }
    allArr.push(objUpbit)
}

function objBithumbData(){
    for (let i = 0; i < bithumbNowCoin.length; i++) {
        objBithumb[`key${i}`] = bithumbNowCoin[i]
    }
    allArr.push(objBithumb)
}

function objCoinoneData(){
    for (let i = 0; i < coinoneNowCoinLast.length; i++) {
        objCoinone[`key${i}`] = coinoneNowCoinLast[i]
    }
    allArr.push(objCoinone)
}

function objKorbitData(){
    for (let i = 0; i < korbitNowCoinLast.length; i++) {
        objKorbit[`key${i}`] = korbitNowCoinLast[i]
    }
    allArr.push(objKorbit)
}


/**
 * 각 버튼에 넣어줄 필터함수들
 */
function filterPriceLow(){
    allArr.sort(function(a, b) {
        return Number(a.key3.replaceAll(",", "")) - Number(b.key3.replaceAll(",", ""))
      });
      resetBundle(allArr)
}

function filterPriceHigh(){
    allArr.sort(function(a, b) {
        return Number(b.key3.replaceAll(",", "")) - Number(a.key3.replaceAll(",", ""))
      });
    resetBundle(allArr)
}

function filterVolumeHigh(){
    allArr.sort(function(a, b) {
        return Number(b.key4.replaceAll(",", "")) - Number(a.key4.replaceAll(",", ""))
      });
      resetBundle(allArr)
}

function filterVolumeLow(){
    allArr.sort(function(a, b) {
        return Number(a.key4.replaceAll(",", "")) - Number(b.key4.replaceAll(",", ""))
      });
      resetBundle(allArr)
}

let priceHigh = document.body.querySelector("#filterPriceHigh");
let priceLow = document.body.querySelector("#filterPriceLow");
let volumeHigh = document.body.querySelector("#filterVolumeHigh");
let volumeLow = document.body.querySelector("#filterVolumeLow");

priceHigh.addEventListener('click',filterPriceHigh)
priceLow.addEventListener('click',filterPriceLow)
volumeHigh.addEventListener('click',filterVolumeHigh)
volumeLow.addEventListener('click',filterVolumeLow)

/**
 * 리셋 필터 
 */
function resetBundle(name) {
    allrank =1;
    removeAllchild();
    function callResetData() {
        for(let j=0; j<allArr.length; j++){
            let div = document.createElement('div');
            resultBox.appendChild(div).setAttribute("class", "dataBundle");
        let rankDiv = document.createElement('div')
        div.appendChild(rankDiv).setAttribute("class", "resultData");
        rankDiv.innerText = allrank;
        for (let i = 1; i < 7; i++) {
            let rowDiv = document.createElement('div')
            div.appendChild(rowDiv).setAttribute("class", "resultData");
            rowDiv.innerText = Object.values(name[j])[i];
            }
            allrank++;  }
    }
    callResetData()
}


/**
 * 이미지 삽입
 */

//값으로 키 찾기, 이미지에 맞는 코인명을 호출하기 위한 함수
function getKeyByValue(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
  }

let coinImg = document.body.querySelector('#coinImg')

function imgChange() {
    if (allCoin[searchTextBox.value] !== undefined){
        if(getKeyByValue(upbitEngObj,allCoin[searchTextBox.value]) !== undefined){
    coinImg.src = `https://cryptologos.cc/logos/${getKeyByValue(upbitEngObj,allCoin[searchTextBox.value]).toLowerCase()}-${allCoin[searchTextBox.value].toLowerCase()}-logo.png?v=024`;
    } else {
        coinImg.src = 'https://w7.pngwing.com/pngs/726/537/png-transparent-x-mark-computer-icons-check-mark-x-mark-thumbnail.png';
    }
}
}

/**
 * 팝업박스
 */

let closeBtn = document.body.querySelector('#closeBtn')

function closeBox() {
    this.parentElement.style.display='none';
}
closeBtn.addEventListener('click',closeBox);

let errorBtn = document.body.querySelector('#errorBtn')

errorBtn.parentElement.style.display='none';

function openErrorBox() {
    errorBtn.parentElement.style.display='inline';
    setTimeout(() => closeErrorBox(), 1500);
}


function closeErrorBox() {
    errorBtn.parentElement.style.display='none';
}

errorBtn.addEventListener('click',closeErrorBox);

