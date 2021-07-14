import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

class MealProgress extends React.Component {
  constructor() {
    super();
    this.state = {
      like: false,
      end: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      like: !prevState.like,
    }));
  }

  handleEnd() {
    this.setState((prevState) => ({
      end: !prevState.end,
    }));
  }

  render() {
    const { like, end } = this.state;
    const { meal: { meals, ingredients, measures } } = this.props;
    const { strMeal, strMealThumb, strCategory, strInstructions } = meals;

    if (end) return <Redirect to="/receitas-feitas" />;
    return (
      <main>
        <img data-testid="recipe-photo" alt="comida" src={ strMealThumb } />

        <button type="button" data-testid="share-btn" onClick={ this.takeURL }>
          <img src={ shareIcon } alt="shared" />
        </button>

        <button type="button" data-testid="favorite-btn" onClick={ this.handleClick }>
          { like ? <img src={ blackHeartIcon } alt="blackheart" />
            : <img src={ whiteHeartIcon } alt="whiteheart" /> }
        </button>

        <h1 data-testid="recipe-title">{ strMeal }</h1>

        <p data-testid="recipe-category">{ strCategory }</p>

        { ingredients.map((e, i) => (
          <label
            htmlFor={ e }
            data-testid={ `${i}-ingredient-step` }
            key={ e }
          >
            <input
              id={ e }
              value={ e }
              type="checkbox"
            />
            <span>{ `${e}  ${measures[i]}` }</span>
          </label>
        ))}

        <p data-testid="instructions">{ strInstructions }</p>

        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="button-details"
          onClick={ this.handleEnd }
        >
          Finalizar receita
        </button>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  meal: state.progressRecipe.recipe,
});

MealProgress.propTypes = {
  meal: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(MealProgress);
