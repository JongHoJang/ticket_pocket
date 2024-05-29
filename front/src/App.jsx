import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
// import Home from './Home'
import Header from "./Header";
import Signup from "./Signup";
import Read from "./Read";
import Update from "./Update";
import Login from "./Login";
import MovieList from "./MovieList";
import CreateMovie from "./CreateMovie"
import Footer from "./Footer";
import MovieSearch from "./MovieSearch";
import PlaceSearch from "./PlaceSearch";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                {/*<Route path='/' element={<Home />} />*/}
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/read/:id' element={<Read/>}/>
                <Route path='/edit/:id' element={<Update/>}/>
                <Route path='/movielist' element={<MovieList/>}/>
                <Route path='/createmovie' element={<CreateMovie/>}/>
                <Route path='/moviesearch' element={<MovieSearch/>}/>
                <Route path='/placesearch' element={<PlaceSearch/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
