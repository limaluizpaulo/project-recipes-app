import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { fetchFoodRandom } from '../actions/index';

class ExploreFoods extends Component {
  constructor() {
    super();

    this.randomFood = this.randomFood.bind(this);
  }

  componentDidMount() {
    this.randomFood();
  }

  randomFood() {
    const { requestFoodRandom } = this.props;
    requestFoodRandom();
  }

  render() {
    const { foodRandom } = this.props;
    return (
      foodRandom[0]
        ? (
          <>
            <section>
              <Header title="Explorar Comidas" searchIcon />
              <Link to="/explorar/comidas/ingredientes">
                <button
                  type="button"
                  data-testid="explore-by-ingredient"
                >
                  Por Ingredientes
                </button>
              </Link>

              <Link to="/explorar/comidas/area">
                <button
                  type="button"
                  data-testid="explore-by-area"
                >
                  Por Local de Origem
                </button>
              </Link>
              <Link to={ `/comidas/${foodRandom[0].idMeal}` }>
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
  foodRandom: state.food.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  requestFoodRandom: () => dispatch(fetchFoodRandom()),
});

ExploreFoods.propTypes = {
  requestFoodRandom: PropTypes.func.isRequired,
  foodRandom: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFoods);
