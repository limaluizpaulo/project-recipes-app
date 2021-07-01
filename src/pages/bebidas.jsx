import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Cards from '../components/cards';
import Footer from '../components/footer';
import { fetchDrinksRecipes } from '../action';

class Bebidas extends Component {
  componentDidMount() {
    const { dispatchDrinks } = this.props;
    dispatchDrinks();
  }

  render() {
    const { drinks } = this.props;
    return (
      <div>
        <Header />
        <main>
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
});

const mapStateToProps = (state) => ({
  drinks: state.drinkCategories.drinks,
});

Bebidas.propTypes = {
  drinks: PropTypes.arrayOf(PropTypes.shape).isRequired,
  dispatchDrinks: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bebidas);
