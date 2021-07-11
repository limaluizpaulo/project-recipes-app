import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import fetchAPI from '../services/fetchApi';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import BeveragesInProgressInfo from '../components/BeveragesInProgressInfo';

class BeveragesInProgress extends React.Component {
  constructor() {
    super();
    this.state = {
      detailsRecipe: [],
      isFavorite: false,
      copyLink: false,
      ingQuant: 0,
      setDisable: true,
      checkedIngredients: [],
    };
    this.renderIngredients = this.renderIngredients.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.fetchDetails = this.fetchDetails.bind(this);
    this.onClickShare = this.onClickShare.bind(this);
    this.onClickFavoriteIcon = this.onClickFavoriteIcon.bind(this);
    this.handleFavoriteLocalStorage = this.handleFavoriteLocalStorage.bind(this);
    this.verifyChecks = this.verifyChecks.bind(this);
    this.renderFavorite = this.renderFavorite.bind(this);
  }

  componentDidMount() {
    this.fetchDetails().then(() => this.renderNumber());
    this.handleFavoriteLocalStorage();
  }

  handleChecked({ target }) {
    const { detailsRecipe } = this.state;
    const ing = target.name;
    const { idDrink } = detailsRecipe[0];
    const prevStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const notFound = -1;

    if (prevStorage.cocktails[idDrink].indexOf(ing) === notFound) {
      prevStorage.cocktails[idDrink].push(ing);
    } else {
      const pos = prevStorage.cocktails[idDrink].indexOf(ing);
      prevStorage.cocktails[idDrink].splice(pos, 1);
    }
    this.setState({
      checkedIngredients: prevStorage.cocktails[idDrink],
    }, () => this.verifyChecks());
    localStorage.setItem('inProgressRecipes', JSON.stringify(prevStorage));
  }

  handleFavoriteLocalStorage() {
    const favoriteLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { match: { params: { id } } } = this.props;
    if (favoriteLocal) {
      favoriteLocal.map(({ id: idDrink, type }) => {
        if (type === 'bebida') {
          return (idDrink === id)
          && this.setState({ isFavorite: true });
        }
        return null;
      });
    }
  }

  onClickShare() {
    const url = window.location.href.split('/in-progress');
    copy(url[0]);
    this.setState({ copyLink: true });
  }

  onClickFavoriteIcon() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { match: { params: { id } } } = this.props;
    const { detailsRecipe } = this.state;
    const newFavorite = {
      id,
      type: 'bebida',
      area: '',
      category: detailsRecipe[0].strCategory,
      alcoholicOrNot: detailsRecipe[0].strAlcoholic,
      name: detailsRecipe[0].strDrink,
      image: detailsRecipe[0].strDrinkThumb,
    };
    if (favoriteRecipes) {
      const isFavorite = favoriteRecipes.find((recipe) => recipe.id === id);
      if (isFavorite) {
        this.setState({ isFavorite: false });
        const newArray = favoriteRecipes.filter((recipe) => recipe.id !== id);
        return localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify(newArray),
        );
      }
      this.setState({ isFavorite: true });
      const addFavorite = [...favoriteRecipes, newFavorite];
      return localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(addFavorite),
      );
    }
    this.setState({ isFavorite: true });
    return localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([newFavorite]),
    );
  }

  setInitialLocal() {
    const { match: { params: { id } } } = this.props;
    if (localStorage.getItem('inProgressRecipes') === null) {
      const obj = {
        cocktails: {
          [id]: [],
        },
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    } else {
      const prevStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (id in prevStorage.cocktails === false) {
        prevStorage.cocktails[id] = [];
        localStorage.setItem('inProgressRecipes', JSON.stringify(prevStorage));
      }
      this.setState({
        checkedIngredients: prevStorage.cocktails[id],
      });
    }
  }

  async fetchDetails() {
    const { match: { params: { id } } } = this.props;
    this.setInitialLocal();
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const responseAPI = await fetchAPI(url);
    const { drinks } = responseAPI;
    this.setState({ detailsRecipe: drinks });
  }

  verifyChecks() {
    const { ingQuant, checkedIngredients } = this.state;
    if (checkedIngredients.length === (ingQuant + 1)) {
      this.setState({ setDisable: false });
    } else {
      this.setState({ setDisable: true });
    }
  }

  renderNumber() {
    let ingNumber = 0;
    const { detailsRecipe } = this.state;
    const NUMBER_OF_INGREDIENTS = 20;
    const arrayIngredients = [];
    for (let index = 1; index < NUMBER_OF_INGREDIENTS; index += 1) {
      arrayIngredients.push(index);
    }
    return arrayIngredients.map((position, index) => {
      const ingredients = detailsRecipe[0][`strIngredient${position}`];
      if (ingredients === '' || ingredients === null || ingredients === undefined) {
        return null;
      }
      ingNumber = index;
      return this.setState({ ingQuant: ingNumber }, () => this.verifyChecks());
    });
  }

  renderFavorite() {
    const { isFavorite } = this.state;
    if (isFavorite) {
      return (
        <img src={ blackHeartIcon } alt="favorito" data-testid="favorite-btn" />
      );
    }
    return (
      <img src={ whiteHeartIcon } alt="favorito" data-testid="favorite-btn" />
    );
  }

  renderIngredients() {
    const { detailsRecipe, checkedIngredients } = this.state;
    const NUMBER_OF_INGREDIENTS = 20;
    const arrayIngredients = [];
    for (let index = 1; index < NUMBER_OF_INGREDIENTS; index += 1) {
      arrayIngredients.push(index);
    }
    return arrayIngredients.map((position, index) => {
      const ingredients = detailsRecipe[0][`strIngredient${position}`];
      const measure = detailsRecipe[0][`strMeasure${position}`];
      const ing = `${measure} ${ingredients}`;
      if (ingredients === '' || ingredients === null || ingredients === undefined) {
        return null;
      }
      return (
        <li
          key={ position }
          data-testid={ `${position - 1}-ingredient-step` }
          className={ checkedIngredients.includes(ing) ? 'checked' : null }
        >
          <input
            type="checkbox"
            checked={ checkedIngredients.includes(`${measure} ${ingredients}`) }
            onChange={ this.handleChecked }
            name={ ing }
          />
          {ing}
        </li>
      );
    });
  }

  render() {
    const { detailsRecipe, copyLink, setDisable } = this.state;
    if (detailsRecipe.length === 0) {
      return <div>Carregando</div>;
    }
    return (
      <BeveragesInProgressInfo
        detailsRecipe={ detailsRecipe }
        copyLink={ copyLink }
        setDisable={ setDisable }
        onClickShare={ this.onClickShare }
        onClickFavoriteIcon={ this.onClickFavoriteIcon }
        renderIngredients={ this.renderIngredients }
        renderFavorite={ this.renderFavorite }
      />
    );
  }
}

BeveragesInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default BeveragesInProgress;
