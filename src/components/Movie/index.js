import './Movie.css';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Movie = ({ movieId, title, posterPath, genres, addToFavorites, removeFromFavorites }) => {

    const [ isFavorite, changeIsFavorite ] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites'));

        if (favorites) {
            if (favorites.some(movie => movie.id === movieId)) 
                changeIsFavorite(true);
            else
                changeIsFavorite(false);        
        }              
    }, []);

    const path = `https://image.tmdb.org/t/p/w200${posterPath}`;

    let iconPath = '/images/icons/favorite-icon.png';

    if (isFavorite)
        iconPath = '/images/icons/fill-favorite-icon.png';

    const movie = {
        id: movieId,
        title: title,
        poster: posterPath,
        isFavorite: isFavorite
    };

    return (
        <div className="movie__container">
            <Link to="/details" state={{ movieId: movieId }}>
                <div className="movie__poster">
                    <img src={ path } alt="Movie poster"/>               
                </div>
            </Link>                    
            <div className="movie__title__container">
                <h3 className="movie__title">{ title }</h3> 
                <div className="favorite__button round" onClick={() => {
                    if (isFavorite === false) {
                        addToFavorites(movie);
                        changeIsFavorite(true);
                    }
                    else {
                        removeFromFavorites(movie);
                        changeIsFavorite(false);
                    }
                    
                }}> 
                    <img id="favorite__icon" src={iconPath} alt="Favorite icon"/>
                </div>   
            </div>            
            <div className="movie__genres">Пригоди Фантастика{ /*genres*/ }</div>
        </div>
    );
};

export default Movie;