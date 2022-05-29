import './Recommendations.css';
import { useState, useEffect } from 'react';
import Movie from '../Movie';

const Recommendations = ({ movieId, allGenres, addToFavorites, removeFromFavorites }) => {
    const [ recommendations, setRecommendations ] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=d7de2b3fba336e7ceb28c02600603538&language=en-US&page=1`)
            .then(response => response.json())
            .then(json => { 
                console.log(json);
                setRecommendations(json.results);
                document.getElementById('recommendations__list').scrollTo(-1000, 0);
            });
    }, [movieId]);

    let recommendedMovies;

    if (recommendations) {
        recommendedMovies = recommendations.map(item => {
            return <Movie key={item.id} movieId={item.id} title={item.title} posterPath={item.poster_path} movieGenres={item.genre_ids} allGenres={allGenres} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites}/>
        });
    }
    else {
        return <div>Recommendations not found</div>
    }

    

    return (
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
    );
};

function moveLeft() {
    const list = document.getElementById('recommendations__list');
    list.scrollLeft -= 1000;
}

function moveRight() {
    const list = document.getElementById('recommendations__list');
    list.scrollLeft += 1000
}

export default Recommendations;