function Validation(values) {
    let error = {};
    const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; // 이메일 정규식
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 비밀번호 정규식

    // if (!values.email || !values.password) {
    //     error.email = "아이디와 비밀번호를 모두 입력해주세요.";
    // } else if (!email_pattern.test(values.email) || !password_pattern.test(values.password)) {
    //     error.email = "아이디 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.";
    // } else {
    //     error.email = '';
    //     error.password = '';
    // }

    if(values.email === '') {
        error.mail = 'Name should not be empty'
    } else if(!email_pattern.test(values.email)) {
        error.email = "Email Didn't match"
    } else {
        error.email = ''
    }

    if(values.password === '') {
        error.mail = 'Password should not be empty'
    } else if(!password_pattern.test(values.password)) {
        error.password = "Password Didn't match"
    } else {
        error.password = ''
    }

    if(values.email === '') {
        error.mail = 'Email should not be empty'
    } else if(!email_pattern.test(values.email)) {
        error.email = "Email Didn't match"
    } else {
        error.email = ''
    }
    //
    // if(values.name === '') {
    //     error.name = 'Name should not be empty'
    // } else {
    //     error.name = ''
    // }
    return error;
}


export default Validation;