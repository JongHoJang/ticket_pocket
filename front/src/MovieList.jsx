import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './MovieList.css'

function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/movielist')
            .then(res => {
                setMovies(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='movie-list-container'>
            <h2>영화 리스트</h2>
            <div className='add-movie-btn'>
                <Link to="/createmovie">영화 추가하기</Link>
            </div>
            <div className='movie-list'>
                {movies.map((movie, index) => (
                    <div className='movie-card' key={index}>
                        <img className='poster-size' src={movie.MoviePoster} alt={movie.Title}/>
                        <h3>{movie.Title}</h3>
                        <p>{movie.Date}</p>
                        <p>{movie.CinemaName}</p>
                        <p>{movie.SeatNumbers}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieList;
