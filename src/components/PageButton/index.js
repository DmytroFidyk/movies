import './PageButton.css';
import { useState } from 'react';

const PageButton = ({ pageNumber, isCurrent, changeCurrentPage }) => {   
    return (
        <div className={ isCurrent ? "page__button current" : "page__button"} onClick={() => { 
            changeCurrentPage(pageNumber)
        }}>
            {pageNumber}
        </div>
    );
};

export default PageButton;