import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import fetchRecipeFood, { fetchRecipeDrink } from '../services/recipeAPI';
import actionList from '../Redux/actions';

function SearchFood({ recipe, dispRecipeList }) {
  const [choice, setChoice] = useState('');
  const [text, setText] = useState('');
  const history = useHistory();
  const resAPI = async (fun) => {
    const func = await fun();
    // .log(func);
    if (func === undefined || func.meals === null || func.drinks === null) {
      window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (recipe === 'Comidas') {
      if (func.meals.length === 1) {
        history.push(`/comidas/${func.meals[0].idMeal}`);
      } else {
        // console.log(func.meals);
        dispRecipeList({
          list: func,
        });
      }
    } else if (func.drinks.length === 1) {
      history.push(`/bebidas/${func.drinks[0].idDrink}`);
    } else {
    //   console.log(func.drinks);
      dispRecipeList({
        list: func,
      });
    }
  };

  function clickAPI() {
    // console.log(choice, text);
    if (choice === 'ingredient') {
      return recipe === 'Comidas'
        ? resAPI(() => fetchRecipeFood(`filter.php?i=${text}`))
        : resAPI(() => fetchRecipeDrink(`filter.php?i=${text}`));
    }
    if (choice === 'name') {
      return recipe === 'Comidas'
        ? resAPI(() => fetchRecipeFood(`search.php?s=${text}`))
        : resAPI(() => fetchRecipeDrink(`search.php?s=${text}`));
    }
    if (choice === 'letter') {
      if (text.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        // console.log('passou')
        return recipe === 'Comidas'
          ? resAPI(() => fetchRecipeFood(`search.php?f=${text}`))
          : resAPI(() => fetchRecipeDrink(`search.php?f=${text}`));
      }
    }
  }
  return (
    <div className="search">
      <div>
        <input
          onChange={ ({ target }) => setText(target.value) }
          data-testid="search-input"
          type="text"
          style={ { margin: '20px' } }
        />
        <label htmlFor="ingredient">
          <input
            onClick={ ({ target }) => setChoice(target.value) }
            name="choice"
            type="radio"
            value="ingredient"
            id="ingredient"
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            onClick={ ({ target }) => setChoice(target.value) }
            name="choice"
            type="radio"
            value="name"
            id="name"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="letter">
          <input
            onClick={ ({ target }) => setChoice(target.value) }
            name="choice"
            type="radio"
            value="letter"
            id="letter"
            data-testid="first-letter-search-radio"
          />
          Primeira letra
        </label>
      </div>
      <button
        onClick={ clickAPI }
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar

      </button>
    </div>
  );
}

SearchFood.propTypes = {
  dispRecipeList: PropTypes.func.isRequired,
  recipe: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispRecipeList: (object) => dispatch(actionList(object)),
});

export default connect(null, mapDispatchToProps)(SearchFood);
