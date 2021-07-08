import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchFoodIngredientsAction } from '../actions';
import IngredientCard from '../components/IngredientCard';

class ExploreFoodsIngredients extends Component {
  componentDidMount() {
    const { requestIngredients } = this.props;
    requestIngredients();
  }

  render() {
    const { ingredients } = this.props;
    return (
      ingredients ? (
        <>
          <section>
            <Header title="Explorar Ingredientes" searchIcon />
            <IngredientCard ingredients={ ingredients } />
          </section>
          <Footer />
        </>)
        : null
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestIngredients: () => dispatch(fetchFoodIngredientsAction()),
});

const mapStateToProps = (state) => ({
  ingredients: state.food.ingredients,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFoodsIngredients);
