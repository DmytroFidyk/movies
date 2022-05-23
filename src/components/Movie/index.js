import './Movie.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Movie = ({ movieId, title, posterPath, genres, route }) => {

    const [ isFavorite, changeIsFavorite ] = useState(false);

    const path = `https://image.tmdb.org/t/p/w200${posterPath}`;

    let iconPath = '/images/icons/favorite-icon.png';

    if (isFavorite)
        iconPath = '/images/icons/fill-favorite-icon.png';

    return (
        <div className="movie__container">   
            <div className="movie__poster">
                <img src={ path } alt="Movie poster"/>
                
            </div>
            
            <div className="movie__title__container">
                <h3 className="movie__title">{ title }</h3> 
                <div className="favorite__button round" onClick={() => changeIsFavorite(isFavorite => !isFavorite)}>
                    <img id="favorite__icon" src={iconPath} alt="Favorite icon"/>
                </div>   
            </div>
            
            <div className="movie__genres">Пригоди Фантастика{ /*genres*/ }</div>
        </div>
    );
};

export default Movie;