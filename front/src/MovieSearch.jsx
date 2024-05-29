import React, {useEffect, useState} from 'react'
import "./MoviesList.css"

// const apiKey = '59194452085a74c1cb8aae1c975a492a';
// const totalPages = 10; // 가져올 총 페이지 수

const MovieSearch = ({onMovieSelect}) => {
    const [movies, setMovies] = useState([]);  // API에서 가지고온 영화 목록 저장하는 배열
    const [searchValue, setSearchValue] = useState('')  // 검색 필드에 값이 저장
    const [showMoviesList, setShowMoviesList] = useState(false); // 영화 리스트를 표시할지 여부
    const [movieSelected, setMovieSelected] = useState(false); // 영화가 선택되었는지 여부


    //  searchValue를 기반으로 OMDB API에서 영화를 검색
    const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?apikey=f618de14&s=${searchValue}`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {  // 영화가 발견되면
            console.log(responseJson);
            setMovies(responseJson.Search)  // Movie 변수를 업데이트
            setShowMoviesList(true); // 검색된 영화 리스트 보여줌
        }
    }

    // 검색필드에 입력값이 변경될때 마다 호출
    const handleChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        setMovieSelected(false); // 영화가 선택되지 않은 상태로 설정
        if (value !== '') {
            setMovies([]);
            setShowMoviesList(true); // 검색어가 있을 때만 영화 리스트를 보여줌
        } else {
            setShowMoviesList(false); // 검색어가 없으면 영화 리스트를 숨김
        }
    };

    useEffect(() => {
        if (searchValue && !movieSelected) {
            getMovieRequest(searchValue);
        }
    }, [searchValue, movieSelected]);

    const handleMovieClick = (movie) => {
        setSearchValue(movie.Title);
        setShowMoviesList(false); // 영화가 선택되면 영화 리스트를 숨김
        setMovieSelected(true); // 영화가 선택된 상태로 설정
        onMovieSelect(movie.Title, movie);  // movie 객체를 전체 전달
    };

    return (
        <div>
            <div>
                <input
                    className='form-control'
                    value={searchValue}
                    onChange={handleChange}
                    placeholder="영화제목을 검색하세요"
                />
            </div>

            {showMoviesList && (
                <div className="movie-container">
                    {movies.map((movie, index) => (
                        <div
                            key={index}
                            className="movie-item"
                            onClick={() => handleMovieClick(movie)}
                        >
                            <img src={movie.Poster} alt={movie.Title}/>
                            <p className="movie-sub">{movie.Title} ({movie.Year})</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


export default MovieSearch;