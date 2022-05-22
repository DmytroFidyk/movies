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
            </div>   
        </header>
    );
};

export default Header;