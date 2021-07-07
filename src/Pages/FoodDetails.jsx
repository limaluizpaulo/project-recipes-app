import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getFoods } from '../redux/actions';
import MealAPI from '../services/MealRecipesAPI';
import BeverageAPI from '../services/BeverageRecipesAPI';

class FoodDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueFood: [],
      ingredients: [],
      recomendations: [],
    };
    this.resultFood = this.resultFood.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
  }

  componentDidMount() {
    this.resultFood();
  }

  getIngredients() {
    const { valueFood } = this.state;
    const arrayIngredients = [];
    const arrayMeasures = [];
    const ingredientsAndMeasures = [];
    const FOOD = Object.entries(valueFood[0]);

    if (FOOD) {
      FOOD.forEach(([key, value]) => {
        if (key.includes('strIngredient') && value) {
          arrayIngredients.push(value);
        }
      });
      FOOD.forEach(([key, value]) => {
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

  async resultFood() {
    const { getFoodId, match } = this.props;
    const recomendations = await BeverageAPI.getByDefault();
    const { id } = match.params;
    const { payload } = await getFoodId(id, MealAPI.getFoodById);
    this.setState({ valueFood: payload, recomendations }, () => this.getIngredients());
  }

  render() {
    const SEIX = 5;
    const { valueFood, ingredients, recomendations } = this.state;
    if (valueFood[0]) {
      console.log(recomendations);
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
                {ingredients.map(([ingredient, measure], i) => (
                  <li
                    key={ i }
                    data-testid={ `${i}-ingredient-name-and-measure` }
                  >
                    {`${ingredient} ${measure}`}
                  </li>
                ))}
              </ul>
              <p data-testid="instructions">{food.strInstructions}</p>
              <img data-testid="video" src={ food.strVideo } alt="video" />
              {recomendations.map((value, j) => (j <= SEIX ? (
                <div key={ j } data-testid={ `${j}-recomendation-card` }>
                  <h5>{value.strDrink}</h5>
                </div>
              )
                : null))}
            </>
          ))}
          <button type="button" data-testid="share-btn">share</button>
          <button type="button" data-testid="favorite-btn">favorite</button>
          <button type="button" data-testid="start-recipe-btn">iniciar receita</button>
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
