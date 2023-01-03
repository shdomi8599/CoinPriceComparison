const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');
const { v4: uuid } = require('uuid');

app.use(express.json()) // for parsing application/json // 밑에랑 비슷한 기능을 하는듯한데 제대로 찾아봐야할듯
app.use(express.urlencoded({ extended: true })) // 전달받는 데이터를 req.body에 저장해주는 기능인듯?
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '/views')) //html같은 ejs파일들을 위한 경로설정법인데 안해도되는듯?

const members = [];

app.get('/', (req, res) => {
    res.render('Home')
})

app.get('/LiveBoard', (req, res) => {
    res.render('LiveBoard')
})

app.get('/Login', (req, res) => {
    res.render('Login')
})

app.get('/SignUp', (req, res) => {
    res.render('SignUp')
})

app.post('/Login', (req, res) => {
    if (req.body.pw === req.body.pwConfirm) {
        const { id, pw, email } = req.body
        members.push({ id, pw, email })
        console.log(members)
        res.render('Login')
        //  res.send("<script>alert('회원가입을 축하드립니다.');window.location.replace('/Login')</script>"); // 위에 render로 변경한 이유는 send는 뒤에 members 데이터 전송이 안됐다.
        // alert 띄우면서 이동 출처  : https://codingapple.com/forums/topic/node%EC%97%90%EC%84%9C-alert%EC%B0%BD-%EB%9D%84%EC%9A%B0%EA%B8%B0-%EC%A7%88%EB%AC%B8%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4/
    }
})

app.post('/', (req, res) => {
    const { id, pw} = req.body
    if(members.find(m=>m.id === id&&m.pw===pw)){
        return res.send("<script>alert('로그인에 성공하였습니다.');window.location.replace('/')</script>");
    }else {
         return res.send("<script>alert('정보를 다시 확인해주세요.');window.location.replace('/Login')</script>")
    }
})


app.get('/FreeBoard', (req, res) => {
    res.render('FreeBoard')
})

app.listen(3000, () => {
    console.log('어서와')
})