import React from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/ButtonDetails.css';

import { fetchByID, fetchByRecomendation } from '../Services';
import CardsDetails from '../Components/CardsDetails';

export default class MealDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      meals: {},
      recomendation: [],
      like: false,
      loading: true,
      ingredients: [],
      // measures: [],
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

  // measures() {
  //   const { meals } = this.state;
  //   const arrayMeasure = Object.entries(meals);
  //   const resultArrayMeasure = arrayMeasure.filter((value) => value[0]
  //     .includes('strMeasure') && value[1]);
  //   const MeasureList = resultArrayMeasure.map((e) => e[1]);
  //   this.setState({
  //     measures: MeasureList,
  //   });
  // }

  ingredients() {
    const { meals } = this.state;
    const arrayMeal = Object.entries(meals);
    const resultArrayMeal = arrayMeal.filter((value) => value[0]
      .includes('strIngredient') && value[1]);
    const ingredientList = resultArrayMeal.map((e) => e[1]);
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
    const resultFetch = await fetchByID('comidas', idReceita);
    this.setState({
      meals: { ...resultFetch.meals[0] },
      like: false,
      loading: false,
    });
    this.ingredients();
    this.measures();
  }

  async fecthRecomendationAPI() {
    const { drinks } = await fetchByRecomendation('comidas');
    this.setState({
      recomendation: drinks,
    });
  }

  render() {
    const { loading, meals, like, ingredients, measures, recomendation } = this.state;
    const { strMeal, strMealThumb, strCategory, strInstructions, strYoutube } = meals;

    if (loading) return <h1> loading </h1>;

    return (
      <main>

        <h1 data-testid="recipe-title">{ strMeal }</h1>

        <img data-testid="recipe-photo" alt="comida" src={ strMealThumb } />

        <button type="button" data-testid="share-btn" onClick={ this.takeURL }>
          <img src={ shareIcon } alt="shared" />
        </button>

        <button type="button" data-testid="favorite-btn" onClick={ this.handleClick }>
          { like ? <img src={ blackHeartIcon } alt="blackheart" />
            : <img src={ whiteHeartIcon } alt="whiteheart" /> }
        </button>

        <p data-testid="recipe-category">{ strCategory }</p>

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

        <iframe
          width="425"
          height="240"
          data-testid="video"
          src={ strYoutube.replace('watch?v=', 'embed/') }
          title="YouTube Video Player"
          frameBorder="0"
          allow="accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture"
          allowFullScreen
        />

        <CardsDetails type="comidas" recomendation={ recomendation } />

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

MealDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idReceita: PropTypes.string,
    }),
  }).isRequired,
};
