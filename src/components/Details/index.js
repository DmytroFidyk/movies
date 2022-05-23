import './Details.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Movie from '../Movie';

const Details = () => {
    const [ movie, setMovie ] = useState('');
    const [ recommendations, setRecommendations ] = useState([]);
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

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=d7de2b3fba336e7ceb28c02600603538&language=en-US&page=1`)
            .then(response => response.json())
            .then(json => { 
                console.log(json);
                setRecommendations(json.results);
            });
    }, []);

    const path = `https://image.tmdb.org/t/p/w400${movie.poster_path}`;

    let genres;

    if (movie.genres) {
        genres = movie.genres.map(genre => <div key={genre.id} className="genre">{genre.name}</div>);
    }

    let recommendedMovies;

    if (recommendations.length !== 0) {
        recommendedMovies = recommendations.map(item => {
            return <Movie key={item.id} title={item.title} posterPath={item.poster_path} genres={item.genre_ids}/>
        });
    }

    function moveLeft() {
        const list = document.getElementById('recommendations__list');
        list.scrollLeft -= 1000;
    }

    function moveRight() {
        const list = document.getElementById('recommendations__list');
        list.scrollLeft += 1000
    }

    return (
        <>
        <div className="details__container">
            <div className="poster__container">
                { movie.poster_path && <img src={path} alt="Movie poster"/> }
            </div>
            <div className="text__container">
                <h2>{ movie.title + ` (${ movie.release_date ? movie.release_date.slice(0, 4) : ''})`}</h2>
                <div className="genres__container">
                    { genres }
                </div>                    
                <p>{ movie.overview }</p>
            </div>
        </div>
        <div className="recommendations">
            <div className="recommendations__header">
                <h2>Recommendations</h2>
                <div className="controls__container">
                    <div className="round" onClick={moveLeft}>
                        <img className="arrow-icon left" src="/images/icons/arrow.png" alt="Left arrow"/>
                    </div>
                    <div className="round" onClick={moveRight}>
                        <img className="arrow-icon right" src="/images/icons/arrow.png" alt="Right arrow"/>
                    </div>
                </div>
            </div>
                
                
                
            
            <div id="recommendations__list" className="recommendations__list">
                { recommendedMovies }
            </div>
            
        </div>
        </>
    );
};

export default Details;