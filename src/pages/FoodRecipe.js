import React from 'react';
import fetchAPI from '../services/fetchApi';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

class FoodRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsRecipe: [],
    }

    this.fetchDetails = this.fetchDetails.bind(this);
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

  renderIngredients() {
    const { detailsRecipe } = this.state;
    const arrayIngredients = [];
    for (let i = 1; i <= 20; i++ ) {
      // const ingredients = `detailsRecipe[0].strIngredient${ i }`;
      // const obejctIngredients = { [i]: ingredients };
      // arrayIngredients.push(obejctIngredients);
      // if (detailsRecipe[0].ingredients !== '' && detailsRecipe[0].ingredients !== null) {
      //   return (<li data-testid="recipe-category">{ detailsRecipe[0].ingredients }</li>)
      // }
    }
    console.log(arrayIngredients);
  }

  render() {
    const { detailsRecipe } = this.state;
    if (detailsRecipe.length === 0) {
      return <div>Carregando</div>
    }
    return(
      <section>
        <h1 data-testid="recipe-title"> { detailsRecipe[0].strMeal } </h1>
        <img src={ detailsRecipe[0].strMealThumb } alt={ detailsRecipe[0].strMeal } data-testid="recipe-photo" width="150px" />
        <button data-testid="share-btn"><img src= { shareIcon } alt="Compartilhar" /></button>
        <button data-testid="favorite-btn"><img src= { whiteHeartIcon } alt="Favoritos" /></button>
        <p data-testid="recipe-category">{ detailsRecipe[0].strCategory }</p>
        <ul>
          { this.renderIngredients() }
        </ul>
        <p data-testid="instructions"> Nada </p>
        <iframe width="280" height="150" src= { detailsRecipe[0].strYoutube } data-testid="video"></iframe>
        <div></div>
        <button data-testid="start-recipe-btn"></button>
      </section>
    );
  }
}

// const mapStateToProps = (state) => ( {
//   details: data.resultAPI.meals(),
// });

export default FoodRecipe;
