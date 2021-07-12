import React, { useState } from 'react';
import Header from '../components/Header';
// import ShareBtn from '../components/ShareBtn';
import BtnsFilters from '../components/BtnsFilters';
// import DoneAndFavorite from '../components/DoneAndFavorite';
import CardDoneRecipes from '../components/CardDoneRecipes';

export default function DoneRecipes() {
  const [value, setValue] = useState();

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
      <div>
        <BtnsFilters setValue={ setValue } />
      </div>
      <div className="recipe-cards" />
      {renderRecipe().map((item, index) => (
        <div key={ item.id }>
          <CardDoneRecipes item={ item } index={ index } />
          {/* <DoneAndFavorite item={ item } index={ index } />
          <div className="done-favorite-infos">

            Feita em:
            <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>

            <div className="tags">
              {(item.type === 'comida' ? item.tags.slice(0, 2) : item.tags).map((tag) => (
                <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
              ))}
            </div>
            <ShareBtn recipe={ item } index={ index } doneRecipe />
          </div> */}
        </div>
      ))}
    </div>
  );
}
