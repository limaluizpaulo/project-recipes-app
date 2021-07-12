import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getFoods, getDrinks } from '../redux/actions/index';
import MealsAPI from '../services/MealRecipesAPI';
import BeverageAPI from '../services/BeverageRecipesAPI';

function SearchBar(props) {
  const {
    getFoodsApi, getDrinksApi, foods,
    goToFoodsPage, drinks, goToDrinksPage,
    title } = props;
  const shouldRedirect = goToFoodsPage || goToDrinksPage;
  const itemPage = title === 'Comidas' ? foods : drinks;
  const itemID = title === 'Comidas' ? 'idMeal' : 'idDrink';
  const inputText = React.useRef();
  const ingredientRadio = React.useRef();
  const letterRadio = React.useRef();
  const nameRadio = React.useRef();

  const callActionAPI = () => (
    title === 'Comidas' ? getFoodsApi : getDrinksApi
  );

  const configState = () => {
    const API = title === 'Comidas' ? MealsAPI : BeverageAPI;
    const radioInputRefs = [ingredientRadio, letterRadio, nameRadio];
    const radioRef = radioInputRefs.find((radio) => (
      radio.current.checked || radio.current.id === 'name'
    ));
    return callActionAPI()(inputText.current.value,
      API[radioRef.current.id]);
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (letterRadio.current.checked && inputText.current.value.length > 1) {
      const message = 'Sua busca deve conter somente 1 (um) caracter';
      global.alert(message);
    }

    configState();
  };
  const pageTitle = title.toLowerCase();
  return shouldRedirect ? <Redirect
    to={ `/${pageTitle}/${itemPage[0][itemID]}` }
  /> : (
    <form className="searchBar">
      <div className="barra-pesquisar">
        <input
          id="search"
          type="text"
          ref={ inputText }
          name="search"
          placeholder="Buscar Receita"
          data-testid="search-input"
        />

        <button
          type="submit"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Busca
        </button>
      </div>
      &nbsp;
      <label htmlFor="ingredient">
        <input
          id="ingredient"
          type="radio"
          className="btn-radio"
          ref={ ingredientRadio }
          name="radioFilter"
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>
      &nbsp;
      <label htmlFor="name">
        <input
          id="name"
          type="radio"
          className="btn-radio"
          ref={ nameRadio }
          name="radioFilter"
          data-testid="name-search-radio"
        />
        Nome
      </label>
      &nbsp;
      <label htmlFor="letter">
        <input
          id="letter"
          type="radio"
          ref={ letterRadio }
          className="btn-radio"
          name="radioFilter"
          data-testid="first-letter-search-radio"
        />
        Primeira letra
      </label>
      &nbsp;

    </form>
  );
}

const mapStateToProps = (state) => ({
  foods: state.foods.list,
  goToFoodsPage: state.foods.goToFoodsPage,
  foodNotFound: state.foods.foodNotFound,
  drinks: state.drinks.list,
  goToDrinksPage: state.drinks.goToDrinksPage,
  drinkNotFound: state.drinks.drinkNotFound,
});

const mapDispatchToProps = ((dispatch) => ({
  getFoodsApi: (value, callback) => dispatch(getFoods(value, callback)),
  getDrinksApi: (value, callback) => dispatch(getDrinks(value, callback)),
}));

SearchBar.propTypes = PropTypes.shape({}).isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
