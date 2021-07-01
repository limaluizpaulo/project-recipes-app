import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Beverages extends React.Component {
  constructor() {
    super();
    this.renderCards = this.renderCards.bind(this);
  }

  renderCards() {
    const { resultsApi: { drinks } } = this.props;
    const maxNumberOfCards = 11;
    if (drinks !== null) {
      return drinks.map((drink, index) => {
        if (index <= maxNumberOfCards) {
          return (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <h3 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h3>
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
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
        <Header title="Bebidas" />
        { this.renderCards() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultsApi: state.data.resultAPI,
});

Beverages.propTypes = {
  resultsApi: PropTypes.shape({
    drinks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Beverages);
