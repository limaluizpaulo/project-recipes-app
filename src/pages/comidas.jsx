import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/header';
import { fetchApiFoodCategories, fetchFoodRecipes } from '../action';
import Cards from '../components/cards';
import Footer from '../components/footer';

import '../css/comidas.css';

class Comidas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodCategories: [],
    };

    this.categories = this.categories.bind(this);
  }

  async componentDidMount() {
    const { apiFoodCategories, dispatchFoodRecipes } = this.props;
    apiFoodCategories();
    dispatchFoodRecipes();
    // await apiFoodCategories().then((data) => console.log(data));
  }

  categories() {
    const { getFoodCategories } = this.props;
    // const teste = getFoodCategories.map((elem) => elem);
    console.log(getFoodCategories);
    return (
      <div>
        { getFoodCategories.map((elem, index) => (
          <p key={ index }>{ elem.strCategory }</p>)) }
      </div>
    );
  }

  render() {
    // const { foodCategories } = this.state;
    // console.log(foodCategories);
    const { location, meals, getFoodCategories } = this.props;
    return (
      <div>
        <Header location={ location } />
        <main>
          <section>
            {
              getFoodCategories.map(({ strCategory }, index) => (
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
          <section className="cards-content">
            {
              meals.map((masl, index) => (
                <Cards
                  key={ index }
                  img={ masl.strMealThumb }
                  title={ masl.strMeal }
                  index={ index }
                />
              ))
            }
          </section>
        </main>
        { this.categories() }
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  apiFoodCategories: () => dispatch(fetchApiFoodCategories()),
  dispatchFoodRecipes: () => dispatch(fetchFoodRecipes()),
});

const mapStateToProps = (state) => ({
  getFoodCategories: state.foodCategories.allFoodCategories,
  meals: state.foodCategories.meals,
});

Comidas.propTypes = {
  apiFoodCategories: PropTypes.func,
  dispatchFoodRecipes: PropTypes.func.isRequired,
  getFoodCategories: PropTypes.objectOf(PropTypes.object),
  location: PropTypes.shape,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Comidas);
