import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Food extends React.Component {
  constructor() {
    super();
    this.renderCards = this.renderCards.bind(this);
  }

  renderCards() {
    const { resultsApi: { meals } } = this.props;
    const maxNumberOfCards = 11;
    if (meals !== null) {
      return meals.map((food, index) => {
        if (index <= maxNumberOfCards) {
          return (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <h3 data-testid={ `${index}-card-name` }>{ food.strMeal }</h3>
              <img
                src={ food.strMealThumb }
                alt={ food.strMeal }
                data-testid={ `${index}-card-img` }
                width="150px"
              />
            </div>
          );
        }
        return null;
      });
    }
  }

  render() {
    return (
      <div>
        <Header title="Comidas" />
        { this.renderCards() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultsApi: state.data.resultAPI,
});

Food.propTypes = {
  resultsApi: PropTypes.shape({
    meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Food);
