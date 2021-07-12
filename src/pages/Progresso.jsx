import React, { Component } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDrinkDetails, fetchFoodDetails, startRecipe } from '../action';
import Ingredients from '../components/Ingredients';
import '../css/Details.css';
import '../css/progress.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Instructions from '../components/Instructions';
import DetailsHeader from '../components/DetailsHeader';
import identification from '../helper/dictionaryApi';

class Progresso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favIcon: false,
      favIconColor: whiteHeartIcon,
      id: [],
      should: false,
      // recipesLength: [],
      count: 0,
      isDisable: false,
      allIngredients: [],
      link: false,
    };
    this.handleFavClick = this.handleFavClick.bind(this);
    this.updateState = this.updateState.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.saveDoneRecipes = this.saveDoneRecipes.bind(this);
    this.finishRecipe = this.finishRecipe.bind(this);
  }

  componentDidMount() {
    const { match: { params: { page, id } },
      foodDetails, drinksDetails, isStart } = this.props;
    isStart(true);

    const storage = Object.keys(localStorage);
    const check = storage.some((key) => key === 'inProgressRecipes');

    if (check === false) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ cocktails: {}, meals: {} }));
    }

    this.updateState();
    if (page === 'comidas') {
      return foodDetails(id);
    }
    return drinksDetails(id);
  }

  componentDidUpdate() {
    const { id, allIngredients } = this.state;
    const { match: { params: { page } } } = this.props;
    const recovery = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (page === 'comidas') {
      return localStorage.setItem('inProgressRecipes', JSON.stringify({ ...recovery,
        meals: { ...recovery.meals,
          [id]: allIngredients },
      }));
    }

    return localStorage.setItem('inProgressRecipes', JSON.stringify({ ...recovery,
      cocktails: { ...recovery.cocktails,
        [id]: allIngredients },
    }));
  }

  componentWillUnmount() {
    const { isStart } = this.props;
    isStart(false);
  }

  handleFavClick() {
    const { favIcon, id } = this.state;
    const { details, match: { params: { page } } } = this.props;
    const keyName = identification(details);
    const recovery = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (!favIcon) {
      this.setState({
        favIconColor: blackHeartIcon,
        favIcon: true,
      });
      const recipe = {
        id: details[keyName.Id],
        type: page,
        area: details[keyName.Area] ? details[keyName.Area] : '',
        category: details[keyName.Category] ? details[keyName.Category] : '',
        alcoholicOrNot: details[keyName.Alcoholic] ? details[keyName.Alcoholic] : '',
        name: details[keyName.Name],
        image: details[keyName.Thumb],
      };

      recovery.push(recipe);

      localStorage.setItem('favoriteRecipes', JSON.stringify(recovery));
    }
    if (favIcon) {
      this.setState({
        favIconColor: whiteHeartIcon,
        favIcon: false,
      });
      const favoriteKeys = recovery.filter((el) => el.id !== id) || {};
      console.log(favoriteKeys);
      localStorage.setItem('favoriteRecipes', JSON.stringify(recovery));
    }
  }

  handleClick() {
    const { isStart } = this.props;
    isStart(false);
  }

  onClick(param, element, boolean) {
    const { count, allIngredients } = this.state;
    // const {recipesLength, id, } = this.state  para fazer a lógica do disable funcionar vai ser necessário trocar ele no estado para true e descomentar parte do on click func

    if (allIngredients.includes(param) && boolean === 'checked') {
      element.classList.remove('riscado');

      return this.setState({
        allIngredients: allIngredients.filter((el) => el !== param) });
    }
    element.classList.add('riscado');
    this.setState({ ...allIngredients,
      allIngredients: [...allIngredients, param],

    });

    // if (count + 1 === recipesLength) {
    //   this.setState({ isDisable: false });
    // }
    this.setState({ count: count + 1 });
  }

  updateState() {
    const { match: { params: { id } } } = this.props;
    this.setState({ should: true, id });

    const recoveryFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(recoveryFavorite[id]);
    console.log(recoveryFavorite);
    if (recoveryFavorite[id] !== undefined) {
      console.log('entrei no recovery');
      this.setState({ favIconColor: blackHeartIcon,
        favIcon: true });
    }

    const recovery = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recovery.meals[id] !== undefined) {
      return this.setState({ allIngredients: recovery.meals[id] });
    }
    if (recovery.cocktails[id] !== undefined) {
      return this.setState({ allIngredients: recovery.cocktails[id] });
    }
  }

  test() {
    const { details, match: { params: { id, page } } } = this.props;
    const { should } = this.state;

    if (should === true) {
      if (page === 'comidas') {
        return this.setState({
          // recipesLength: total.length,
          id: details.idMeal, should: false });
      }
      return this.setState({
        // recipesLength: total.length,
        id, should: false });
    }
  }

  saveDoneRecipes() {
    const { details, match: { params: { page } } } = this.props;
    const keyName = identification(details);
    const currentDate = new Date().toLocaleDateString();
    const currentHour = new Date().toLocaleTimeString();
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

    const recipe = {
      id: details[keyName.Id],
      type: page,
      area: details[keyName.Area] ? details[keyName.Area] : '',
      category: details[keyName.Category] ? details[keyName.Category] : '',
      alcoholicOrNot: details[keyName.Alcoholic] ? details[keyName.Alcoholic] : '',
      name: details[keyName.Name],
      image: details[keyName.Thumb],
      doneDate: `${currentDate}, ${currentHour}`,
      tags: details[keyName.Tags] ? details[keyName.Tags] : '',
    };

    doneRecipes.push(recipe);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }

  finishRecipe() {
    const { match: { params: { id, page } } } = this.props;
    if (localStorage.inProgressRecipes) {
      const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

      if (page === 'comidas') {
        delete inProgress.meals[id];
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
      }

      if (page === 'bebidas') {
        delete inProgress.cocktails[id];
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
      }
    }
    this.saveDoneRecipes();
  }

  render() {
    const { details, match: { params: { page, id } } } = this.props;

    const { favIconColor, isDisable, allIngredients, link } = this.state;
    return (
      <section>
        { details.idMeal !== undefined && this.test()}
        <DetailsHeader data={ details } />
        <button
          className="details-btn-share"
          type="button"
          data-testid="share-btn"
          onClick={ () => copy(`http://localhost:3000/${page}/${id}`)
            .then(() => this.setState({ link: true })) }
        >
          <img src={ shareIcon } alt={ shareIcon } />
        </button>
        {link && <p>Link copiado!</p>}
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
                func={ this.onClick }
                state={ allIngredients }
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
            onClick={ () => {
              this.handleClick();
              this.finishRecipe();
            } }
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
  isStart: (e) => dispatch(startRecipe(e)),
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Progresso);
