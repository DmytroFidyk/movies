import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1 className="header__title">Movies</h1>
            </div>
            <nav className="navigation__container">
                <div className="buttons-container">
                    <div className="search round">
                        <img id="search-icon" src="/images/icons/search.png" alt="Search icon"/>
                    </div>
                </div>
                <div className="menu__container">
                    <ul className="menu">
                        <Link to="/" className="menu__link">
                            <li className="menu__item">Popular</li>
                        </Link>
                        <Link to="/favorites" className="menu__link">
                            <li className="menu__item">Favorites</li>
                        </Link>                   
                    </ul>
                </div>
            </nav>  
        </header>
    );
};

export default Header;