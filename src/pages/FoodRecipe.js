import React from 'react';
import fetchAPI from '../services/fetchApi';
import Iframe from 'react-iframe';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class FoodRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsRecipe: [],
    }

    this.fetchDetails = this.fetchDetails.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
  };

  componentDidMount() {
    this.fetchDetails();
  }  

  async fetchDetails() {
    const { match:{ params: { id } } } = this.props;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ id }`;
    const responseAPI = await fetchAPI(url);
    const { meals } = responseAPI;
    this.setState({
      detailsRecipe: meals,
    });
  }

  renderVideo() {
    const { detailsRecipe } = this.state;
    const url = detailsRecipe[0].strYoutube;
    const  split = url.split('watch');
    return (`${split[0]}embed${split[1]}`) 
  }

  renderIngredients() {
    const { detailsRecipe } = this.state;
    const arrayIngredients = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
      12, 13, 14, 15, 16, 17, 18, 19, 20];
    return arrayIngredients.map((position) => {
      const ingredients = detailsRecipe[0][`strIngredient${position}`];
      const measure = detailsRecipe[0][`strMeasure${position}`];
      if (ingredients === '' || ingredients === null) {
        return null;
      }
      return (
      <li
        key={ position }
        data-testid={`${position - 1}-ingredient-name-and-measure`}
      >
        { `${ measure } ${ ingredients }` }
      </li>);
    });
  }

  render() {
    const { detailsRecipe } = this.state;
    if (detailsRecipe.length === 0) {
      return <div>Carregando</div>
    }
    return(
      <section>
        <h1 data-testid="recipe-title"> { detailsRecipe[0].strMeal } </h1>
        <img
          src={ detailsRecipe[0].strMealThumb }
          alt={ detailsRecipe[0].strMeal }
          data-testid="recipe-photo"
          width="150px"
        />
        <button data-testid="share-btn">
          <img src= { shareIcon } alt="Compartilhar" />
        </button>
        <button data-testid="favorite-btn">
          <img src= { whiteHeartIcon } alt="Favoritos" />
        </button>
        <p data-testid="recipe-category">{ detailsRecipe[0].strCategory }</p>
        <ul>
          { this.renderIngredients() }
        </ul>
        <p data-testid="instructions"> { detailsRecipe[0].strInstructions } </p>
        <div data-testid="video">
          <Iframe width="280" height="150" url={ this.renderVideo() } />
        </div>
        <section>
          <div data-testid={`0-recomendation-card`}></div>
          <div data-testid={`1-recomendation-card`}></div>
          <div data-testid={`2-recomendation-card`}></div>
          <div data-testid={`3-recomendation-card`}></div>
          <div data-testid={`4-recomendation-card`}></div>
          <div data-testid={`5-recomendation-card`}></div>
        </section>
        <button data-testid="start-recipe-btn"> Iniciar Receita</button>
      </section>
    );
  }
}

// const mapStateToProps = (state) => ( {
//   details: data.resultAPI.meals(),
// });

export default FoodRecipe;
