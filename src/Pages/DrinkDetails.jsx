import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/ButtonDetails.css';

import { fetchByID, fetchByRecomendation } from '../Services';
import { recipeProgress } from '../redux/actions';
import CardsDetails from '../Components/CardsDetails';

class DrinkDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      drinks: {},
      recomendation: [],
      like: false,
      loading: true,
      ingredients: [],
      measures: [],
      redirect: false,
    };
    this.fetchIdAPI = this.fetchIdAPI.bind(this);
    this.fecthRecomendationAPI = this.fecthRecomendationAPI.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.ingredients = this.ingredients.bind(this);
    this.measures = this.measures.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
    // this.takeURL = this.takeURL.bind(this);
  }

  componentDidMount() {
    this.fetchIdAPI();
    this.fecthRecomendationAPI();
  }

  handleClick() {
    this.setState((prevState) => ({
      like: !prevState.like,
    }));
  }

  handleClickStart() {
    const { saveRecipe } = this.props;
    const { drinks, ingredients, measures } = this.state;

    saveRecipe({ drinks, ingredients, measures });
    this.setState({
      redirect: true,
    });
  }

  measures() {
    const { drinks } = this.state;
    const arrayMeasure = Object.entries(drinks);
    const resultArrayMeasure = arrayMeasure.filter((value) => value[0]
      .includes('strMeasure') && value[1]);
    const MeasureList = resultArrayMeasure.map((e) => e[1]);
    this.setState({
      measures: MeasureList,
    });
  }

  ingredients() {
    const { drinks } = this.state;
    const arrayDrink = Object.entries(drinks);
    const resultArrayDrink = arrayDrink.filter((value) => value[0]
      .includes('strIngredient') && value[1]);
    const ingredientList = resultArrayDrink.map((e) => e[1]);
    this.setState({
      ingredients: ingredientList,
    });
  }

  // takeURL() {
  //   const { match: { url } } = this.props;
  //   const urlLike = `localhost:3000${url}`;
  //   console.log(urlLike);
  // }

  async fetchIdAPI() {
    const { match: { params: { idReceita } } } = this.props;
    const resultFetch = await fetchByID('bebidas', idReceita);
    this.setState({
      drinks: { ...resultFetch.drinks[0] },
      like: false,
      loading: false,
    });
    this.ingredients();
    this.measures();
  }

  async fecthRecomendationAPI() {
    const { meals } = await fetchByRecomendation('bebidas');
    this.setState({
      recomendation: meals,
    });
  }

  render() {
    const { match: { params: { idReceita } } } = this.props;
    const { loading, drinks, like, ingredients,
      measures, recomendation, redirect } = this.state;
    const { strDrink, strDrinkThumb, strInstructions, strAlcoholic } = drinks;

    if (loading) return <h1> loading </h1>;
    if (redirect) return <Redirect to={ `/bebidas/${idReceita}/in-progress` } />;

    return (
      <main>
        <h1 data-testid="recipe-title">{ strDrink }</h1>

        <img data-testid="recipe-photo" alt="foto" src={ strDrinkThumb } />

        <button type="button" data-testid="share-btn" onClick={ this.takeURL }>
          <img src={ shareIcon } alt="shared" />
        </button>

        <button type="button" data-testid="favorite-btn" onClick={ this.handleClick }>
          { like ? <img src={ blackHeartIcon } alt="blackheart" />
            : <img src={ whiteHeartIcon } alt="whiteheart" /> }
        </button>

        <p data-testid="recipe-category">{ strAlcoholic }</p>

        { ingredients.map((e, i) => (
          <ul key={ i }>
            <li
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              { `${e}  ${measures[i]}` }
            </li>
          </ul>
        ))}

        <p data-testid="instructions">{ strInstructions }</p>

        <CardsDetails type="bebidas" recomendation={ recomendation } />

        <button
          type="button"
          data-testid="start-recipe-btn"
          className="button-details"
          onClick={ () => this.handleClickStart() }
        >
          Iniciar Receita
        </button>
      </main>
    );
  }
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idReceita: PropTypes.string,
    }),
  }).isRequired,
  saveRecipe: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveRecipe: (recipe) => dispatch(recipeProgress(recipe)),
});

export default connect(null, mapDispatchToProps)(DrinkDetails);
