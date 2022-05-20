import './Details.css';
import { useLocation } from 'react-router-dom';

const Details = () => {
    const location = useLocation();
    const { movieId } = location.state;
    console.log(movieId);

    return (
        <div>
            <h2>Details</h2>
            <h2>{movieId}</h2>
        </div>
    );
};

export default Details;