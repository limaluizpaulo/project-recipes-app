import React, { useState } from 'react';
// import { useHistory } from 'react-router';
// import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareBtn from '../components/ShareBtn';
import BtnsFilters from '../components/BtnsFilters';
import DoneAndFavorite from '../components/DoneAndFavorite';

export default function DoneRecipes() {
  const [value, setValue] = useState();
  // const { pathname } = useHistory().location;

  let recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!recipes) recipes = [];

  const renderRecipe = () => {
    if (value === 'All') return recipes;
    if (value === 'Food') return recipes.filter((recipe) => recipe.type === 'comida');
    if (value === 'Drinks') return recipes.filter((recipe) => recipe.type === 'bebida');

    return recipes;
  };

  return (
    <div>
      <Header title="Receitas Feitas" />
      <div className="btns-filters">
        <BtnsFilters setValue={ setValue } />
      </div>
      <div className="recipe-cards" />
      {renderRecipe().map((item, index) => (
        <div key={ item.id }>
          <DoneAndFavorite item={ item } index={ index } />
          <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
          <div className="tags">
            {(item.type === 'comida' ? item.tags.slice(0, 2) : item.tags).map((tag) => (
              <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
            ))}
          </div>
          <ShareBtn recipe={ item } index={ index } doneRecipe />
        </div>
      ))}
    </div>
  );
}
