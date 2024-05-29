import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

import './Login.css'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/login', {email, password})
            .then(res => {
                if(res.data === "로그인 성공") {
                    console.log("로그인 성공")
                    navigate('/movielist')
                } else {
                    console.log("로그인 실패")
                    alert("아이디나 비밀번호를 확인해주세요");
                    setEmail('');
                    setPassword('');
                }
            })
            .catch(err => console.log(err));
    }
    return(
        <div className='login-form-container'>
            <div className='login-form-box'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            // id='email'
                            placeholder='아이디'
                            className='form-control'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            // id='password'
                            placeholder='비밀번호'
                            className='form-control'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button className='btn-login'>로그인</button>
                    {/*<Link to="/movielist" type='submit' className='btn-login'>로그인</Link>*/}
                    <Link to="/signup" className='btn-signup'>회원가입</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
