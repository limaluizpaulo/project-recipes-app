import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Explore(page).css';
import food from '../videos/food.mp4';
import drink from '../videos/drink.mp4';

function Explore() {
  return (
    <div>
      <Header title="Explorar" />
      <div className="explore-container">
        <div className="explore-videoAndBtn">
          <video
            src={ food }
            type="video/mp4"
            className="video"
            loop
            autoPlay
          >
            <track kind="captions" />
          </video>
          <Link to="/explorar/comidas" className="explore-food-container">
            <button
              type="button"
              data-testid="explore-food"
              className="explore-btn"
            >
              Explorar Comidas
            </button>
          </Link>
        </div>
        <div className="explore-videoAndBtn">
          <video
            src={ drink }
            type="video/mp4"
            className="video"
            loop
            autoPlay
          >
            <track kind="captions" />
          </video>
          <Link to="/explorar/bebidas" className="explore-drink-container">
            <button
              type="button"
              data-testid="explore-drinks"
              className="explore-btn"
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
