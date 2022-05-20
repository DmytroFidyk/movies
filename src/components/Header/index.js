import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1 className="header__title">Movies</h1>
            </div>
            <div className="buttons-container">
                <div className="search round">
                    <img id="search-icon" src="/images/icons/search.png" alt="Search icon"/>
                </div>
                <div className="favorites round">
                    <img id="favorites-icon" src="/images/icons/favorite.png" alt="Favorite icon"/>
                </div>
            </div>   
        </header>
    );
};

export default Header;