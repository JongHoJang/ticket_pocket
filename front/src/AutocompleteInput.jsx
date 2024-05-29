import React, {useEffect, useState} from 'react'
import MoviesList from "./MoviesList";
import SearchBox from "./SearchBox";
import axios from "axios";

// const apiKey = '59194452085a74c1cb8aae1c975a492a'; // 여기에 본인의 TMDB API 키를 넣어주세요.
// const totalPages = 10; // 가져올 총 페이지 수

const AutocompleteInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = async (event) => {
        const value = event.target.value;
        setInputValue(value);

        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=f618de14&s=${inputValue}`);

            const data = response.data;
            setSuggestions(data.results);
        } catch (error) {
            console.error('Error fetching autocomplete results:', error);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        setSuggestions([]);
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="검색어를 입력하세요"
            />
            <ul>
                {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AutocompleteInput;