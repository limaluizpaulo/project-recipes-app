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
    const DRINK = valueDrink[0];
    const index = 1;
    const key = `strIngredient${index}`;
    // if (DRINK[key]) {
    // console.log(DRINK[key]);
    // let u = 1;
    // const valor = `strIngredient${u}`;
    // for (let i = 1; DRINK[valor] !== ''; i += 1) {
    //   arrayIngredients.push(DRINK[valor]);
    //   u += 1;
    // }
    // }
    this.setState({ ingredients: arrayIngredients });
  }

  async resultDrink() {
    const { getDrinkId, drink } = this.props;
    const { idDrink } = drink[0];
    const { payload } = await getDrinkId(idDrink, BeverageAPI.getDrinkById);
    this.setState({ valueDrink: payload }, () => this.getIngredients());
  }

  render() {
    const { valueDrink, ingredients } = this.state;
    // console.log(ingredients);
    return (
      <div>
        {valueDrink.map((drink, index) => (
          <img data-testid="recipe-photo" src={ drink.strDrinkThumb } alt="drink" width="300" />
        // <h1 data-testid="recipe-title">{drink.strDrink}</h1>
        // <button type="button" data-testid="share-btn">share</button>
        // <button type="button" data-testid="favorite-btn">favorite</button>
        // <h6 data-testid="recipe-category">{drink.strCategory}</h6>
        // <ul>
        //     <li data-testid={ `${index}-ingredient-name-and-measure` }>show</li>
        // </ul>
        // <p data-testid="instructions">instructions</p>
        // <img data-testid="video" alt="video" />
        // <div data-testid={ `${index}-recomendation-card` }>
        //   cards
        // </div>
        ))}
        <button type="button" data-testid="start-recipe-btn">iniciar receita</button>
      </div>
    );
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
