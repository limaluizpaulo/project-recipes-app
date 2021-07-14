import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

class DrinkProgress extends React.Component {
  constructor() {
    super();
    this.state = {
      like: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      like: !prevState.like,
    }));
  }

  render() {
    const { like } = this.state;
    const { drink: { drinks, ingredients, measures } } = this.props;
    const { strDrink, strDrinkThumb, strInstructions, strAlcoholic } = drinks;

    return (
      <main>
        <img data-testid="recipe-photo" alt="comida" src={ strDrinkThumb } />

        <button type="button" data-testid="share-btn" onClick={ this.takeURL }>
          <img src={ shareIcon } alt="shared" />
        </button>

        <button type="button" data-testid="favorite-btn" onClick={ this.handleClick }>
          { like ? <img src={ blackHeartIcon } alt="blackheart" />
            : <img src={ whiteHeartIcon } alt="whiteheart" /> }
        </button>

        <h1 data-testid="recipe-title">{ strDrink }</h1>

        <p data-testid="recipe-category">{ strAlcoholic }</p>

        { ingredients.map((e, i) => (
          <label
            htmlFor={ e }
            data-testid={ `${i}-ingredient-step` }
            key={ e }
          >
            <input
              data-testid={ `${i}-ingredient-name-and-measure` }
              id={ e }
              value={ e }
              type="checkbox"
            />
            <p data-testid={ `${i}-ingredient-name-and-measure` }>
              { `${e}  ${measures[i]}` }
            </p>
          </label>
        ))}

        <p data-testid="instructions">{ strInstructions }</p>

        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="button-details"
        >
          Finalizar Receita
        </button>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  drink: state.progressRecipe.recipe,
});

DrinkProgress.propTypes = {
  drink: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(DrinkProgress);
