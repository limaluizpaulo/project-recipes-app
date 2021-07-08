import React, { useState, useEffect } from 'react';
import shareIcon from '../images/shareIcon.svg';
import { getDonesRecipes } from '../services/localStorage';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

function RecipesMade() {
  const [dones, setDones] = useState();

  useEffect(() => {
    setDones(getDonesRecipes());
  }, []);

  const renderCards = () => dones.map((item, index) => {
    const { id, category, doneDate, name, tags, curry, image, area,
      alcoholicOrNot } = item;
    return (
      <div key={ `${index} - ${name}` }>
        <p>{tags}</p>
        <img data-testid={ `${index}-horizontal-image` } src={ image } alt="Receita" />
        <p data-testid={ `${index}-horizontal-top-text` }>
          {alcoholicOrNot || `${area} - ${category}`}
        </p>
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
        <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
        <p data-testid={ `${index}-Pasta-horizontal-tag` }>{tags}</p>
        <p data-testid={ `${index}-Curry-horizontal-tag` }>{curry}</p>
        <ShareButton
          id={ `${index}-horizontal-share-btn` }
          url={ `http://localhost:3000/comidas/${id}` }
          msgShare={
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="shareIcon"
            />
          }
        />
      </div>
    );
  });

  return (
    <div>
      Receitas feitas
      <Header title="Receitas Feitas" />
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn">
        Food
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>
      {dones && renderCards()}
    </div>
  );
}

export default RecipesMade;
