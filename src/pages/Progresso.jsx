import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDrinkDetails, fetchFoodDetails, startRecipe } from '../action';

import Ingredients from '../components/Ingredients';
import '../css/Details.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Instructions from '../components/Instructions';
import DetailsHeader from '../components/DetailsHeader';

// import identification from '../helper/dictionaryApi';

class Progresso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favIcon: false,
      favIconColor: whiteHeartIcon,
      //  id: [],
      //  should: false,
      recipesLength: [],
      count: 0,
      isDisable: true,
    };
    this.handleFavClick = this.handleFavClick.bind(this);
    this.updateState = this.updateState.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const { match: { params: { page, id } },
      foodDetails, drinksDetails, isStart } = this.props;
    isStart();
    // recovery.push(localStorage.setItem('inProgressRecipes', ''));
    this.updateState();
    console.log(localStorage);
    if (localStorage.length === 0) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({ cocktails: {}, meals: {} }));
    }

    if (page === 'comidas') {
      return foodDetails(id);
    }
    return drinksDetails(id);
  }

  handleFavClick() {
    const { favIcon } = this.state;
    if (!favIcon) {
      this.setState({
        favIconColor: blackHeartIcon,
        favIcon: true,
      });
    }
    if (favIcon) {
      this.setState({
        favIconColor: whiteHeartIcon,
        favIcon: false,
      });
    }
  }

  // test(param) {
  //   const { details, location } = this.props;
  //   const { id, recipesLength, should } = this.state;
  //   console.log(details);

  //   const total = [];

  //   if (should === true) {
  //     const keyName = identification(details);
  //     // console.log(keyName);

  //     keyName.Ingredients.map((ingredient) => {
  //       if (param[ingredient[0]] !== null && param[ingredient[0]] !== '') {
  //         total.push(ingredient[0]);
  //         // console.log(param[ingredient[0]]);
  //       }
  //       return this.setState({ recipesLength: total.length, id: details.idMeal, should: false });
  //     });
  //   }

  //   if (details !== undefined && location.pathname.includes('comidas')) {
  //     const { id } = this.state;
  //     if (param !== null) {
  //       // return this.setState({ id: param, should: true });
  //       const recovery = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //       console.log(recovery);
  //       recovery.meals[details.idMeal] = 'pão';

  //       // const meals = [];
  //       // meals.push(recovery);
  //       // // meals.push(details.idMeal);
  //       localStorage.setItem('inProgressRecipes', JSON.stringify(recovery));
  //       // return console.log('setei o id');
  //     }
  //     // meals.push(id);
  //   }
  //   if (details !== undefined && location.pathname.includes('bebidas')) {
  //     const meals = { id: details.idMeal };
  //     localStorage.setItem('inProgressRecipes', JSON.stringify({ meals }));
  //     return console.log(meals);
  //   }
  // }

  onClick() {
    const { count, recipesLength } = this.state;
    if (count + 1 === recipesLength) {
      this.setState({ isDisable: false });
    }
    this.setState({ count: count + 1 });
  }
  //   updateState() {
  //     const { id } = this.state;
  //     this.setState({ should: true });
  //   }

  render() {
    const { details } = this.props;
    const { favIconColor, isDisable, count, recipesLength } = this.state;
    return (
      <section>
        { details.idMeal !== undefined && this.test(details)}
        <DetailsHeader data={ details } />
        <button
          className="details-btn-share"
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt={ shareIcon } />
        </button>
        <button
          className="details-btn-favorite"
          type="button"
          data-testid="favorite-btn"
          onClick={ this.handleFavClick }
        >
          <img src={ favIconColor } alt={ favIconColor } />
        </button>
        <section className="details-content">
          <section>
            <h3>Ingredients</h3>
            <span className="details-ingredients">
              <Ingredients
                data={ details }
                count={ count }
                func={ this.onClick }
                recipesLength={ recipesLength }
              />
            </span>
          </section>
          <section data-testid="instructions">
            <h3>Instructions</h3>
            <span className="details-intructions-text">
              <Instructions data={ details } />
            </span>
          </section>
          <button
            className="details-btn-startRecipe"
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ () => console.log('pão de queijo') }
            disabled={ isDisable }
          >
            Finalizar Receita
          </button>
        </section>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  isStart: () => dispatch(startRecipe()),
  drinksDetails: (id) => dispatch(fetchDrinkDetails(id)),
  foodDetails: (id) => dispatch(fetchFoodDetails(id)),
});

const mapStateToProps = (state) => ({
  details: state.recipeDetails.details,
});

Progresso.propTypes = {
  isStart: PropTypes.func.isRequired,
  drinksDetails: PropTypes.func.isRequired,
  foodDetails: PropTypes.func.isRequired,
  details: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
//   location: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Progresso);
