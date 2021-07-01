import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';
import ButtonCategories from '../components/ButtonCategories';
import Cards from '../components/cards';
import Footer from '../components/footer';
import { fetchApiDrinkCategories,
  fetchDrinksRecipes, getSearchBarResponse } from '../action';

class Bebidas extends Component {
  componentDidMount() {
    const { dispatchDrinks, apiDrinkCategories, hasSearchBar } = this.props;
    hasSearchBar(true);
    dispatchDrinks();
    apiDrinkCategories();
  }

  render() {
    const { drinks, location, drinksCategories } = this.props;
    return (
      <div>
        <Header location={ location } />
        <main>
          <ButtonCategories
            btnClass="btn-filterDrinks-cards"
            getCategories={ drinksCategories }
          />
          <section className="cards-content">
            {
              drinks.map((drink, index) => (
                <Cards
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
  hasSearchBar: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bebidas);
