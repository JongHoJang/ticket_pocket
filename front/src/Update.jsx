import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useNavigate, useParams} from 'react-router-dom'

function Update() {
    const {id} = useParams();
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/read/' + id)
            .then(res => {
                console.log(res)
                setValue({
                    ...value,
                    Name: res.data[0].Name,
                    Email: res.data[0].Email,
                    Password: res.data[0].Password,
                    Confirm_password: res.data[0].Password,
                });
            })
            .catch(err => console.log(err))
    }, [])
    const [value, setValue] = useState({
        Name: '',
        Email: '',
        Password: '',
        Confirm_password: ''
    })
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8081/update/' + id, value)
            .then(res => {
                console.log(res)
                navigate('/')
            }).catch(err => console.log(err));
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleUpdate}>
                    <h2>Update User</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input type='text' placeholder='Enter Name' className='form-control' value={value.Name}
                               onChange={e => setValue({...value, Name: e.target.value})}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Email</label>
                        <input type='email' placeholder='Enter Email' className='form-control' value={value.Email}
                               onChange={e => setValue({...value, Email: e.target.value})}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Password</label>
                        <input type='password' placeholder='Enter Password' className='form-control'
                               value={value.Password}
                               onChange={e => setValue({...value, Password: e.target.value})}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Confirm Password</label>
                        <input type='password' placeholder='Enter Confirm Password' className='form-control'
                               value={value.Confirm_password}
                               onChange={e => setValue({...value, Confirm_password: e.target.value})}/>
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default Update;
