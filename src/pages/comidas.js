import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';
import { fetchFoodIdAction, fetchDrinkAction } from '../actions';
import '../css/Page.css';

class comidas extends Component {
  constructor() {
    super();

    this.state = {
      btnVisible: true,
      btnMessage: 'Iniciar Receita',
    };
    this.verifyRecipes = this.verifyRecipes.bind(this);
  }

  componentDidMount() {
    const { match: { params: { comidaId } },
      requestFoodById, requestDrinkRecipes } = this.props;
    const foodId = comidaId.replace(/[^0-9]/g, '');
    requestFoodById(foodId);
    requestDrinkRecipes();
    try {
      this.verifyRecipes();
    } catch (error) {
      console.log(error);
    }
  }

  verifyRecipes() {
    const { match: { params: { comidaId: id } } } = this.props;
    if (localStorage.doneRecipes) {
      const searchDone = JSON.parse(localStorage.doneRecipes);
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
    const { recipeDetails, recipes, match: { params: { comidaId } } } = this.props;

    return (
      recipeDetails && recipes ? (
        <div className="page">
          <div className="recipe-container">
            <RecipeDetails
              recipeDetails={ recipeDetails }
              title="Comidas"
              recipes={ recipes }
              link={ pathname }
              id={ comidaId }
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

const mapStateToProps = (state) => ({
  recipeDetails: state.food.foodById,
  recipes: state.drink.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  requestFoodById: (id) => dispatch(fetchFoodIdAction(id)),
  requestDrinkRecipes: () => (dispatch(fetchDrinkAction())),
});

comidas.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(comidas);
