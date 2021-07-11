import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/global.css';
import food from '../videos/food.mp4';
import drink from '../videos/drink.mp4';

function Explore() {
  return (
    <div>
      <Header title="Explorar" />
      <div className="videoAndBtn-container">
        <div className="videoAndBtn">
          <video
            src={ food }
            type="video/mp4"
            className="video"
            loop
            autoPlay
          >
            <track kind="captions" />
          </video>
          <Link to="/explorar/comidas" className="btnContainer">
            <button
              type="button"
              data-testid="explore-food"
              className="exploreFoodAndDrink"
            >
              Explorar Comidas
            </button>
          </Link>
        </div>
        <div className="videoAndBtn">
          <video
            src={ drink }
            type="video/mp4"
            className="video"
            loop
            autoPlay
          >
            <track kind="captions" />
          </video>
          <Link to="/explorar/bebidas" className="btnContainer">
            <button
              type="button"
              data-testid="explore-drinks"
              className="exploreFoodAndDrink"
            >
              Explorar Bebidas
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
