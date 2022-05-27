import './Search.css';
import { useState, useEffect } from 'react';
import SearchResult from '../SearchResult';

const Search = ({ genres }) => {
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ searchResults, setSearchResults ] = useState([]);
    const [ isDisplayed, setDisplayed ] = useState(false);

    useEffect(() => {
        if (searchQuery !== '') {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=d7de2b3fba336e7ceb28c02600603538`)
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    setSearchResults(json.results);                  
                });
                document.getElementById('search__results').style.visibility = 'visible';
        }
        else {
            setSearchResults([]);
            document.getElementById('search__results').style.visibility = 'hidden';
        }
    }, [searchQuery]);

    function handleChange(event) {
        setSearchQuery(event.target.value);
    }

    console.log(searchQuery);

    function changeDisplayingSearchField() {
        const searchInput = document.getElementById('search__input');

        if (!isDisplayed) {
            searchInput.style.width = '360px';
            searchInput.style.border = '1px solid white';
            searchInput.style.padding = '0px 20px';
            setDisplayed(isDisplayed => !isDisplayed);
        } else {
            searchInput.style.width = '0px';
            searchInput.style.border = 'none';
            searchInput.style.padding = '0px';
            searchInput.value = '';
            setDisplayed(isDisplayed => !isDisplayed);
        }
    }

    const searchMoviesResults = searchResults.map(movie => {
        return (
            <SearchResult key={movie.id} id={movie.id} posterPath={movie.poster_path} title={movie.title} releaseDate={movie.release_date}/>
        );
    });

    return (
        <div className="search__container">
            <div className="search__input__container">
                <input
                    id="search__input"
                    className="search__input" 
                    name="search" 
                    placeholder="Search" 
                    onChange={handleChange}
                />
                <div className="search__icon__container round" onClick={changeDisplayingSearchField}>
                    <img id="search-icon" src="/images/icons/search.png" alt="Search icon"/>
                </div>
            </div>          
            <div id="search__results" className="search__results">
                {searchMoviesResults.length > 0 ? searchMoviesResults : <div className="no-results">Nothing found</div>}
            </div>
        </div>
    );
};

export default Search;