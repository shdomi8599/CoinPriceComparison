

function checkForm() {
    if( form.pw.value !==form.pwConfirm.value) {
        form.pw.focus();
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    }

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

    if(form.email.value ===''){
        form.email.focus();
        alert("이메일을 입력해주세요.");
        return false;
    }
}
