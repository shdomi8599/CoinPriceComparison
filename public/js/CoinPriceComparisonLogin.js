


function checkForm() {
    if(form.id.value === ''){
        form.id.focus();
        alert("아이디를 입력해주세요.");
        return false;
    }
    if(form.pw.value ===''){
        form.pw.focus();
        alert("비밀번호를 입력해주세요.");
        return false;
    }
}


