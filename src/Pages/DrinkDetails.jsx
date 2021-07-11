import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getDrinks } from '../redux/actions';
import CarroselComidas from '../Components/CarroselComidas';
import BeverageAPI from '../services/BeverageRecipesAPI';
import MealRecipesAPI from '../services/MealRecipesAPI';
import BtnContinuar from '../Components/BtnContinuar';
import BtnIniciar from '../Components/BtnIniciar';

class DrinkDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueDrink: [],
      ingredients: [],
      recomendations: [],
      btnIniciar: true,
      btnContinuar: false,
    };
    this.resultDrink = this.resultDrink.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
    this.checkBtnReceita = this.checkBtnReceita.bind(this);
    this.iniciarReceita = this.iniciarReceita.bind(this);
    this.checkedIngredients = this.checkedIngredients.bind(this);
    this.reiceitaEmProgresso = this.reiceitaEmProgresso.bind(this);
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
        ingredientsAndMeasures.push({
          ingredient: arrayIngredients[i],
          quantidade: arrayMeasures[i],
          checked: false,
        });
      }
    }
    this.setState({ ingredients: ingredientsAndMeasures });
  }

  checkBtnReceita() {
    const { match } = this.props;
    const { id } = match.params;
    const getReceitaStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    getReceitaStorage.forEach((receita) => {
      if (receita.id === id) {
        console.log('iniciar receita');
        this.setState((oldState) => ({ btnIniciar: !oldState.btnIniciar }));
      }
    });
    const receitaStorage = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    if (receitaStorage.cocktails) {
      const idReceita = Object.keys(receitaStorage.cocktails)[0];
      if (idReceita === id) {
        this.setState((oldState) => ({
          btnContinuar: !oldState.btnContinuar, btnIniciar: false }));
      }
    }
  }

  async resultDrink() {
    const { getDrinkId, match } = this.props;
    const { id } = match.params;
    const recomendations = await MealRecipesAPI.getByDefault();
    const { payload } = await getDrinkId(id, BeverageAPI.getDrinkById);
    this.setState({ valueDrink: payload, recomendations }, () => this.getIngredients());
  }

  dataAtual() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    today = `${mm}/${dd}/${yyyy}`;
    return today;
  }

  checkedIngredients(value, i) {
    value.checked = !value.checked;
    const { ingredients } = this.state;
    ingredients[i] = value;
    this.setState({ ingredients });
  }

  async receitaFinalizada() {
    const { match, getDrinkId } = this.props;
    const { id } = match.params;
    const { payload } = await getDrinkId(id, BeverageAPI.getDrinkById);
    const { idDrink,
      strDrink,
      strCategory,
      strTags,
      strAlcoholic, strDrinkThumb } = payload[0];
    const receita = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: this.dataAtual(),
      tags: strTags || [],
    };
    const valueStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    localStorage.setItem('doneRecipes', JSON.stringify([...valueStorage, receita]));
  }

  reiceitaEmProgresso() {
    const { match } = this.props;
    const { id } = match.params;
    const { ingredients } = this.state;
    const receitaProgresso = {
      cocktails: {
        [id]: ingredients,
      },
    };
    const receitaStorage = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    localStorage
      .setItem('inProgressRecipes', JSON
        .stringify({ ...receitaStorage, ...receitaProgresso }));
  }

  iniciarReceita() {
    this.reiceitaEmProgresso();
    this.setState((oldState) => (
      { btnIniciar: !oldState.btnIniciar }));
  }

  render() {
    const {
      valueDrink, ingredients, recomendations, btnIniciar, btnContinuar } = this.state;
    const { match: { url } } = this.props;
    if (valueDrink[0]) {
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
              <p data-testid="instructions">{drink.strInstructions}</p>
              <img data-testid="video" src={ drink.strVideo } alt="video" />
              <CarroselComidas recomendations={ recomendations } />
            </>
          ))}
          <button type="button" data-testid="share-btn">share</button>
          <button type="button" data-testid="favorite-btn">favorite</button>
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

DrinkDetails.propTypes = {
  drink: PropTypes.any,
  getDrinkById: PropTypes.any,
}.isRiquered;

const mapDispatchToProps = (dispatch) => ({
  getDrinkId: (value, callback) => dispatch(getDrinks(value, callback)),
});

export default connect(null, mapDispatchToProps)(DrinkDetails);
