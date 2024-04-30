import React, {useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./Signup.css"

function Signup() {
    const [value, setValue] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password:''
    })

    const navigate = useNavigate();



    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/register', value)
            .then(res => {
                console.log(res);
                alert('회원가입이 완료되었습니다.')
                navigate('/login')
            })
            .catch(err => console.log(err));
    }
    return(
        <div className='add-user-container'>
            <form onSubmit={handleSubmit} className='add-user-form'>
                <h2>Add User</h2>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        id='name'
                        placeholder='Enter Name'
                        className='form-control'
                        value={value.name}
                        onChange={e => setValue({...value, name: e.target.value})}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        placeholder='Enter Email'
                        className='form-control'
                        value={value.email}
                        onChange={e => setValue({...value, email: e.target.value})}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        placeholder='Enter Password'
                        className='form-control'
                        value={value.password}
                        onChange={e => setValue({...value, password: e.target.value})}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='confirm_password'>Confirm Password</label>
                    <input
                        type='password'
                        id='confirm_password'
                        placeholder='Enter Confirm Password'
                        className='form-control'
                        value={value.confirm_password}
                        onChange={e => setValue({...value, confirm_password: e.target.value})}
                    />
                </div>
                <button type='submit' className='btn btn-success'>Submit</button>
            </form>
        </div>
    );
}

export default Signup;
