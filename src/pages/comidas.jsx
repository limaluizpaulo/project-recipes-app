import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/header';
import { fetchApiFoodCategories } from '../action';

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
    // const { foodCategories } = this.state;
    // console.log(foodCategories);
    return (
      <div>
        <Header />
        { this.categories() }
        <p>qualquer coisa</p>
      </div>
    );
  }
}

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
