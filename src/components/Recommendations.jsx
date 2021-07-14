import React from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../services/fetchApi';

class Recommendations extends React.Component {
  constructor() {
    super();
    this.state = {
      recommendedRecipe: [],
    };
    this.renderRecommendedFood = this.renderRecommendedFood.bind(this);
    this.renderRecommendedDrinks = this.renderRecommendedDrinks.bind(this);
    this.renderRecommended = this.renderRecommended.bind(this);
    this.fetchRecommended = this.fetchRecommended.bind(this);
  }

  componentDidMount() {
    this.fetchRecommended();
  }

  async fetchRecommended() {
    const { api } = this.props;
    if (api === 'meal') {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const responseAPI = await fetchAPI(url);
      const { meals } = responseAPI;
      return this.setState({
        recommendedRecipe: meals,
      });
    }
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const responseAPI = await fetchAPI(url);
    const { drinks } = responseAPI;
    return this.setState({
      recommendedRecipe: drinks,
    });
  }

  renderRecommendedFood() {
    const { recommendedRecipe } = this.state;
    const RECOMMENDED_CARDS = 6;
    return recommendedRecipe.map((meal, index) => {
      if (index < RECOMMENDED_CARDS) {
        return (
          <div
            data-testid={ `${index}-recomendation-card` }
            key={ index }
          >
            <h2 data-testid={ `${index}-recomendation-title` }>
              { meal.strMeal }
            </h2>
            <p>
              { meal.strCategory }
            </p>
            <img src={ meal.strMealThumb } alt={ meal.strMeal } width="150px" />
          </div>
        );
      }
      return null;
    });
  }

  renderRecommendedDrinks() {
    const { recommendedRecipe } = this.state;
    const RECOMMENDED_CARDS = 6;
    return recommendedRecipe.map((drink, index) => {
      if (index < RECOMMENDED_CARDS) {
        return (
          <div
            data-testid={ `${index}-recomendation-card` }
            key={ index }
            className="visible-card"
          >
            <img src={ drink.strDrinkThumb } alt={ drink.strDrink } width="150px" />
            <h2 data-testid={ `${index}-recomendation-title` }>
              { drink.strDrink }
            </h2>
            <p>
              { drink.strCategory }
            </p>
          </div>
        );
      }
      return null;
    });
  }

  renderRecommended() {
    const { api } = this.props;
    if (api === 'meal') {
      return this.renderRecommendedFood();
    }
    return this.renderRecommendedDrinks();
  }

  render() {
    const { recommendedRecipe } = this.state;
    if (recommendedRecipe.length === 0) {
      return <div>Carregando</div>;
    }
    return (
      <section className="recommended-main-section">
        <h2 className="recommended-cards-title">Recomendações</h2>
        <section className="recommended-cards-section">
          { this.renderRecommended() }
        </section>
      </section>
    );
  }
}

Recommendations.propTypes = {
  api: PropTypes.string.isRequired,
};

export default Recommendations;
