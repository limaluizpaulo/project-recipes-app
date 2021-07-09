import React from 'react';
import home from '../images/home.png';
import return0 from '../images/return0.png';
import '../styles/global.css';

function HomeAndReturn() {
  return (
    <div className="footer-container">
      <div className="homeAndReturnFooter">
        <div>
          <a
            href="/comidas"
          >
            <img className="homeIcon" src={ home } alt="drink icon" />
          </a>
        </div>
        <div>
          <button
            type="button"
            className="returnBtn"
            onClick={ () => window.history.back() }
          >
            <img className="returnIcon" src={ return0 } alt="drink icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeAndReturn;
