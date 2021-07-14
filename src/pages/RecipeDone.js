import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import { copyLink } from '../helper/functions';

export default function RecipeDone() {
  const history = useHistory();
  const doneRecepies = JSON.parse(localStorage
    .getItem('doneRecipes')) || [];
  const [show, setShow] = useState(false);
  const [object, setObject] = useState({});
  const [newDoneRecipies, setNewDoneRecipies] = useState(doneRecepies);

  useEffect(() => {
    const newObject = {};
    doneRecepies.forEach((item) => { newObject[item.id] = false; });
    setObject(newObject);
  }, []);

  function showLink(id, recipe) {
    const newObject = object;
    // console.log(newObject);
    if (newObject[id]) {
      newObject[id] = false;
      setObject({ ...newObject });
    } else {
      newObject[id] = true;
      setObject({ ...newObject });
    }
    copyLink(copy, setShow, recipe.type, recipe.id);
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
        <div
          className="doneRecipes"
          key={ recipe.id }
          style={ { border: 'solid black 2px' } }
        >

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

          <button
            type="button"
            onClick={ () => showLink(recipe.id, recipe) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="Share Icon"
            />
          </button>

          {object[recipe.id] && <p>Link copiado!</p>}

          { recipe.type === 'comida' && recipe.tags.slice(0, 2).map((tag, tagIndex) => (
            <p key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
