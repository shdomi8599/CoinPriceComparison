const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');
const { v4: uuid } = require('uuid');
const cors = require('cors');

app.use(cors())
app.use(express.json()) // for parsing application/json // 밑에랑 비슷한 기능을 하는듯한데 제대로 찾아봐야할듯
app.use(express.urlencoded({ extended: true })) // 전달받는 데이터를 req.body에 저장해주는 기능인듯?
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '/views')) //html같은 ejs파일들을 위한 경로설정법인데 안해도되는듯?
const members = [];
let boardList = [];
const myId = [];

//코빗
let korbitDataArr;
async function korbitData() {
    korbitDataArr = await fetch('https://api.korbit.co.kr/v1/ticker/detailed/all', { method: 'GET', headers: { accept: 'application/json' } })
        .then(response => response.json())
}

let korbitPickDataArr;
async function korbitPickData(name) {
    korbitPickDataArr = await fetch(`https://api.korbit.co.kr/v1/ticker/detailed?currency_pair=${name}_krw`, { method: 'GET', headers: { accept: 'application/json' } })
        .then(response => response.json())
}

app.get('/kobitData', (req, res) => {
    korbitData()
    const { currency_pair } = req.query
    if (currency_pair) {
        korbitPickData(currency_pair)
        res.json(korbitPickDataArr)
    }
    return res.json(korbitDataArr)
})
//코인원
let coinOneDataArr;
async function coinOneData() {
    coinOneDataArr = await fetch('https://api.coinone.co.kr/public/v2/markets/KRW', { method: 'GET', headers: { accept: 'application/json' } })
        .then(response => response.json())
}

let coinOneKrwArr;
async function coinOneKrwData() {
    coinOneKrwArr = await fetch(`https://api.coinone.co.kr/public/v2/ticker_new/KRW`, { method: 'GET', headers: { accept: 'application/json' } })
        .then(response => response.json())
}
app.get('/coinoneData', (req, res) => {
    coinOneData()
    return res.json(coinOneDataArr)
})
app.get('/coinoneKrwData', (req, res) => {
    coinOneKrwData()
    return res.json(coinOneKrwArr)
})

app.get('/', (req, res) => {
    if (myId.length) {
        const [{ id }] = myId
        res.render('Home', { id })
    } else {
        res.render('Home', { myId })
    }

})

app.get('/NewComment', (req, res) => {
    if (myId.length) {
        const [{ id }] = myId
        res.render('NewComment', { id })
    } else {
        return res.send("<script>alert('로그인 후 사용해주세요.');window.location.replace('/Login')</script>")
    }
})

app.get('/LiveBoard', (req, res) => {
    if (myId.length) {
        const [{ id }] = myId
        res.render('LiveBoard', { id })
    } else {
        res.render('LiveBoard')
    }
})

app.get('/Login', (req, res) => {
    if (myId.length === 0) {
        res.render('Login')
    } else {
        return res.send("<script>alert('이미 로그인 상태입니다.');window.location = document.referrer;</script>")
        //오류 메세지를 출력하고 이전 페이지로 돌아가기 위해 history.go(-1)를 썼으나 주소만 찍히고 돌아가지 못해서 다른 해결법을 찾다가 발견한 방법 
        //출처 : https://developer-doreen.tistory.com/39
    }
})

app.get('/SignUp', (req, res) => {
    if (myId.length === 0) {
        res.render('SignUp') // render는 ejs파일을 랜더링해서 html문서를 클라이언트에게 보여주기 위해 사용됨
        //만약에 ejs 엔진을 쓰지않는다면 send('주소')의 형태로 보여주면 될듯
    } else {
        return res.send("<script>alert('이미 회원입니다.');window.location = document.referrer;</script>")
        //오류 메세지를 출력하고 이전 페이지로 돌아가기 위해 history.go(-1)를 썼으나 주소만 찍히고 돌아가지 못해서 다른 해결법을 찾다가 발견한 방법 
        //출처 : https://developer-doreen.tistory.com/39
    }
})

app.post('/Login', (req, res) => {
    if (req.body.pw === req.body.pwConfirm) {
        const { id, pw, email } = req.body
        members.push({ id, pw, email })
        console.log(members)
        // res.render('Login')
        res.send("<script>alert('회원가입을 축하드립니다.');window.location.replace('/Login')</script>");
        //여기서 render를 안쓰는 이유는 위에서 이미 /Login의 주소로 접속하면 랜더링이 되기때문에 send를 사용함
        // alert 띄우면서 이동 출처  : https://codingapple.com/forums/topic/node%EC%97%90%EC%84%9C-alert%EC%B0%BD-%EB%9D%84%EC%9A%B0%EA%B8%B0-%EC%A7%88%EB%AC%B8%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4/
    }
})

app.post('/', (req, res) => {
    const { id, pw } = req.body
    if (members.find(m => m.id === id && m.pw === pw)) {
        // return res.send("<script>alert('로그인에 성공하였습니다.');window.location.replace('/')</script>", {id});
        myId.push({ id });
        // console.log(myId)
        return res.render('Home', { id })
    } else {
        return res.send("<script>alert('정보를 다시 확인해주세요.');window.location.replace('/Login')</script>")
    }
})

app.post('/FreeBoard', (req, res) => {
    const [{ id }] = myId
    const { commentTitle, comment } = req.body
    boardList.push({ id, commentTitle, comment, commentId: uuid() })
    console.log(boardList)
    return res.render('FreeBoard', { boardList })
})


app.get('/FreeBoard', (req, res) => {
    if (myId.length) {
        const [{ id }] = myId
        res.render('FreeBoard', { boardList, id })
    } else {
        res.render('FreeBoard')
    }
})

app.get('/FreeBoard/:id', (req, res) => {
    const { id } = req.params;
    const comment = boardList.find(c => c.commentId === id)
    res.render('ViewComment', { comment })
})

app.get('/FreeBoard/:id/Edit', (req, res) => {
    const { id } = req.params;
    const comment = boardList.find(c => c.commentId === id)
    res.render('CommentEdit', { comment })
})

app.patch('/FreeBoard/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const newTitleText = req.body.title;
    console.log({ id })
    console.log({ newCommentText })
    console.log({ newTitleText })
    const foundComment = boardList.find(c => c.commentId === id)
    foundComment.comment = newCommentText;
    foundComment.commentTitle = newTitleText;
    res.redirect('/FreeBoard')
})

app.delete('/FreeBoard/:id', (req, res) => {
    const { id } = req.params;
    console.log({ id })
    console.log({ boardList })
    boardList = boardList.filter(c => c.commentId !== id)
    //필터를 이용해서 commentId가 일치하는 애를 제외한 나머지를 다시 가져와서 정렬해주는 작업
    res.redirect('/FreeBoard')
})


app.listen(8080, () => {
    console.log('어서와')
})