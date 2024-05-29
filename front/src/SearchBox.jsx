import React from "react";
import './Signup.css';

const SearchBox = (props) => {
    return (
        <div>
            <input className='form-control'
            value={props.value}
                   onChange={(e) => props.setSearchValue(e.target.value)}
            placeholder="영화제목을 검색하세요"
            />
        </div>
    )
}

export default SearchBox;
