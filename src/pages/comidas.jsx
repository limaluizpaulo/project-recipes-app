import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/header';
import { fetchApiFoodCategories,
  fetchFoodRecipes, getSearchBarResponse } from '../action';
import Cards from '../components/cards';
import Footer from '../components/footer';

import '../css/comidas.css';
import '../App.css';
import ButtonCategories from '../components/ButtonCategories';

class Comidas extends Component {
  constructor(props) {
    super(props);
    // ***VERIFICAR SE PRECISA DESSE ESTADO****
    // this.state = {
    //   foodCategories: [],
    // };

    this.categories = this.categories.bind(this);
  }

  async componentDidMount() {
    const { apiFoodCategories, dispatchFoodRecipes, hasSearchBar } = this.props;
    hasSearchBar(true);
    apiFoodCategories();
    dispatchFoodRecipes();
    // await apiFoodCategories().then((data) => console.log(data));
  }

  categories() {
    const { getFoodCategories } = this.props;
    // const teste = getFoodCategories.map((elem) => elem);
    // console.log(getFoodCategories);
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
          <ButtonCategories
            btnClass="btn-filterMeasls-cards"
            getCategories={ getFoodCategories }
          />
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
  hasSearchBar: (e) => dispatch(getSearchBarResponse(e)),
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
