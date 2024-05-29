import React, {useEffect, useState} from 'react'

const apiKey = '59194452085a74c1cb8aae1c975a492a'; // 여기에 본인의 TMDB API 키를 넣어주세요.
const totalPages = 500; // 가져올 총 페이지 수

function MovieSearch() {
    const [movieList, setMovieList] = useState([]);
    const [search, setSearch] = useState("");
    const [filterTitle, setFilterTitle] = useState([]);

    useEffect(() => {
        // 페이지당 영화 가져오는 함수
        const fetchMoviesByPage = async (page) => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&region=KR&language=ko&page=${page}`);
                const data = await response.json();
                return data.results;
            } catch (error) {
                console.error('Error fetching movies:', error);
                return [];
            }
        };

        // 모든 페이지의 영화를 가져오고 movieList에 저장
        const fetchAllMovies = async () => {
            let allMovies = [];
            for (let page = 1; page <= totalPages; page++) {
                const movies = await fetchMoviesByPage(page);
                allMovies = [...allMovies, ...movies];
            }
            const uniqueMovies = allMovies.filter((movie, index, self) =>
                index === self.findIndex((m) => m.id === movie.id)
            );
            setMovieList(uniqueMovies);

            console.log(allMovies)
        };

        fetchAllMovies().then(uniqueMovies => {
            console.log(uniqueMovies); // 결과 출력
        });
    }, []); // 페이지가 변경되지 않으므로 빈 배열을 두어 한 번만 호출되도록 설정


    const onChange = (e) => {
        const {value} = e.target;
        setSearch(value);

        // 입력된 값에 따라 filterTitle 업데이트
        if (value === "") {
            setFilterTitle([]); // 검색어가 비어있으면 빈 배열로 설정하여 아무것도 보여주지 않음
        } else {
            const filteredMovies = movieList.filter(movie =>
                movie.title.toLowerCase().replace(" ", "").includes(value.toLowerCase().replace(" ", ""))
            );
            setFilterTitle(filteredMovies);
        }
    };

    return (
        <div>
            <input type="text" value={search} onChange={onChange} placeholder="검색..."/>
            {/* 검색된 영화 목록 출력 */}
            <div>
                {filterTitle.map(movie => <div key={movie.id}>
                    <span>{movie.title}</span>
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}/></div>)}
            </div>
        </div>
    );
}

export default MovieSearch;