import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Link, useParams} from 'react-router-dom'

function Read() {
    const {id} = useParams();
    const [user, setUser] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/read/' + id)
            .then(res => {
                console.log(res)
                setUser(res.data[0]);
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <div className='p-2'>
                    <h2>User Detail</h2>
                    <h2>{user.Name}</h2>
                    <h2>{user.Email}</h2>
                    <h2>{user.Password}</h2>
                </div>
                <Link to="/" className='btn btn-primary me-2'>Back</Link>
                <Link to={`/edit/${user.ID}`} className='btn btn-info'>Edit</Link>
            </div>
        </div>
    )
}

export default Read;
