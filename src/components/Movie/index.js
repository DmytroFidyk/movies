import './Movie.css';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Movie = ({ movieId, title, posterPath, movieGenres, allGenres, addToFavorites, removeFromFavorites }) => {
    const [ isFavorite, changeIsFavorite ] = useState(false);

    useEffect(() => {      
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        
        if (favorites.length > 0) {
            if (favorites.some(movie => movie.id === movieId)) {               
                changeIsFavorite(isFavorite => !isFavorite);
            } 
        }              
    }, []);

    let genreNames = [];
    let genresComponents;

    if (movieGenres && allGenres) {
        for (let i = 0; i < movieGenres.length; i++) {
            for (let j = 0; j < allGenres.length; j++) {
                if (movieGenres[i] === allGenres[j].id) {
                    genreNames.push(allGenres[j]);
                    continue;
                }       
            }
        }

        if (genreNames) {
            genresComponents = genreNames.map(genre => <div key={genre.id} className="genre">{genre.name}</div>);
        }
    }

    let iconPath = '/images/icons/favorite-icon.png';

    if (isFavorite) {
        iconPath = '/images/icons/fill-favorite-icon.png';
    } else {
        iconPath = '/images/icons/favorite-icon.png';
    }

    const path = `https://image.tmdb.org/t/p/w200${posterPath}`;

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
                <div className="favorite__button" onClick={() => {
                    if (isFavorite === false) {
                        addToFavorites(movie);
                        changeIsFavorite(isFavorite => !isFavorite);
                    }
                    else {
                        removeFromFavorites(movie);
                        changeIsFavorite(isFavorite => !isFavorite);
                    }                    
                }}> 
                    <img id="favorite__icon" src={iconPath} alt="Favorite icon"/>
                </div>   
            </div>            
            <div className="movie__genres">{ genresComponents }</div>
        </div>
    );
};

export default Movie;