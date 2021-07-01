import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApiFoodCategories, fetchFoodRecipes } from '../action';
import Cards from './cards';

class MainScreen extends Component {
  componentDidMount() {
    const { dispatchFoodCategories, dispatchFoodRecipes } = this.props;
    dispatchFoodCategories();
    dispatchFoodRecipes();
  }

  render() {
    const { foodCategories, meals } = this.props;
    console.log(foodCategories);
    return (
      <section>
        <section>
          {
            foodCategories.map(({ strCategory }, index) => (
              <button
                data-testid={ `data-testid=${strCategory}-category-filter` }
                type="button"
                key={ strCategory + index }
              >
                {strCategory}
              </button>
            ))
          }
        </section>
        <section>
          {
            meals.map((masl, index) => (
              <Cards key={ index } info={ masl } />
            ))
          }
        </section>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchFoodCategories: () => dispatch(fetchApiFoodCategories()),
  dispatchFoodRecipes: () => dispatch(fetchFoodRecipes()),
});

const mapStateToProps = (state) => ({
  foodCategories: state.foodCategories.allFoodCategories,
  meals: state.foodCategories.meals,
});

MainScreen.propTypes = {
  dispatchFoodCategories: PropTypes.func.isRequired,
  dispatchFoodRecipes: PropTypes.func.isRequired,
  foodCategories: PropTypes.shape.isRequired,
  meals: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
