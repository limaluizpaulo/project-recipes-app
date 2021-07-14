import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function RecipeDone() {
  const history = useHistory();
  const doneRecepies = JSON.parse(localStorage
    .getItem('doneRecipes')) || [];
  const [show, setShow] = useState(false);
  const [newDoneRecipies, setNewDoneRecipies] = useState(doneRecepies);

  function handleClickClipBoard(type, id) {
    console.log('aaaaa');
    copy(`http://localhost:3000/${type}s/${id}`);

    setShow(true);
  }
  function filterDoneRecepies(filterType) {
    if (filterType === 'all') {
      setNewDoneRecipies(doneRecepies);
    } else if (filterType === 'comidas') {
      setNewDoneRecipies(doneRecepies
        .filter((recipe) => recipe.type.includes('comida')));
    } else {
      setNewDoneRecipies(doneRecepies
        .filter((recipe) => recipe.type.includes('bebida')));
    }
  }

  return (
    <div>
      <Header title="Receitas Feitas" display="false" />

      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filterDoneRecepies('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filterDoneRecepies('comidas') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterDoneRecepies('bebidas') }
      >
        Drinks
      </button>

      { newDoneRecipies.map((recipe, index) => (
        <div key={ recipe.id } style={ { border: 'solid black 2px' } }>
          <img
            role="presentation"
            data-testid={ `${index}-horizontal-image` }
            style={ { width: '20px' } }
            src={ recipe.image }
            alt={ `Imagem da receita ${recipe.name}` }
            onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
          />
          <p data-testid={ `${index}-horizontal-top-text` } style={ { padding: '20px' } }>
            { recipe.type === 'comida' ? `${recipe.area} - ${recipe.category}`
              : recipe.alcoholicOrNot}
          </p>
          <p
            role="presentation"
            onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
            data-testid={ `${index}-horizontal-name` }
            style={ { padding: '20px' } }
          >
            {recipe.name}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>
            { recipe.doneDate }
          </p>
          <img
            onFocus
            style={ { padding: '20px' } }
            role="presentation"
            src={ shareIcon }
            alt="Ícone para compartilhar"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => handleClickClipBoard(recipe.type, recipe.id) }
          />

          { recipe.type === 'comida' && recipe.tags.slice(0, 2).map((tag, tagIndex) => (
            <p key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
          ))}
        </div>
      ))}
      {show && (
        <p>Link copiado!</p>
      )}
    </div>
  );
}
