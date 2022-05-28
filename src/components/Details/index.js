import './Details.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Recommendations from '../Recommendations';

const Details = ({addToFavorites, removeFromFavorites}) => {
    const [ movie, setMovie ] = useState({});
    
    const location = useLocation();
    const movieId = location.state.movieId || localStorage.getItem('currentMovie');

    useEffect(() => {
        localStorage.setItem('currentMovie', movieId);
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=d7de2b3fba336e7ceb28c02600603538&language=en-US`)
            .then(response => response.json())
            .then(json => { 
                console.log(json);
                setMovie(json);
            });
    }, [movieId]);

    

    const path = `https://image.tmdb.org/t/p/w400${movie.poster_path}`;

    let genres;

    if (movie.genres) {
        genres = movie.genres.map(genre => <div key={genre.id} className="genre">{genre.name}</div>);
    }

    return (
        <>
            <div className="details__container">
                <div className="poster__container">
                    { movie.poster_path && <img id="details__poster" src={path} alt="Movie poster"/> }
                </div>
                <div className="text__container">
                    <h2>{ movie.title + ` (${ movie.release_date ? movie.release_date.slice(0, 4) : ''})`}</h2>
                    <div className="genres__container">
                        { genres }
                    </div>                    
                    <p>{ movie.overview }</p>
                </div>
            </div>
            <Recommendations movieId={movieId} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />
        </>
    );
};

export default Details;