import './Details.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Recommendations from '../Recommendations';

const Details = ({ allGenres, addToFavorites, removeFromFavorites}) => {
    const [ movie, setMovie ] = useState({});
    
    const location = useLocation();
    const movieId = location.state.movieId || localStorage.getItem('currentMovie');

    window.scrollTo(0, 0);
    useEffect(() => {
        localStorage.setItem('currentMovie', movieId);
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=d7de2b3fba336e7ceb28c02600603538&language=en-US`)
            .then(response => response.json())
            .then(json => { 
                console.log(json);
                setMovie(json);
            });
    }, [movieId]);

    const [ isFavorite, changeIsFavorite ] = useState(false);

    useEffect(() => {      
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        
        if (favorites.length > 0) {
            if (favorites.some(movie => movie.id === movieId)) {               
                changeIsFavorite(isFavorite => !isFavorite);
            } 
        }              
    }, []);

    let iconPath = '/images/icons/favorite-icon.png';

    if (isFavorite) {
        iconPath = '/images/icons/fill-favorite-icon.png';
    } else {
        iconPath = '/images/icons/favorite-icon.png';
    }


    const path = `https://image.tmdb.org/t/p/w400${movie.poster_path}`;

    let genres;

    if (movie.genres) {
        genres = movie.genres.map(genre => <div key={genre.id} className="genre">{genre.name}</div>);
    }

    let languages;

    if (movie.spoken_languages) {
        languages = movie.spoken_languages.map(language => {
            return <span key={language.name} className="language">{language.english_name}</span>;
        });
    }

    let countries;

    if (movie.production_countries) {
        countries = movie.production_countries.map(country => {
            return <span key={country.name} className="country">{country.name}</span>;
        });
    }
     
    return (
        <>
            <div className="details__container">
                <div className="poster__container">
                    { movie.poster_path && <img id="details__poster" src={path} alt="Movie poster"/> }
                </div>
                <div className="text__container">
                    <div className="title__container details__title">
                        <h2>{ movie.title + ` (${ movie.release_date ? movie.release_date.slice(0, 4) : ''})`}</h2>
                        <div className="favorite__button" onClick={() => {
                            if (isFavorite === false) {   
                                addToFavorites(movie);    
                            }
                            else {
                                removeFromFavorites(movie);
                            }         
                            changeIsFavorite(isFavorite => !isFavorite);           
                        }}> 
                            <img id="favorite__icon__details" src={iconPath} alt="Favorite icon"/>
                        </div>
                    </div>
                    
                    <div className="genres__container">
                        { genres }
                    </div>                    
                    <div><p>{ movie.overview }</p></div>
                    <div className="status__container">
                       Status: {movie.status}
                    </div>
                    <div className="languages__container">
                       Spoken languages: {languages}
                    </div>
                    <div className="countries__container">
                       Production countries: {countries}
                    </div>
                    <div className="popularity__container">
                       Popularity: {movie.popularity}
                    </div>
                    <div className="votes__container">
                       Vote average: {movie.vote_average}
                    </div>
                </div>
            </div>
            <Recommendations 
                movieId={movieId} 
                allGenres={allGenres} 
                addToFavorites={addToFavorites} 
                removeFromFavorites={removeFromFavorites} 
            />
        </>
    );
};

export default Details;