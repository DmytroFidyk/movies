import './MovieList.css';

import { useState, useEffect } from 'react';

import Movie from '../Movie';
import PageButton from '../PageButton';

const MovieList = ({ addToFavorites, removeFromFavorites }) => {
    const [ movies, setMovies ] = useState([]);
    const [ pageNumbers, setPageNumbers ] = useState(10);
    const [ currentPage, setCurrentPage ] = useState(1);

    console.log(currentPage);

    function changeCurrentPage(pageNumber) {  
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d7de2b3fba336e7ceb28c02600603538&page=${currentPage}`)
        .then(response => response.json())
        .then(json => {
            console.log(json.results);
            setMovies(json.results);
        });
    }, [currentPage]);

    const moviesList = movies.map(movie => {
        return (            
            <Movie 
                key={movie.id}
                movieId={movie.id} 
                title={movie.title} 
                posterPath={movie.poster_path} 
                genres={movie.genre_ids}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
            />            
        );
    });

    let paginationPageBlocks = [];
    let isCurrent = false;

    for (let i = 1; i <= pageNumbers; i++) {
        if (i === currentPage) {
            isCurrent = true;
        }
        else {
            isCurrent = false;
        }
        paginationPageBlocks.push(<PageButton key={i} pageNumber={i} isCurrent={isCurrent} changeCurrentPage={changeCurrentPage} />);
    }

    return (
        <>
            {/*<h2>Popular movies</h2>*/}
            <div className="movies__list">
                { moviesList }
            </div>
            <div className="pagination">
                { paginationPageBlocks }
            </div>
        </>
    );
};

export default MovieList;