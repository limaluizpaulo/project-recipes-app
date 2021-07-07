import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/header';
import { fetchApiFoodCategories,
  fetchFilterFoodByCategories,
  fetchFoodDetails,
  fetchFoodRecipes, getSearchBarResponse } from '../action';
import Cards from '../components/cards';
import Footer from '../components/footer';

import '../css/comidas.css';
import '../App.css';
import ButtonCategories from '../components/ButtonCategories';

class Comidas extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   checked: false,
    // };

    this.categories = this.categories.bind(this);
    // this.redirect = this.redirect.bind(this);
  }

  async componentDidMount() {
    const { apiFoodCategories, dispatchFoodRecipes, hasSearchBar, meals } = this.props;
    hasSearchBar(true);
    console.log(meals);
    if (meals.length === 0) {
      console.log('entrei');
      dispatchFoodRecipes();
    }
    apiFoodCategories();
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

  // redirect(id) {
  //   return <Redirect to="/comidas/512456" />;
  // }

  render() {
    const {
      location,
      meals,
      getFoodCategories,
      dispatchFoodRecipes,
      foodByCategories,
      match,
      foodDetails,
    } = this.props;
    return (
      <div>
        <Header location={ location } />
        <main>
          <ButtonCategories
            btnClass="btn-filterMeasls-cards"
            getCategories={ getFoodCategories }
            filter={ foodByCategories }
            filterAll={ dispatchFoodRecipes }
          />
          <section className="cards-content">
            {
              meals.map((measl, index) => (
                <Cards
                  url={ match.path }
                  id={ measl.idMeal }
                  key={ index }
                  img={ measl.strMealThumb }
                  title={ measl.strMeal }
                  index={ index }
                  details={ foodDetails }
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
  foodByCategories: (category) => dispatch(fetchFilterFoodByCategories(category)),
  foodDetails: (id) => dispatch(fetchFoodDetails(id)),
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
