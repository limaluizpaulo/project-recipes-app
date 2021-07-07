import React, { useState, useContext } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import { getStorageRecipe } from '../services/localStorage';
import Header from '../components/Header';

import { GlobalContext } from '../context/Provider';

function RecipesMade() {
  // const { } = useContext(GlobalContext);

  const [msgCopy, setMsgCopy] = useState(false);

  const history = useHistory();

  console.log(localStorage.inProgressRecipes);

  const findIndex = JSON.parse(localStorage.inProgressRecipes);

  const index = findIndex.filter();

  // const index = updateStorageRecipe.filter();
  return (
    <div>
      <Header title="Receitas Feitas" />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      <img data-testid="${index}-horizontal-image" alt="Receita" />
      <p data-testid="${index}-horizontal-top-text">Categoria</p>
      <p data-testid="${index}-horizontal-name">Nome</p>
      <p data-testid="${index}-horizontal-done-date">Data</p>
      <tag data-testid="${index}-${tagName}-horizontal-tag" />
      <button
        onClick={ () => copy(`http://localhost:3000${history.location.pathname}`).then(() => {
          setMsgCopy(true);
        }) }
        type="button"
        data-testid="share-btn"
      >
        {msgCopy ? 'Link copiado!' : 'Compartilhar'}
      </button>
    </div>
  );
}

export default RecipesMade;
