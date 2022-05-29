import React from 'react';
import './Favorites.css';
import Movie from '../Movie';

const Favorites = ({favorites, addToFavorites, removeFromFavorites}) => {
    let favoritesMovies;

    if (favorites.length > 0) {
        favoritesMovies = favorites.map(movie => {
            return <Movie key={movie.id} movieId={movie.id} title={movie.title} posterPath={movie.poster} favorite={movie.isFavorite} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites}/>
        });
    } else {
        favoritesMovies = <div className="placeholder__container"><h3 className="favorites__placeholder">Favorites list is empty</h3></div>;
    }
    
    return (
        <>
            <div className="favorites__list">
                {favoritesMovies}
            </div>
        </>    
    );
};

export default Favorites;