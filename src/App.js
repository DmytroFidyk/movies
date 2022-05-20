import './App.css';
import { useState, useEffect } from 'react';
import Movie from '../src/components/Movie';

const App = () => {
  const [ movies, setMovies ] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=d7de2b3fba336e7ceb28c02600603538')
      .then(response => response.json())
      .then(json => {
        console.log(json.results);
        setMovies(json.results);
      });
  }, []);

  const moviesList = movies.map(movie => {
     return <Movie key={movie.id} title={movie.title} posterPath={movie.poster_path} genres={movie.genre_ids}/>;
  });

  return (
    <div className="wrapper">
      <header className="header">
        <h1 className="header__title">Movies</h1>
      </header>
      <div className="movies__list">
          { moviesList }
      </div>
    </div>
  );
};

export default App;
