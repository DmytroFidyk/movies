import './movie.css';

const Movie = ({ posterPath, genres }) => {
    return (
        <div className="movie__container">
            <div className="movie__poster">
                <img src={posterPath} alt="Movie poster"/>
            </div>
            <div className="movie__genres">{ genres }</div>
        </div>
    );
};

export default Movie;