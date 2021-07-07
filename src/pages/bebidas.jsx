import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';
import ButtonCategories from '../components/ButtonCategories';
import Cards from '../components/cards';
import Footer from '../components/footer';
import {
  fetchApiDrinkCategories,
  fetchDrinksRecipes,
  fetchFilterDrinkByCategories,
  getSearchBarResponse,
} from '../action/index';

class Bebidas extends Component {
  componentDidMount() {
    const { dispatchDrinks, apiDrinkCategories, drinks, hasSearchBar } = this.props;
    hasSearchBar(true);
    if (drinks.length === 0) {
      console.log('entrei');
      dispatchDrinks();
    }
    apiDrinkCategories();
  }

  render() {
    const {
      drinks,
      location,
      drinksCategories,
      drinkByCategories,
      dispatchDrinks,
      match,
    } = this.props;
    return (
      <div>
        <Header location={ location } />
        <main>
          <ButtonCategories
            btnClass="btn-filterDrinks-cards"
            getCategories={ drinksCategories }
            filter={ drinkByCategories }
            filterAll={ dispatchDrinks }
          />
          <section className="cards-content">
            {
              drinks.map((drink, index) => (
                <Cards
                  url={ match.path }
                  id={ drink.idDrink }
                  key={ index }
                  img={ drink.strDrinkThumb }
                  title={ drink.strDrink }
                  index={ index }
                />
              ))
            }
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchDrinks: () => dispatch(fetchDrinksRecipes()),
  apiDrinkCategories: () => dispatch(fetchApiDrinkCategories()),
  hasSearchBar: (e) => dispatch(getSearchBarResponse(e)),
  drinkByCategories: (category) => dispatch(fetchFilterDrinkByCategories(category)),
});

const mapStateToProps = (state) => ({
  drinks: state.drinkCategories.drinks,
  drinksCategories: state.drinkCategories.allDrinkCategories,
});

Bebidas.propTypes = {
  drinks: PropTypes.arrayOf(PropTypes.shape).isRequired,
  drinksCategories: PropTypes.arrayOf(PropTypes.shape).isRequired,
  dispatchDrinks: PropTypes.func.isRequired,
  apiDrinkCategories: PropTypes.func.isRequired,
  location: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
  hasSearchBar: PropTypes.func.isRequired,
  drinkByCategories: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bebidas);
