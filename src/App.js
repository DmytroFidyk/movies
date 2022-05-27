import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css';

import Header from '../src/components/Header';
import MovieList from '../src/components/MovieList';
import Favorites from '../src/components/Favorites';
import Details from '../src/components/Details';

const App = () => {
  const [ favorites, setFavorites ] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [ genres, setGenres ] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=d7de2b3fba336e7ceb28c02600603538&language=en-US`)
        .then(response => response.json())
        .then(json => {
            console.log(json.genres);
            setGenres(json.genres);
        });
}, []);

  console.log(favorites);

  function addToFavorites(movie) {
      setFavorites([...favorites, movie]);
  }

  function removeFromFavorites(movie) {
      const filteredFavoriter = favorites.filter(item => item.id !== movie.id);
      setFavorites(filteredFavoriter);
  }

  useEffect(() => {
      localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      <Router>
        <Header genres={genres}/>
        <Routes>
          <Route path="/" element={<MovieList genres={genres} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites}/>}/>
          <Route path="/details" element={<Details addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites}/>}/>
          <Route path="/favorites" element={<Favorites favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites}/>}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
