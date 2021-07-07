import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getFoods } from '../redux/actions';
import MealAPI from '../services/MealRecipesAPI';

class FoodDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueFood: [],
      ingredients: [],
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
    const FOOD = Object.entries(valueFood[0]);

    if (FOOD) {
      FOOD.forEach(([key, value]) => {
        if (key.includes('strIngredient') && value) {
          arrayIngredients.push(value);
        }
      });
    }
    this.setState({ ingredients: arrayIngredients });
  }

  async resultFood() {
    const { getFoodId, match } = this.props;
    const { id } = match.params;
    const { payload } = await getFoodId(id, MealAPI.getFoodById);
    this.setState({ valueFood: payload }, () => this.getIngredients());
  }

  render() {
    const { valueFood, ingredients } = this.state;
    console.log(valueFood);
    if (valueFood[0]) {
      return (
        <div>
          {valueFood.map((food, index) => (
            <>
              <img
                key={ index }
                data-testid="recipe-photo"
                src={ food.strDrinkThumb }
                alt="drink"
                width="300"
              />
              <h1 data-testid="recipe-title">{food.strDrink}</h1>
              <h6 data-testid="recipe-category">{food.strCategory}</h6>
              <ul>
                {ingredients.map((ingredient, i) => (
                  <li
                    key={ i }
                    data-testid={ `${i}-ingredient-name-and-measure` }
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
              <p data-testid="instructions">{food.strInstructions}</p>
              <img data-testid="video" src={ food.strVideo } alt="video" />
              <div data-testid={ `${index}-recomendation-card` }>
                cards
              </div>
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
