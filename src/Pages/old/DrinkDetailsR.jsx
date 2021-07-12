import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getDrinks } from '../../redux/actions';
import CarroselComidas from '../../Components/CarroselComidas';
import BeverageAPI from '../../services/BeverageRecipesAPI';
import MealRecipesAPI from '../../services/MealRecipesAPI';
// import Share from '../images/shareIcon.svg';
// import Favorite from '../images/whiteHeartIcon.svg';

class DrinkDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueDrink: [],
      ingredients: [],
      recomendations: [],
      visible: 'hidden',
    };
    this.resultDrink = this.resultDrink.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
    this.checkBtnReceita = this.checkBtnReceita.bind(this);
    this.iniciarReceita = this.iniciarReceita.bind(this);
    // this.shareChecker = this.shareChecker.bind(this);
  }

  componentDidMount() {
    this.resultDrink();
    this.checkBtnReceita();
  }

  getIngredients() {
    const { valueDrink } = this.state;
    const arrayIngredients = [];
    const arrayMeasures = [];
    const ingredientsAndMeasures = [];
    const DRINK = Object.entries(valueDrink[0]);

    if (DRINK) {
      DRINK.forEach(([key, value]) => {
        if (key.includes('strIngredient') && value) {
          arrayIngredients.push(value);
        }
      });
      DRINK.forEach(([key, value]) => {
        if (key.includes('strMeasure') && value) {
          arrayMeasures.push(value);
        }
      });
      for (let i = 0; i < arrayMeasures.length; i += 1) {
        ingredientsAndMeasures.push([arrayIngredients[i], arrayMeasures[i]]);
      }
    }
    this.setState({ ingredients: ingredientsAndMeasures });
  }

  checkBtnReceita() {
    const { match } = this.props;
    const { id } = match.params;
    const getReceitaStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    getReceitaStorage.forEach((receita) => {
      if (receita === id) {
        this.setState({ visible: '' });
      }
    });
  }

  async resultDrink() {
    const { getDrinkId, match } = this.props;
    const { id } = match.params;
    const recomendations = await MealRecipesAPI.getByDefault();
    const { payload } = await getDrinkId(id, BeverageAPI.getDrinkById);
    this.setState({ valueDrink: payload, recomendations }, () => this.getIngredients());
  }

  iniciarReceita() {
    const { match } = this.props;
    const { id } = match.params;
    const valueStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    localStorage.setItem('doneRecipes', JSON.stringify([...valueStorage, id]));
    this.checkBtnReceita();
  }

  render() {
    const { valueDrink, ingredients, recomendations, visible } = this.state;
    if (valueDrink[0]) {
      console.log(ingredients);
      return (
        <div>
          {valueDrink.map((drink, index) => (
            <>
              <img
                key={ index }
                data-testid="recipe-photo"
                src={ drink.strDrinkThumb }
                alt="drink"
                width="300"
              />
              <h1 data-testid="recipe-title">{drink.strDrink}</h1>
              <h6 data-testid="recipe-category">{drink.strAlcoholic}</h6>
              <ul>
                {ingredients.map((ingredient, i) => (
                  <li
                    key={ i }
                    data-testid={ `${i}-ingredient-name-and-measure` }
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
              <p data-testid="instructions">{drink.strInstructions}</p>
              <img data-testid="video" src={ drink.strVideo } alt="video" />
              <CarroselComidas recomendations={ recomendations } />
            </>
          ))}
          <button
            type="button"
            data-testid="share-btn"
          >
            <img alt="share-btn" src={ Share } />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            <img alt="favorite-btn" src={ Favorite } />
          </button>
          <button
            type="button"
            className={ `btn-iniciar-receita ${visible}` }
            data-testid="start-recipe-btn"
            onClick={ this.iniciarReceita }
          >
            iniciar receita

          </button>
        </div>
      );
    }
    return null;
  }
}

DrinkDetails.propTypes = {
  drink: PropTypes.any,
  getDrinkById: PropTypes.any,
}.isRiquered;

const mapDispatchToProps = (dispatch) => ({
  getDrinkId: (value, callback) => dispatch(getDrinks(value, callback)),
});

export default connect(null, mapDispatchToProps)(DrinkDetails);
