import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinkRandom } from '../actions/index';

class ExploreDrinks extends Component {
  constructor() {
    super();

    this.randomDrink = this.randomDrink.bind(this);
  }

  componentDidMount() {
    this.randomDrink();
  }

  randomDrink() {
    const { requestDrinkRandom } = this.props;
    requestDrinkRandom();
  }

  render() {
    const { drinkRandom } = this.props;
    return (
      drinkRandom[0]
        ? (
          <>
            <section>
              <Header title="Explorar Bebidas" searchIcon />
              <Link to="/explorar/bebidas/ingredientes">
                <button
                  type="button"
                  data-testid="explore-by-ingredient"
                >
                  Por Ingredientes
                </button>
              </Link>
              <Link to={ `/bebidas/${drinkRandom[0].idDrink}` }>
                <button
                  type="button"
                  data-testid="explore-surprise"
                >
                  Me Surpreenda!
                </button>
              </Link>
            </section>
            <Footer />
          </>
        )
        : null
    );
  }
}

const mapStateToProps = (state) => ({
  drinkRandom: state.drink.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  requestDrinkRandom: () => dispatch(fetchDrinkRandom()),
});

ExploreDrinks.propTypes = {
  requestDrinkRandom: PropTypes.func.isRequired,
  drinkRandom: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreDrinks);
