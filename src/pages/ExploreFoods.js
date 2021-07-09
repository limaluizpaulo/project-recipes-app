import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchFoodRandom } from '../actions/index';

import '../css/Buttons.css';

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
                <Button
                  className="buttons"
                  type="button"
                  data-testid="explore-by-ingredient"
                >
                  Por Ingredientes
                </Button>
              </Link>

              <Link to="/explorar/comidas/area">
                <Button
                  className="buttons"
                  type="button"
                  data-testid="explore-by-area"
                >
                  Por Local de Origem
                </Button>
              </Link>
              <Link to={ `/comidas/${foodRandom[0].idMeal}` }>
                <Button
                  className="buttons"
                  type="button"
                  data-testid="explore-surprise"
                >
                  Me Surpreenda!
                </Button>
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
