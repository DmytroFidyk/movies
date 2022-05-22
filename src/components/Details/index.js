import './Details.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Details = () => {
    const [ movie, setMovie ] = useState('');
    const location = useLocation();
    const movieId = location.state.movieId;

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=d7de2b3fba336e7ceb28c02600603538&language=en-US`)
            .then(response => response.json())
            .then(json => { 
                console.log(json);
                setMovie(json);
            });
    }, []);

    const path = `https://image.tmdb.org/t/p/w400${movie.poster_path}`;

    return (
        <div className="details__container">
            
            <div className="poster__container">
                { movie.poster_path && <img src={path} alt="Movie poster"/> }
            </div>

            <div className="text__container">
                <h2>{ movie.title }</h2>
                <div className="genres__container">
                    <div className="genre">Action</div>
                    <div className="genre">Fantasy</div>
                    <div className="genre">Adventure</div>
                </div>                    
                <p>{ movie.overview }</p>
            </div>
        </div>
    );
};

export default Details;