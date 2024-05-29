import React, { useEffect, useState } from 'react';
import "./MoviesList.css"

const { kakao } = window;

const PlaceSearch = ({onPlaceSelect}) => {
    const [places, setPlaces] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [selectedPlace, setSelectedPlace] = useState(null);


    const getPlaceRequest = () => {
        if (!keyword.trim()) {
            alert('키워드를 입력해주세요!');
            return;
        }

        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(keyword, (data, status, pagination) => {
            if (status === kakao.maps.services.Status.OK) {
                // 영화관 카테고리인 CT1에 해당하는 장소만 필터링
                const movieTheaters = data.filter(place => place.category_group_code === 'CT1');
                setPlaces(movieTheaters);
            } else {
                alert('검색 결과가 없습니다.');
            }
        }, {
            category_group_code: 'CT1'
        });
    };

    const handlePlaceSelection = (place) => {
        setSelectedPlace(place);
        setKeyword(place.place_name); // 선택된 장소의 이름을 input 창에 표시
        setPlaces([]); // 검색 결과를 비워줌
        onPlaceSelect(place);
    };

    return (
        <div>
            <div style={{marginBottom: '20px'}}>
                <input
                    className='form-control'
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="장소를 검색하세요"
                />
                <button type="button" onClick={getPlaceRequest}>검색</button>
            </div>
            <div className="movie-item">
                {places.map((place) => (
                    <div key={place.id} onClick={() => handlePlaceSelection(place)}>{place.place_name}</div>
                ))}
            </div>
        </div>
    );
};

export default PlaceSearch;
