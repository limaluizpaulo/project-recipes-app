import React, { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import { getDrinkRecipes } from '../services';

const SIX = 6;

function RecDrinks() {
  const [recDrinks, setRecDrinks] = useState([]);
  const [idxImage, setIdxImage] = useState(0);
  const [renderCarousel, setRenderCarousel] = useState(false);

  useEffect(() => {
    const fetchRecDrinks = async () => {
      const drink = await getDrinkRecipes();
      setRecDrinks(drink.slice(0, SIX));
      setRenderCarousel(true);
    };
    fetchRecDrinks();
  }, []);

  function renderImages() {
    if (renderCarousel) {
      return (
        <>
          <section>
            <img
              data-testid={ `${idxImage}-recomendation-card` }
              src={ recDrinks[idxImage].strDrinkThumb }
              alt={ recDrinks[idxImage].strDrink }
            />
            <h4 data-testid={ `${idxImage}-recomendation-title` }>{recDrinks[idxImage].strDrink}</h4>
          </section>
          <section>
            <img
              data-testid={ `${idxImage + 1}-recomendation-card` }
              src={ recDrinks[idxImage + 1].strDrinkThumb }
              alt={ recDrinks[idxImage + 1].strDrink }
            />
            <h4 data-testid={ `${idxImage + 1}-recomendation-title` }>{recDrinks[idxImage + 1].strDrink}</h4>
          </section>
        </>
      );
    }
  }

  function incrementIdxCarousel() {
    if (idxImage >= 4) {
      setRenderCarousel(false);
      setIdxImage(0);
    } else {
      setIdxImage((oldState) => oldState + 2);
    }
    setRenderCarousel(true);
  }

  function decrementIdxCarousel() {
    if (idxImage < 2) {
      setRenderCarousel(false);
      setIdxImage(4);
    } else {
      setIdxImage((oldState) => oldState - 2);
    }
    setRenderCarousel(true);
  }

  return (
    <>
      <span>Pratos recomendados</span>
      <button type="button" onClick={ () => decrementIdxCarousel() }>
        diminui
      </button>
      {
        renderImages()
      }
      <button type="button" onClick={ () => incrementIdxCarousel() }>
        aumenta
      </button>
    </>
  );
}

export default RecDrinks;
