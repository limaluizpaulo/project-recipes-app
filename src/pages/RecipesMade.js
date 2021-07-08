import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import { getDonesRecipes } from '../services/localStorage';
import Header from '../components/Header';

function RecipesMade() {
  const [msgCopy, setMsgCopy] = useState(false);
  const [dones, setDones] = useState();
  const history = useHistory();

  useEffect(() => {
    setDones(getDonesRecipes());
  }, []);

  const renderCards = () => dones && dones.map((item, index) => {
    const { category, doneDate, name, strTags, image } = item;
    return (
      <div key={ `${index} - ${name}` }>
        <img data-testid={ `${index}-horizontal-image` } src={ image } alt="Receita" />
        <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
        <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
        <p data-testid={ `${index}-${strTags}-Pasta-horizontal-tag` }>{strTags}</p>
      </div>);
  });

  return (
    <div>
      Receitas feitas
      <Header title="Receitas Feitas" />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      {renderCards()}
      <button
        onClick={ () => copy(`http://localhost:3000${history.location.pathname}`).then(() => {
          setMsgCopy(true);
        }) }
        type="button"
        data-testid="0-horizontal-share-btn"
      >
        {msgCopy ? 'Link copiado!' : 'Compartilhar'}
      </button>
      <div>
        <img data-testid="0-horizontal-image" src="" alt="Receita" />
        <p data-testid="0-horizontal-top-text">0</p>
        <p data-testid="0-horizontal-name">0</p>
        <p data-testid="0-horizontal-done-date">0</p>
        <p data-testid="0-Pasta-horizontal-tag  ">0</p>
      </div>
      <div>
        <img data-testid="1-horizontal-image" src="" alt="Receita" />
        <p data-testid="1-horizontal-top-text">0</p>
        <p data-testid="1-horizontal-name">0</p>
        <p data-testid="1-horizontal-done-date">0</p>
        <p data-testid="1-Pasta-horizontal-tag">0</p>
      </div>
    </div>
  );
}

export default RecipesMade;
