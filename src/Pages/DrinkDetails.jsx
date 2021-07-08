import React from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import fethByID from '../Services/fetchByID';

export default class DrinkDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      drinks: {},
      like: false,
      loading: true,
      ingredients: [],
      measures: [],
    };
    this.fetchAPI = this.fetchAPI.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.takeURL = this.takeURL.bind(this);
    this.ingredients = this.ingredients.bind(this);
    this.measures = this.measures.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
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

  takeURL() {
    const { match: { url } } = this.props;
    const urlLike = `localhost:3000${url}`;
    console.log(urlLike);
  }

  async fetchAPI() {
    const { match: { params: { id } } } = this.props;
    const resultFetch = await fethByID('bebidas', id);
    console.log(resultFetch);
    this.setState({
      drinks: { ...resultFetch.drinks[0] },
      like: false,
      loading: false,
    });
    this.ingredients();
    this.measures();
  }

  render() {
    const { loading, drinks, like, ingredients, measures } = this.state;
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

        <button type="button" name="startrecipe" data-testid="start-recipe-btn">
          ola
        </button>
      </main>
    );
  }
}
