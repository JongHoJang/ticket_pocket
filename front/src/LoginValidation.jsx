function Validation(values) {
    let error = {};
    const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; // 이메일 정규식
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 비밀번호 정규식

    if (values.email === '') {
        error.mail = 'Name should not be empty'
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email Didn't match"
    } else {
        error.email = ''
    }

    if (values.password === '') {
        error.mail = 'Password should not be empty'
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password Didn't match"
    } else {
        error.password = ''
    }

    if (values.email === '') {
        error.mail = 'Email should not be empty'
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email Didn't match"
    } else {
        error.email = ''
    }
    return error;
}


export default Validation;