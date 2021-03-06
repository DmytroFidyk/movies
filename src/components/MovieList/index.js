import './MovieList.css';

import { useState, useEffect } from 'react';

import Movie from '../Movie';
import PageButton from '../PageButton';

const MovieList = ({ genres, addToFavorites, removeFromFavorites }) => {
    const [ movies, setMovies ] = useState([]);
    const [ pageNumbers, setPageNumbers ] = useState(10);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ startPagination, setStartPagination ] = useState(1);

    function changeCurrentPage(pageNumber) {
        
        if (pageNumber >= pageNumbers) {
            setStartPagination(pageNumbers);
            setPageNumbers(pageNumbers => pageNumbers + 10);
        }
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
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
                movieGenres={movie.genre_ids}
                allGenres={genres}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
            />            
        );
    });

    let paginationPageBlocks = [];
    let isCurrent = false;

    for (let i = startPagination; i <= pageNumbers; i++) {
        if (i === currentPage) {
            isCurrent = true;
        } else {
            isCurrent = false;
        }
        
        paginationPageBlocks.push(<PageButton key={i} pageNumber={i} isCurrent={isCurrent} changeCurrentPage={changeCurrentPage} />);
    }

    function toPrevious() {
        if (currentPage > 1) {
            if (currentPage === startPagination) {
                setStartPagination(startPagination => startPagination - 1);
                setPageNumbers(pageNumbers => pageNumbers - 1);
            }
            setCurrentPage(currentPage => currentPage - 1);     
        }
        window.scrollTo(0, 0);
    }

    function toNext() {
        if (currentPage === pageNumbers) {
            setStartPagination(pageNumbers);
            setPageNumbers(pageNumbers => pageNumbers + 10);
            setCurrentPage(currentPage => currentPage + 1);
        } else {
            setCurrentPage(currentPage => currentPage + 1);
        }
                
        window.scrollTo(0, 0);
    }

    return (
        <>
            <div className="movies__list">
                { moviesList }
            </div>
            <div className="pagination">
                <div className="pagination__button" onClick={toPrevious}>Previous</div>
                { paginationPageBlocks }
                <div className="pagination__button" onClick={toNext}>Next</div>
            </div>
        </>
    );
};

export default MovieList;