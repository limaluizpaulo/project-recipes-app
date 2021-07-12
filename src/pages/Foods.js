import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';
import { fetchFoodAction } from '../actions';
import FoodButtons from '../components/FoodButtons';

class Foods extends Component {
  constructor() {
    super();

    this.requisicao = this.requisicao.bind(this);
  }

  componentDidMount() {
    const { resultFood } = this.props;
    if (resultFood.length === 0) this.requisicao();
  }

  requisicao() {
    const { requestFoodRecipes } = this.props;
    requestFoodRecipes();
  }

  render() {
    const { resultFood } = this.props;
    return (
      <div className="page">
        <Header title="Comidas" />
        <FoodButtons />
        <div className="cards-container">
          {resultFood ? <FoodCard /> : null}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultFood: state.food.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  requestFoodRecipes: () => (dispatch(fetchFoodAction())),
});

Foods.propTypes = {
  requestFoodRecipes: PropTypes.func.isRequired,
  resultFood: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
