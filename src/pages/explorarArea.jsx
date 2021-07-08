import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Footer from '../components/footer';
import Cards from '../components/cards';
import { fetchArea, fetchFoodRecipes, getSearchBarResponse } from '../action';
import fetchFoodRecipesByArea from '../services/servicesApi';

export class ExplorarArea extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchCountry, dispatchFoodRecipes, hasSearchBar } = this.props;
    fetchCountry();
    hasSearchBar(true);
    dispatchFoodRecipes();
  }

  handleChange({ target: { value } }) {
    const { dispatchFoodRecipesByArea, dispatchFoodRecipes } = this.props;
    if (value === 'All') {
      return dispatchFoodRecipes();
    }
    dispatchFoodRecipesByArea(value);
  }

  render() {
    const { location, country, meals } = this.props;
    return (
      <div>
        <Header location={ location } />
        <select onChange={ this.handleChange } data-testid="explore-by-area-dropdown">
          <option data-testid="All-option">
            All
          </option>
          {country && country.map((el, index) => (
            <option data-testid={ `${el.strArea}-option` } key={ index }>
              {el.strArea}
            </option>))}
        </select>
        <section>
          { meals.length !== 0
              && meals.map((measl, index) => (
                <Cards
                  url="/comidas"
                  id={ measl.idMeal }
                  key={ index }
                  img={ measl.strMealThumb }
                  title={ measl.strMeal }
                  index={ index }
                />
              ))}
        </section>
        area
        <Footer />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchCountry: () => dispatch(fetchArea()),
  dispatchFoodRecipes: () => dispatch(fetchFoodRecipes()),
  dispatchFoodRecipesByArea: (e) => dispatch(fetchFoodRecipesByArea(e)),
  hasSearchBar: (e) => dispatch(getSearchBarResponse(e)),

});

const mapStateToProps = (state) => ({
  country: state.foodArea.country.meals,
  meals: state.foodCategories.meals,
});

ExplorarArea.propTypes = {
  dispatchFoodRecipes: PropTypes.func.isRequired,
  location: PropTypes.shape.isRequired,
  hasSearchBar: PropTypes.func.isRequired,
  fetchCountry: PropTypes.func.isRequired,
  dispatchFoodRecipesByArea: PropTypes.func.isRequired,
  country: PropTypes.arrayOf(PropTypes.shape).isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape).isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(ExplorarArea);
