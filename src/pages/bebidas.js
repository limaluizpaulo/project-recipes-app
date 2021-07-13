import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';
import { fetchDrinkIdAction, fetchFoodAction } from '../actions';
import '../css/Page.css';

class bebidas extends Component {
  constructor() {
    super();

    this.state = {
      btnVisible: true,
      btnMessage: 'Iniciar Receita',
    };
    this.verifyRecipes = this.verifyRecipes.bind(this);
  }

  componentDidMount() {
    const { match: { params: { bebidaId } },
      requestDrinkById, requestFoodRecipes } = this.props;
    requestDrinkById(bebidaId);
    requestFoodRecipes();
    try {
      this.verifyRecipes();
    } catch (error) {
      console.log(error);
    }
  }

  verifyRecipes() {
    const { match: { params: { bebidaId: id } } } = this.props;
    if (localStorage.doneRecipes) {
      const searchDone = JSON.parse(localStorage.doneRecipes);
      searchDone.find((item) => item.id === id);
      if (searchDone.find((item) => item.id === id)) {
        this.setState({ btnVisible: false });
      }
    }
    if (localStorage.inProgressRecipes) {
      const getRecipes = JSON.parse(localStorage.inProgressRecipes);
      const inProgres = Object.keys(getRecipes)
        .map((key) => Object.keys(getRecipes[key]).includes(id));
      if (inProgres.includes(true)) {
        this.setState({ btnMessage: 'Continuar Receita' });
      }
    }
  }

  render() {
    const { btnMessage, btnVisible } = this.state;
    const { location: { pathname } } = this.props;
    const { recipeDetails, recipes, match: { params: { bebidaId } } } = this.props;
    return (
      recipeDetails && recipes ? (
        <div className="page">
          <div className="recipe-container">
            <RecipeDetails
              recipeDetails={ recipeDetails }
              title="Bebidas"
              recipes={ recipes }
              link={ pathname }
              id={ bebidaId }
              btnVisible={ btnVisible }
              btnMessage={ btnMessage }
            />
          </div>
        </div>
      )
        : null
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestDrinkById: (id) => dispatch(fetchDrinkIdAction(id)),
  requestFoodRecipes: () => (dispatch(fetchFoodAction())),
});

const mapStateToProps = (state) => ({
  recipeDetails: state.drink.drinkById,
  recipes: state.food.recipes,
});

bebidas.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(bebidas);
