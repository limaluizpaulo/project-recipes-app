import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getFoods } from '../redux/actions';
import MealAPI from '../services/MealRecipesAPI';
import BeverageAPI from '../services/BeverageRecipesAPI';
import CarroselBebidas from '../Components/CarroselBebidas';
import BtnIniciar from '../Components/BtnIniciar';
import BtnContinuar from '../Components/BtnContinuar';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import dataAtual from '../services/dataAtual';
import ingredientsAndMeasures from '../services/ingredientsAndMeasures';
import shareIcon from '../images/shareIcon.svg';

class FoodDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueFood: [],
      ingredients: [],
      recomendations: [],
      btnIniciar: true,
      btnContinuar: false,
      copySuccess: 'share',
      favorite: whiteHeartIcon,
    };
    this.resultFood = this.resultFood.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
    this.checkBtnReceita = this.checkBtnReceita.bind(this);
    this.iniciarReceita = this.iniciarReceita.bind(this);
    this.reiceitaEmProgresso = this.reiceitaEmProgresso.bind(this);
    this.receitaFinalizada = this.receitaFinalizada.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.receitaFavorita = this.receitaFavorita.bind(this);
    this.receitaFavoritada = this.receitaFavoritada.bind(this);
  }

  componentDidMount() {
    this.resultFood();
    this.checkBtnReceita();
    this.receitaFavoritada();
  }

  getIngredients() {
    const { valueFood } = this.state;
    const ingredients = ingredientsAndMeasures(valueFood[0]);
    this.setState({ ingredients });
  }

  receitaFavoritada() {
    const { match: { params: { id } } } = this.props;
    const receitaFavorita = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    receitaFavorita.forEach((receita) => {
      if (receita.id === id) {
        this.setState({ favorite: blackHeartIcon });
      } else {
        this.setState({ favorite: whiteHeartIcon });
      }
    });
  }

  checkBtnReceita() {
    const { match } = this.props;
    const { id } = match.params;
    const getReceitaStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    getReceitaStorage.forEach((receita) => {
      if (receita.id === id) {
        this.setState((oldState) => ({ btnIniciar: !oldState.btnIniciar }));
      }
    });
    const receitaStorage = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    if (receitaStorage.meals) {
      const idReceita = Object.keys(receitaStorage.meals)[0];
      if (idReceita === id) {
        this.setState((oldState) => ({
          btnContinuar: !oldState.btnContinuar, btnIniciar: false }));
      }
    }
  }

  async resultFood() {
    const { getFoodId, match } = this.props;
    const recomendations = await BeverageAPI.getByDefault();
    const { id } = match.params;
    const { payload } = await getFoodId(id, MealAPI.getFoodById);
    this.setState({ valueFood: payload, recomendations }, () => this.getIngredients());
  }

  async receitaFinalizada() {
    const { match, getFoodId } = this.props;
    const { id } = match.params;
    const { payload } = await getFoodId(id, MealAPI.getFoodById);
    const { idMeal, strArea, strCategory, strMeal, strMealThumb, strTags } = payload[0];
    const receita = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: dataAtual(),
      tags: strTags || [],
    };
    const valueStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    localStorage.setItem('doneRecipes', JSON.stringify([...valueStorage, receita]));
  }

  iniciarReceita() {
    this.reiceitaEmProgresso();
    this.setState((oldState) => (
      { btnIniciar: !oldState.btnIniciar }));
  }

  reiceitaEmProgresso() {
    const { match } = this.props;
    const { id } = match.params;
    const { ingredients } = this.state;
    const receitaProgresso = {
      meals: {
        [id]: ingredients,
      },
    };
    const receitaStorage = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    localStorage
      .setItem('inProgressRecipes', JSON
        .stringify({ ...receitaStorage, ...receitaProgresso }));
  }

  copyToClipboard() {
    const { match: { url } } = this.props;
    navigator.clipboard.writeText(`http://localhost:3000${url}`).then((res) => res);
    console.log(`http://localhost:3000/${url}`);
    this.setState({ copySuccess: 'Link copiado!' });
  }

  async receitaFavorita() {
    const { favorite } = this.state;
    const { match, getFoodId } = this.props;
    const { id } = match.params;
    const { payload } = await getFoodId(id, MealAPI.getFoodById);
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = payload[0];
    const favoriteRecipes = [{
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    }];
    if (favorite === blackHeartIcon) {
      this.setState({ favorite: whiteHeartIcon });
    } else {
      this.setState({ favorite: blackHeartIcon });
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }

  render() {
    const {
      valueFood,
      ingredients,
      recomendations, btnIniciar, btnContinuar, copySuccess, favorite } = this.state;
    const { match: { url } } = this.props;
    if (valueFood[0]) {
      return (
        <div>
          {valueFood.map((food, index) => (
            <>
              <img
                key={ index }
                data-testid="recipe-photo"
                src={ food.strMealThumb }
                alt="drink"
                width="300"
              />
              <h1 data-testid="recipe-title">{food.strMeal}</h1>
              <h6 data-testid="recipe-category">{food.strCategory}</h6>
              <ul>
                {ingredients.map(({ ingredient, quantidade, checked }, i) => (
                  <>
                    <input
                      key={ i }
                      id={ `${ingredient}${i}` }
                      type="checkbox"
                      checked={ checked }
                      onChange={ () => this.checkedIngredients({
                        ingredient, quantidade, checked }, i) }
                    />
                    <label
                      htmlFor={ `${ingredient}${i}` }
                      data-testid={ `${i}-ingredient-name-and-measure` }
                    >
                      {`${ingredient} ${quantidade}`}
                    </label>
                  </>
                ))}
              </ul>
              <p data-testid="instructions">{food.strInstructions}</p>
              <img data-testid="video" src={ food.strVideo } alt="video" />
              <CarroselBebidas recomendations={ recomendations } />
            </>
          ))}
          <button
            type="button"
            data-testid="share-btn"
            onClick={ this.copyToClipboard }
          >
            <img src={ shareIcon } alt="compartilha" />
            {copySuccess}
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ this.receitaFavorita }
            src={ favorite }
          >
            <img src={ favorite } alt="coracao" />
          </button>
          { btnIniciar
          && <BtnIniciar iniciarReceita={ this.iniciarReceita } url={ url } />}
          { btnContinuar
          && <BtnContinuar iniciarReceita={ this.iniciarReceita } />}
        </div>
      );
    }
    return null;
  }
}

FoodDetails.propTypes = {
  getFoodId: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  getFoodId: (value, callback) => dispatch(getFoods(value, callback)),
});

export default connect(null, mapDispatchToProps)(FoodDetails);
