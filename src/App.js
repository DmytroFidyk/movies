import './App.css';


import Header from '../src/components/Header';
import Details from '../src/components/Details';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MovieList from '../src/components/MovieList';
import Favorites from '../src/components/Favorites';

const App = () => {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<MovieList />}/>
          <Route path="/details" element={<Details />}/>
          <Route path="/favorites" element={<Favorites />}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
