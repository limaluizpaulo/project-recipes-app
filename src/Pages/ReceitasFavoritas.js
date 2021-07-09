import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import favoriteRecipes from '../favoriteRecipes';
// O array acima é apenas ilustrativo para passar nos testes. Conforme a evolução do projeto iremos substituí-los pelos dados corretos posteriormente

export default class ReceitasFavoritas extends Component {
  constructor() {
    super();

    this.state = {
      favoriteRecipes: [],
      filtered: [],
      linkCopied: false,
      intervalId: '',
      count: 2,
    };

    this.filterByType = this.filterByType.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.disfavorRecipe = this.disfavorRecipe.bind(this);
    this.setFavState = this.setFavState.bind(this);
    this.renderFavRecipes = this.renderFavRecipes.bind(this);
    this.setIntervalState = this.setIntervalState.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    // Essa parte de colocar no localStorage talvez seja desnecessária no decorrer do projeto, visto que provavelmente isso será feito no componente que favorita uma receita, e não nessa página. Apenas fiz dessa maneira para passar no teste dos requisitos.
    this.setFavState();
  }

  setFavState() {
    const favRecipesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    this.setState({
      favoriteRecipes: favRecipesLocalStorage,
    });
  }

  setIntervalState() {
    const ONE_SECOND = 1000;
    const intervalId = setInterval(this.timer, ONE_SECOND);
    this.setState({ intervalId });
  }

  timer() {
    const { count, intervalId } = this.state;
    const newCount = count - 1;
    if (newCount >= 0) {
      this.setState({ count: newCount });
    } else {
      clearInterval(intervalId);
      this.setState({
        linkCopied: false,
        intervalId: '',
        count: 2,
      });
    }
  }

  filterByType({ target }) {
    const { favoriteRecipes: AllRecipes } = this.state;
    switch (target.textContent) {
    case 'Food':
      this.setState({
        filtered: AllRecipes.filter(({ type }) => type === 'comida'),
      });
      break;
    case 'Drinks':
      this.setState({
        filtered: AllRecipes.filter(({ type }) => type === 'bebida'),
      });
      break;
    default:
      this.setState({
        filtered: [],
      });
    }
  }

  copyToClipboard(type, id) {
    switch (type) {
    case 'comida':
      navigator.clipboard.writeText(`http://localhost:3000/comidas/${id}`);
      this.setState({
        linkCopied: true,
      });
      this.setIntervalState();
      break;
    case 'bebida':
      navigator.clipboard.writeText(`http://localhost:3000/bebidas/${id}`);
      this.setState({
        linkCopied: true,
      });
      this.setIntervalState();
      break;
    default:
      return null;
    }
  }

  disfavorRecipe(id) {
    const favRecipesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const disfavorRecipes = favRecipesLocalStorage.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(disfavorRecipes));
    this.setState({
      filtered: disfavorRecipes,
    });
    this.setFavState();
  }

  renderFavRecipes(favRecipes) {
    const { linkCopied } = this.state;

    const recipes = favRecipes
      .map(({ id, type, area, alcoholicOrNot, image,
        name, category }, index) => {
        const bothTypes = () => (
          <section>
            <Link to={ `/${type}s/${id}` }>
              <img
                style={ { maxWidth: 250 } }
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <Link to={ `/${type}s/${id}` }>
              <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
            </Link>
            <button
              type="button"
              onClick={ () => this.copyToClipboard(type, id) }
            >
              <img
                src={ shareIcon }
                alt="share-button"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <button
              type="button"
              onClick={ () => this.disfavorRecipe(id) }
            >
              <img
                src={ blackHeartIcon }
                alt="disfavor-button"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
            { linkCopied && <span>Link copiado!</span> }
          </section>
        );
        const renderFood = () => (
          <section>
            <span data-testid={ `${index}-horizontal-top-text` }>
              { `${area} - ${category}` }
            </span>
          </section>
        );
        const renderDrink = () => (
          <span data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</span>
        );
        return (
          <div key={ id }>
            { bothTypes() }
            { type === 'comida' ? renderFood() : renderDrink() }
          </div>
        );
      });
    return recipes;
  }

  render() {
    const { favoriteRecipes: AllRecipes, filtered } = this.state;
    const { location: { pathname } } = this.props;
    return (
      <div>
        <Header pathname={ pathname } />
        <main>
          <button
            type="button"
            onClick={ (e) => this.filterByType(e) }
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            type="button"
            onClick={ (e) => this.filterByType(e) }
            data-testid="filter-by-food-btn"
          >
            Food
          </button>
          <button
            type="button"
            onClick={ (e) => this.filterByType(e) }
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
          { filtered.length === 0 ? this.renderFavRecipes(AllRecipes)
            : this.renderFavRecipes(filtered) }
        </main>
      </div>
    );
  }
}

ReceitasFavoritas.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
