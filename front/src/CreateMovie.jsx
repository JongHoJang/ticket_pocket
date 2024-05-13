import React, {useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import movieList from "./MovieList";

function CreateMovie() {
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [cinemaName, setCinemaName] = useState("")
    const [seatNumbers, setSeatNumbers] = useState("")
    const [review, setReview] = useState("")
    const [companions, setCompanions] = useState("")
    const [file, setFile] = useState();

    const navigate = useNavigate();

    const handleUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("date", date);
        formData.append("cinemaName", cinemaName);
        formData.append("seatNumbers", seatNumbers);
        formData.append("review", review);
        formData.append("companions", companions);
        formData.append("file", file); // 파일 추가
        axios.post('http://localhost:8081/upload', formData)
            .then(res => {
                console.log(res);
                alert('영화가 추가되었습니다.')
                navigate('/movielist')
            })
            .catch(err => console.log(err));
    }

    return(
        <div className='add-user-container'>
            <form className='add-user-form' encType='multipart/form-data'>
                <h2>영화 추가</h2>
                <div className='form-group'>
                    <label>영화 제목</label>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='영화제목을 적어주세요'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>관람 날짜</label>
                    <input
                        type='datetime-local'
                        className='form-control'
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>영화관</label>
                    <input
                        type='text'
                        className='form-control'
                        onChange={(e) => setCinemaName(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='seat-number'>좌석번호</label>
                    <input
                        type='text'
                        id='seat-number'
                        className='form-control'
                        onChange={(e) => setSeatNumbers(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='confirm_password'>리뷰</label>
                    <input
                        type='Text'
                        id='review'
                        className='form-control'
                        onChange={(e) => setReview(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='companions'>같이 본 사람</label>
                    <input
                        type='Text'
                        id='companions'
                        className='form-control'
                        onChange={(e) => setCompanions(e.target.value)}
                    />
                </div>


                <div>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
                </div>

                <button type="button" onClick={handleUpload}>업로드</button>

                {/*<button type='submit' className='btn btn-success'>Submit</button>*/}
            </form>
        </div>
    );

}

export default CreateMovie;

