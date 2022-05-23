import './Movie.css';

const Movie = ({ title, posterPath, genres }) => {

    const path = `https://image.tmdb.org/t/p/w200${posterPath}`;

    return (
        <div className="movie__container">   
            <div className="movie__poster">
                <img src={ path } alt="Movie poster"/>
                <div className="overlay">
                    <h3>Детальніше</h3>
                </div>
            </div>
            
            <div className="movie__title__container">
                <h3 className="movie__title">{ title }</h3>    
            </div>
            <div className="movie__genres">Пригоди Фантастика{ /*genres*/ }</div>
        </div>
    );
};

export default Movie;