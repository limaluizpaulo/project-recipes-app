import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinkRandom } from '../actions/index';

import '../css/Buttons.css';

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
              <div className="explore-buttons">
                <Link to="/explorar/bebidas/ingredientes">
                  <Button
                    className="buttons"
                    type="button"
                    data-testid="explore-by-ingredient"
                  >
                    Por Ingredientes
                  </Button>
                </Link>
                <Link to={ `/bebidas/${drinkRandom[0].idDrink}` }>
                  <Button
                    className="buttons"
                    type="button"
                    data-testid="explore-surprise"
                  >
                    Me Surpreenda!
                  </Button>
                </Link>
              </div>
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
