import React from 'react';
import home from '../images/home.png';
import return0 from '../images/return0.png';
import '../styles/HomeAndReturn.css';

function HomeAndReturn() {
  return (
    <div className="homeAndReturn-footer-container">
      <div className="homeAndReturn-footer">
        <div>
          <a
            href="/comidas"
          >
            <img className="home-icon" src={ home } alt="drink icon" />
          </a>
        </div>
        <div>
          <button
            type="button"
            className="return-btn"
            onClick={ () => window.history.back() }
          >
            <img className="return-icon" src={ return0 } alt="drink icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeAndReturn;
