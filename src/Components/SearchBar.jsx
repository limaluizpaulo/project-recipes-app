import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getFoods, getDrinks } from '../redux/actions/index';
import MealsAPI from '../services/MealRecipesAPI';
import BeverageAPI from '../services/BeverageRecipesAPI';

function SearchBar(props) {
  const { getFoodsApi, getDrinksApi, foods, drinks, title } = props;
  const inputText = React.useRef();
  const ingredientRadio = React.useRef();
  const letterRadio = React.useRef();
  const nameRadio = React.useRef();
  // const [link, setLink] = React.useState('#');
  const [meals, setMeals] = React.useState({});
  const [cocktails, setCocktails] = React.useState({});
  const isOneItem = React.useRef(false);
  // const pageTitle = React.useRef(title);
  // const item = React.useRef(meals);
  React.useEffect(() => {
    isOneItem.current = meals.length === 1 || cocktails.length === 1;
    // item.current = title === 'Bebidas' ? meals : cocktails;
  }, [meals, cocktails]);

  const callAPI = () => (
    title === 'Bebidas' ? getDrinksApi : getFoodsApi
  );
  const handleClick = async (e) => {
    e.preventDefault();
    const API = props.title === 'Bebidas' ? BeverageAPI : MealsAPI;
    const radioInputRefs = [ingredientRadio, letterRadio, nameRadio];
    const radioRef = radioInputRefs.find((radio) => (
      radio.current.checked || radio.current.id === 'name'
    ));
    if (letterRadio.current.checked && inputText.current.value.length > 1) {
      const message = 'Sua busca deve conter somente 1 (um) caracter';
      alert(message); // eslint-disable-line no-alert
    }

    callAPI()(inputText.current.value,
      API[radioRef.current.id]);
    setMeals(foods);
    setCocktails(drinks);
  };

  // const isOneItem = foods.length === 1 || drinks.length === 1;
  const pageTitle = title.toLowerCase();
  const item = title === 'Bebidas' ? meals : drinks;

  return isOneItem.current ? <Redirect to={ `/${pageTitle}/${item.idMeal}` } /> : (
    <form>
      <fieldset />
      <label htmlFor="search">
        <input
          id="search"
          type="text"
          ref={ inputText }
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
          name="radioFilter"
          data-testid="first-letter-search-radio"
        />
        Primeira letra
      </label>
      &nbsp;
      <button
        type="submit"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Busca
      </button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  foods: state.foods.list,
  drinks: state.foods.list,
});

const mapDispatchToProps = ((dispatch) => ({
  getFoodsApi: (value, callback) => dispatch(getFoods(value, callback)),
  getDrinksApi: (value, callback) => dispatch(getDrinks(value, callback)),
}));

SearchBar.propTypes = PropTypes.shape({}).isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
