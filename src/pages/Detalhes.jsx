import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../css/Details.css';
import Instructions from '../components/Instructions';
import Ingredients from '../components/Ingredients';
import DetailsHeader from '../components/DetailsHeader';
import SharedFavorites from '../components/SharedFavorites';

import { fetchDrinkDetails, fetchFoodDetails,
  startRecipe, getFoodDetails, fetchDrinksRecipes, fetchFoodRecipes } from '../action';
import CardMeals from '../components/CardsMeals';
import CardsDrinks from '../components/CardsDrinks';
import InstrutionVideo from '../components/InstrutionVideo';

class Detalhes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: '',
      startedRecipe: false,
      finishedRecipe: false,
    };

    this.handleFetch = this.handleFetch.bind(this);
    this.redirectForInProgress = this.redirectForInProgress.bind(this);
    this.checkStorage = this.checkStorage.bind(this);
    this.btnStartRecipes = this.btnStartRecipes.bind(this);
    this.btnContinueRecipe = this.btnContinueRecipe.bind(this);
  }

  componentDidMount() {
    this.handleFetch();
    this.checkStorage();
  }

  componentDidUpdate() {
    const { match: { params: { id } } } = this.props;
    const { currentId } = this.state;
    if (id !== currentId) return this.handleFetch();
  }

  componentWillUnmount() {
    const { reboot } = this.props;
    reboot('');
  }

  handleFetch() {
    const {
      match: { params: { page, id } },
      foodDetails,
      drinksDetails,
      dispatchFoodRecipes,
      dispatchDrinks,
    } = this.props;

    this.setState({ currentId: id });
    dispatchFoodRecipes();
    dispatchDrinks();
    if (page === 'comidas') {
      return foodDetails(id);
    }
    return drinksDetails(id);
  }

  redirectForInProgress() {
    const { isStart, history, match: { params: { page, id } } } = this.props;
    history.push(`/${page}/${id}/in-progress`);
    isStart(true);
  }

  checkStorage() {
    const { match: { params: { id } } } = this.props;
    const { finishedRecipe } = this.state;

    if (localStorage.doneRecipes) {
      const checkDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

      checkDoneRecipes.forEach((recipe) => {
        if (recipe.id === id) {
          this.setState({ finishedRecipe: !finishedRecipe });
        }
      });
    }

    if (localStorage.inProgressRecipes) {
      const checkInProgressRecipes = JSON.parse(localStorage
        .getItem('inProgressRecipes'));

      const mealsKeys = Object.keys(checkInProgressRecipes.meals || {});
      const drinksKeys = Object.keys(checkInProgressRecipes.cocktails || {});

      if (mealsKeys.some((item) => item === id)) {
        this.setState({ startedRecipe: true });
      }

      if (drinksKeys.some((item) => item === id)) {
        this.setState({ startedRecipe: true });
      }
    }
  }

  btnStartRecipes() {
    return (
      <section>
        <button
          className="details-btn-startRecipe"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => {
            this.redirectForInProgress();
          } }
        >
          Iniciar Receita
        </button>
      </section>
    );
  }

  btnContinueRecipe() {
    return (
      <section>
        <button
          className="details-btn-startRecipe"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => {
            this.redirectForInProgress();
          } }
        >
          Continuar Receita
        </button>
      </section>
    );
  }

  render() {
    const { startedRecipe, finishedRecipe } = this.state;
    const { details, isDrink, match: { params: { page, id } } } = this.props;
    return (
      <section className="page-details">
        <DetailsHeader data={ details } />
        <SharedFavorites id={ id } page={ page } />
        <section className="details-content">
          <section>
            <h3>Ingredients</h3>
            <span className="details-ingredients">
              <Ingredients data={ details } />
            </span>
          </section>
          <section data-testid="instructions">
            <h3>Instructions</h3>
            <span className="details-intructions-text">
              <Instructions data={ details } />
            </span>
          </section>
          {
            isDrink === false && <InstrutionVideo data={ details } />
          }
          <section>
            <h3>Recomendadas</h3>
            {
              isDrink === false ? <CardsDrinks /> : <CardMeals />
            }
          </section>
        </section>
        { finishedRecipe ? null : this.btnStartRecipes() }
        { startedRecipe ? this.btnContinueRecipe() : null }
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  isStart: (e) => dispatch(startRecipe(e)),
  drinksDetails: (id) => dispatch(fetchDrinkDetails(id)),
  foodDetails: (id) => dispatch(fetchFoodDetails(id)),
  reboot: (e) => dispatch(getFoodDetails(e)),
  dispatchDrinks: () => dispatch(fetchDrinksRecipes()),
  dispatchFoodRecipes: () => dispatch(fetchFoodRecipes()),
});

const mapStateToProps = (state) => ({
  mealsDetails: state.foodCategories.recipeDetails,
  details: state.recipeDetails.details,
  isDrink: state.recipeDetails.isDrink,
  drinks: state.drinkCategories.drinks,
  meals: state.foodCategories.meals,
});

Detalhes.propTypes = {
  isStart: PropTypes.func.isRequired,
  drinksDetails: PropTypes.func.isRequired,
  foodDetails: PropTypes.func.isRequired,
  dispatchDrinks: PropTypes.func.isRequired,
  dispatchFoodRecipes: PropTypes.func.isRequired,
  reboot: PropTypes.func.isRequired,
  details: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
  history: PropTypes.shape.isRequired,
  isDrink: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detalhes);
