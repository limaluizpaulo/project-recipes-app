import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { getDonesRecipes } from '../services/localStorage';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function RecipesMade() {
  const [dones, setDones] = useState();

  useEffect(() => {
    setDones(getDonesRecipes());
  }, []);

  const renderCards = () => dones.map((item, index) => {
    const { id, category, doneDate, name, tags, curry, image, area } = item;
    return (
      <div key={ `${index} - ${name}` }>
        <p>{tags}</p>
        <img data-testid={ `${index}-horizontal-image` } src={ image } alt="Receita" />
        <p data-testid={ `${index}-horizontal-top-text` }>{`${area} - ${category}`}</p>
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
        <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
        <p data-testid={ `${index}-Pasta-horizontal-tag` }>{tags}</p>
        <p data-testid={ `${index}-Curry-horizontal-tag` }>{curry}</p>
        <button
          onClick={ () => copy(`http://localhost:3000/comidas/${id}`) }
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
        >
          <img src={ shareIcon } alt="shareIcon" />
        </button>
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
