import React from 'react';
<<<<<<< HEAD

function SearchBar() {
  return (
=======
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
    foodNotFound, drinkNotFound, title } = props;
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
      alert(message); // eslint-disable-line no-alert
    }

    configState();
  };
  const pageTitle = title.toLowerCase();
  if (foodNotFound || drinkNotFound) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  return shouldRedirect ? <Redirect
    to={ `/${pageTitle}/${itemPage[0][itemID]}` }
  /> : (
>>>>>>> 3733e1de78fa0e110ae8de9bdaba804948ede2bd
    <form>
      <fieldset />
      <label htmlFor="search">
        <input
          id="search"
          type="text"
<<<<<<< HEAD
=======
          ref={ inputText }
>>>>>>> 3733e1de78fa0e110ae8de9bdaba804948ede2bd
          name="search"
          placeholder="Buscar Receita"
          data-testid="search-input"
        />
      </label>
      {' '}
      <br />
      &nbsp;
      <label htmlFor="ingredient">
        <input
          id="ingredient"
          type="radio"
<<<<<<< HEAD
          name="ingredient"
=======
          ref={ ingredientRadio }
          name="radioFilter"
>>>>>>> 3733e1de78fa0e110ae8de9bdaba804948ede2bd
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>
      &nbsp;
      <label htmlFor="name">
        <input
          id="name"
          type="radio"
<<<<<<< HEAD
          name="name"
=======
          ref={ nameRadio }
          name="radioFilter"
>>>>>>> 3733e1de78fa0e110ae8de9bdaba804948ede2bd
          data-testid="name-search-radio"
        />
        Nome
      </label>
      &nbsp;
      <label htmlFor="letter">
        <input
          id="letter"
          type="radio"
<<<<<<< HEAD
          name="letter"
=======
          ref={ letterRadio }
          name="radioFilter"
>>>>>>> 3733e1de78fa0e110ae8de9bdaba804948ede2bd
          data-testid="first-letter-search-radio"
        />
        Primeira letra
      </label>
      &nbsp;
<<<<<<< HEAD
      <button type="submit" data-testid="exec-search-btn">Busca</button>
=======
      <button
        type="submit"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Busca
      </button>
>>>>>>> 3733e1de78fa0e110ae8de9bdaba804948ede2bd
    </form>
  );
}

<<<<<<< HEAD
export default SearchBar;
=======
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
>>>>>>> 3733e1de78fa0e110ae8de9bdaba804948ede2bd
