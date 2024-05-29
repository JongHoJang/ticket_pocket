import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MovieSearch from './MovieSearch';
import PlaceSearch from "./PlaceSearch";

function CreateMovie() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [cinemaName, setCinemaName] = useState('');
    const [seatNumbers, setSeatNumbers] = useState('');
    const [review, setReview] = useState('');
    const [companions, setCompanions] = useState('');
    const [posterUrl, setPosterUrl] = useState(''); // 포스터 URL 추가

    const navigate = useNavigate();

    const handleUpload = (e) => {
        e.preventDefault();
        const formData = {
            title: title,
            date: date,
            cinemaName: cinemaName,
            seatNumbers: seatNumbers,
            review: review,
            companions: companions,
            posterUrl: posterUrl // 포스터 URL 추가
        };

        axios.post('http://localhost:8081/upload', formData)
            .then(res => {
                console.log(res);
                alert('영화가 추가되었습니다.');
                navigate('/movielist');
            })
            .catch(err => console.log(err));
    };

    const handleMovieSelect = (movieTitle, movie) => {
        setTitle(movieTitle);
        setPosterUrl(movie.Poster); // 포스터 URL 설정
    };

    const handlePlaceSelection = (place) => { // 수정
        setCinemaName(place.place_name);
    };

    return (
        <div className='add-user-container'>
            <form className='add-user-form'>
                <h2>영화 추가</h2>

                {/* 영화 제목 */}
                <div className='form-group'>
                    {posterUrl && (
                        <div className='form-group'>
                            <img src={posterUrl} alt="Movie Poster" className='movie-poster'/>
                        </div>
                    )}

                    <label>영화 제목</label>
                    <MovieSearch
                        className='form-control'
                        placeholder='영화제목을 적어주세요'
                        onMovieSelect={handleMovieSelect}
                    />
                </div>

                {/* 관람 날짜 */}
                <div className='form-group'>
                    <label>관람 날짜</label>
                    <input
                        type='datetime-local'
                        className='form-control'
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                {/* 영화관 */}
                <div className='form-group'>
                    <label>영화관</label>
                    <PlaceSearch
                        className='form-control'
                        placeholder='장소를 검색하세요'
                        onPlaceSelect={handlePlaceSelection}
                    />
                </div>

                {/* 좌석 번호 */}
                <div className='form-group'>
                    <label htmlFor='seat-number'>좌석번호</label>
                    <input
                        type='text'
                        id='seat-number'
                        className='form-control'
                        onChange={(e) => setSeatNumbers(e.target.value)}
                    />
                </div>

                {/* 리뷰 */}
                <div className='form-group'>
                    <label htmlFor='review'>리뷰</label>
                    <input
                        type='text'
                        id='review'
                        className='form-control'
                        onChange={(e) => setReview(e.target.value)}
                    />
                </div>

                {/* 같이 본 사람 */}
                <div className='form-group'>
                    <label htmlFor='companions'>같이 본 사람</label>
                    <input
                        type='text'
                        id='companions'
                        className='form-control'
                        onChange={(e) => setCompanions(e.target.value)}
                    />
                </div>

                <button type="button" onClick={handleUpload}>업로드</button>
            </form>
        </div>
    );
}

export default CreateMovie;
