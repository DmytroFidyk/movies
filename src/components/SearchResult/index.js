import './SearchResult.css';
import { Link } from 'react-router-dom';

const SearchResult = ({ id, posterPath, title, releaseDate }) => {
    if (posterPath !== null)
        posterPath = `https://image.tmdb.org/t/p/w200${posterPath}`;

    return (
        <Link to="/details" state={{ movieId: id }} className="link">
            <div className="search__result">
                <div className="poster__container">
                    <img src={posterPath} alt="Movie poster"/>
                </div>
                <div className="text__container">
                    <div className="title__container">
                        <h3 className="movie__title">{title}</h3>
                    </div>
                    
                    <span>{}</span>
                </div>
            </div>
        </Link>       
    );
};

export default SearchResult;