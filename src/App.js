import './App.css';


import Header from '../src/components/Header';
import Details from '../src/components/Details';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MovieList from '../src/components/MovieList';

const App = () => {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<MovieList />}/>
          <Route path="/details" element={<Details />}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
