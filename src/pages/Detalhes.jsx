import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../css/Details.css';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';
import Instructions from '../components/Instructions';
import Ingredients from '../components/Ingredients';
import DetailsHeader from '../components/DetailsHeader';
import SharedFavorites from '../components/SharedFavorites';

import { fetchDrinkDetails, fetchFoodDetails,
  startRecipe, getFoodDetails, fetchDrinksRecipes, fetchFoodRecipes } from '../action';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import identification from '../helper/dictionaryApi';
import CarouselCards from '../components/CarouselCards';

class Detalhes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: '',
      startedRecipe: false,
      finishedRecipe: false,
    };

    this.instrutionVideo = this.instrutionVideo.bind(this);
    this.cardsMeals = this.cardsMeals.bind(this);
    this.cardsDrinks = this.cardsDrinks.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.redirectForInProgress = this.redirectForInProgress.bind(this);
    this.checkStorage = this.checkStorage.bind(this);
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

  instrutionVideo(data) {
    const keyName = identification(data);
    return (
      <section>
        <h3>Video</h3>
        <section className="video">
          <ReactPlayer
            controls
            data-testid="video"
            url={ data[keyName.Youtube] }
            width="100%"
            height="100%"
          />
        </section>
      </section>
    );
  }

  cardsMeals() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
    const { meals } = this.props;
    const max = 6;
    const sliceMeals = meals.slice(0, max);
    return (
      <section>
        <Slider { ...settings }>
          {
            sliceMeals.map((measl, index) => (
              <CarouselCards
                url="/comidas"
                id={ measl.idMeal }
                key={ measl.idMeal }
                img={ measl.strMealThumb }
                title={ measl.strMeal }
                index={ index }
                subTitle={ measl.strCategory }
              />
            ))
          }
        </Slider>
      </section>
    );
  }

  cardsDrinks() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
    const { drinks } = this.props;
    const max = 6;
    const sliceDrinks = drinks.slice(0, max);
    return (
      <section>
        <Slider { ...settings }>
          {
            sliceDrinks.map((drink, index) => (
              <div key={ index }>
                <CarouselCards
                  url="/bebidas"
                  id={ drink.idDrink }
                  key={ index }
                  img={ drink.strDrinkThumb }
                  title={ drink.strDrink }
                  index={ index }
                  subTitle={ drink.strAlcoholic }
                />
              </div>
            ))
          }
        </Slider>
      </section>
    );
  }

  checkStorage() {
    const { match: { params: { id } } } = this.props;
    const { finishedRecipe } = this.state;

    if (localStorage.doneRecipes) {
      const checkDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

      if (checkDoneRecipes.some((item) => item.id === id)) {
        this.setState({ finishedRecipe: !finishedRecipe });
      }
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

  render() {
    const { startedRecipe, finishedRecipe } = this.state;
    const { details, isDrink } = this.props;
    return (
      <section className="page-details">
        <DetailsHeader data={ details } />
        <SharedFavorites />
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
            isDrink === false && this.instrutionVideo(details)
          }
          <section>
            <h3>Recomendadas</h3>
            {
              isDrink === false ? this.cardsDrinks() : this.cardsMeals()
            }
          </section>
        </section>
        <button
          className={ finishedRecipe ? 'invisible' : 'details-btn-startRecipe' }
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => {
            this.redirectForInProgress();
          } }
        >
          Iniciar Receita
        </button>
        <button
          className={ startedRecipe ? 'details-btn-startRecipe' : 'invisible' }
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
  drinks: PropTypes.arrayOf(PropTypes.shape).isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detalhes);
