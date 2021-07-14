import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchFoodIngredientsAction } from '../actions/ingredientsActions';
import IngredientCard from '../components/IngredientCard';

class ExploreFoodsIngredients extends Component {
  componentDidMount() {
    const { requestIngredients } = this.props;
    requestIngredients();
  }

  render() {
    const { ingredients, location: { pathname } } = this.props;
    return (
      ingredients ? (
        <div className="page">
          <div className="perfil-container">
            <section className="ingredients-container">
              <Header title="Explorar Ingredientes" searchIcon />
              <IngredientCard ingredients={ ingredients } pathname={ pathname } />
            </section>
            <Footer />
          </div>
        </div>)
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

ExploreFoodsIngredients.propTypes = {
  requestIngredients: PropTypes.func,
  ingredients: PropTypes.arrayOf(Object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExploreFoodsIngredients);
