import React from 'react';
import PropTypes from 'prop-types';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/ButtonDetails.css';

import { fetchByID, fetchByRecomendation } from '../Services';
import CardsDetails from '../Components/CardsDetails';

export default class DrinkDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      drinks: {},
      recomendation: [],
      like: false,
      loading: true,
      ingredients: [],
      measures: [],
    };
    this.fetchIdAPI = this.fetchIdAPI.bind(this);
    this.fecthRecomendationAPI = this.fecthRecomendationAPI.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.ingredients = this.ingredients.bind(this);
    this.measures = this.measures.bind(this);
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
    console.log(meals);
    this.setState({
      recomendation: meals,
    });
  }

  render() {
    const { loading, drinks, like, ingredients, measures, recomendation } = this.state;
    const { strDrink, strDrinkThumb, strInstructions, strAlcoholic } = drinks;

    if (loading) return <h1> loading </h1>;

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
};
