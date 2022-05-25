import React from 'react';
import './Favorites.css';
import { useState, useEffect } from 'react';
import Movie from '../Movie';

const Favorites = ({favorites, addToFavorites, removeFromFavorites}) => {
   

    const favoritesMovies = favorites.map(movie => {
        return <Movie key={movie.id} movieId={movie.id} title={movie.title} posterPath={movie.poster} favorite={movie.isFavorite} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites}/>
    });

    return (
        <div className="favorites__container">            
            <div className="favorites__title">
                <h1>Favorites</h1>
            </div>
            <div className="favorites__list">
                {favoritesMovies}
            </div>
        </div>
    );
};

export default Favorites;