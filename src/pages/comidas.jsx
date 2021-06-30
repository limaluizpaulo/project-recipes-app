import React, { Component } from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import { connect } from 'react-redux';
import Header from '../components/header';
import { fetchApiFoodCategories } from '../action';
=======
import Header from '../components/header';
import MainScreen from '../components/MainScreen';

import Cards from '../components/cards';
import Fooder from '../components/footer';
>>>>>>> c3b4e90ed38ed0a5e794fb15943eb765ca9ea69f

class Comidas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodCategories: [],
    };

    this.categories = this.categories.bind(this);
  }

  componentDidMount() {
    const { apiFoodCategories } = this.props;
    apiFoodCategories();
  }

  categories() {
    const { getFoodCategories } = this.props;
    const teste = getFoodCategories;
    console.log(teste);
    return (

      <div>
        { teste.map((elem, index) => (
          <p key={ index }>{ elem }</p>)) }
      </div>
    );
  }

  render() {
<<<<<<< HEAD
    // const { foodCategories } = this.state;
    // console.log(foodCategories);
    return (
      <div>
        <Header />
        { this.categories() }
=======
    const { location } = this.props;
    return (
      <div>
        <Header location={ location } />
        <main>
          <Header />
          <MainScreen />
        </main>
>>>>>>> c3b4e90ed38ed0a5e794fb15943eb765ca9ea69f
        <p>qualquer coisa</p>
        <Fooder />
      </div>
    );
  }
}

<<<<<<< HEAD
const mapDispatchToProps = (dispatch) => ({
  apiFoodCategories: () => dispatch(fetchApiFoodCategories()),
});

const mapStateToProps = (state) => ({
  getFoodCategories: state.foodCategories.allFoodCategories,
});

Comidas.propTypes = {
  apiFoodCategories: PropTypes.func,
  getFoodCategories: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Comidas);
=======
Comidas.propTypes = {
  location: PropTypes.shape.isRequired,
};
// export default Comidas;
export default (Comidas);
>>>>>>> c3b4e90ed38ed0a5e794fb15943eb765ca9ea69f
