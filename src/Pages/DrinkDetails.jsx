import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getDrinks } from '../redux/actions';

import BeverageAPI from '../services/BeverageRecipesAPI';

class DrinkDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueDrink: [],
      ingredients: [],
    };
    this.resultDrink = this.resultDrink.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
  }

  componentDidMount() {
    this.resultDrink();
  }

  getIngredients() {
    const { valueDrink } = this.state;
    const arrayIngredients = [];
    const DRINK = Object.entries(valueDrink[0]);

    if (DRINK) {
      DRINK.forEach(([key, value]) => {
        if (key.includes('strIngredient') && value) {
          arrayIngredients.push(value);
        }
      });
    }
    this.setState({ ingredients: arrayIngredients });
  }

  async resultDrink() {
    const { getDrinkId, match } = this.props;
    const { id } = match.params;
    const { payload } = await getDrinkId(id, BeverageAPI.getDrinkById);
    this.setState({ valueDrink: payload }, () => this.getIngredients());
  }

  render() {
    const { valueDrink, ingredients } = this.state;
    console.log(valueDrink);
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
              <h6 data-testid="recipe-category">{drink.strCategory}</h6>
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
              <p data-testid="instructions">{drink.strInstructions}</p>
              <img data-testid="video" src={ drink.strVideo } alt="video" />
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

DrinkDetails.propTypes = {
  drink: PropTypes.any,
  getDrinkById: PropTypes.any,
}.isRiquered;

const mapStateToProps = (state) => ({
  drink: state.random.list,
});

const mapDispatchToProps = (dispatch) => ({
  getDrinkId: (value, callback) => dispatch(getDrinks(value, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinkDetails);
