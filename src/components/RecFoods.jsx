import React, { useState, useEffect } from 'react';
import { getFoodRecipes } from '../services';

const SIX = 6;

function RecFoods() {
  const [recFoods, setRecFoods] = useState([]);
  const [idxImage, setIdxImage] = useState(0);
  const [renderCarousel, setRenderCarousel] = useState(false);

  useEffect(() => {
    const fetchRecFoods = async () => {
      const meal = await getFoodRecipes();
      setRecFoods(meal.slice(0, SIX));
      setRenderCarousel(true);
    };
    fetchRecFoods();
  }, []);
  console.log(recFoods);

  function renderImages() {
    if (renderCarousel) {
      return (
        <>
          <section>
            <img
              data-testid={ `${idxImage}-recomendation-card` }
              src={ recFoods[idxImage].strMealThumb }
              alt={ recFoods[idxImage].strMeal }
            />
            <h4 data-testid={ `${idxImage}-recomendation-title` }>{recFoods[idxImage].strMeal}</h4>
          </section>
          <section>
            <img
              data-testid={ `${idxImage + 1}-recomendation-card` }
              src={ recFoods[idxImage + 1].strMealThumb }
              alt={ recFoods[idxImage + 1].strMeal }
            />
            <h4 data-testid={ `${idxImage + 1}-recomendation-title` }>{recFoods[idxImage + 1].strMeal}</h4>
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

export default RecFoods;
