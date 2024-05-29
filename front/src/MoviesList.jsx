import React from "react";
import './MoviesList.css';


const MoviesList = (props) => {
    return (
        <div className="movie-box">
            {props.movies.map((movie, index) => (
                <div key={index} className="movie-item">
                    {/*<img src={movie.Poster} alt={movie.Title}></img>*/}
                    <p>{movie.Title}</p>
                </div>
            ))}
        </div>
    )
}

export default MoviesList;
