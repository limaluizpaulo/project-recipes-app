import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchDrinksAction, fetchIngrentAction } from '../actions';

class IngredientCard extends React.Component {
  constructor() {
    super();

    this.getImages = this.getImages.bind(this);
    this.dispatchAction = this.dispatchAction.bind(this);
  }

  getImages(array) {
    const { pathname } = this.props;
    const db = pathname.includes('comidas');
    if (db) {
      return array.map(({ strIngredient }) => (
        `www.themealdb.com/images/ingredients/${strIngredient}-Small.png`));
    }
    return array.map(({ strIngredient1 }) => (
      `www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`));
  }

  dispatchAction(ingrediente) {
    const { pathname, getByDrinkIngredient, getByFoodIngredient } = this.props;
    const db = pathname.includes('comidas');
    if (db) {
      getByFoodIngredient(ingrediente, 'ingrediente');
    }
    getByDrinkIngredient(ingrediente, 'ingrediente');
  }

  render() {
    const { ingredients, pathname } = this.props;
    const totalRecipes = 12;
    const food = ingredients.filter((elem, index) => index < totalRecipes);

    const images = this.getImages(food);
    const page = pathname.includes('comidas') ? '/comidas' : '/bebidas';

    return food.map((recipe, index) => (
      <Link key={ recipe.idIngredient || recipe.strIngredient1 } to={ page }>
        <button
          type="button"
          onClick={ () => (
            this.dispatchAction((recipe.strIngredient || recipe.strIngredient1)) }
        >
          <div data-testid={ `${index}-ingredient-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://${images[index]}` }
              alt={ recipe.strIngredient || recipe.strIngredient1 }
              width="60px"
            />
            <h4 data-testid={ `${index}-card-name` }>
              { recipe.strIngredient || recipe.strIngredient1 }
            </h4>
          </div>
        </button>
      </Link>
    ));
  }
}

const mapDispatchToProps = (dispatch) => ({
  getByDrinkIngredient: (ingrediente, ingredient) => (
    dispatch(fetchDrinksAction(ingrediente, ingredient))),
  getByFoodIngredient: (ingrediente, ingredient) => (
    dispatch(fetchIngrentAction(ingrediente, ingredient))),
});

const mapStateToProps = (state) => ({
  resultFood: state.food.recipes,
});

IngredientCard.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
  pathname: PropTypes.string,
  getByIngredient: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(IngredientCard);
