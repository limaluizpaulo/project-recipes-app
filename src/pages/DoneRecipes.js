import React from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';

class DoneRecipes extends React.Component {
  constructor() {
    super();
    this.state = {
      doneRecipes: [],
      copyLink: false,
    };
    this.getDoneRecipes = this.getDoneRecipes.bind(this);
    this.onClickShare = this.onClickShare.bind(this);
  }

  componentDidMount() {
    this.getDoneRecipes();
  }

  onClickShare(link) {
    const startLink = window.location.href;
    const split = startLink.split('/r');
    console.log(split);
    copy(`${split[0]}${link}`);
    this.setState({
      copyLink: true,
    });
  }

  getDoneRecipes() {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      return this.setState({
        doneRecipes,
      });
    }
    return null;
  }

  renderDoneRecipes() {
    const { doneRecipes, copyLink } = this.state;
    return doneRecipes.map((recipe, index) => {
      const link = `/${recipe.type}s/${recipe.id}`;
      const recipeInfo = `${recipe.area} - ${recipe.category}`;
      return (
        <section key={ recipe.id }>
          <Link to={ link }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
              width="180"
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'comida' ? recipeInfo : recipe.alcoholicOrNot }
          </p>
          <Link to={ link }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <p>{ copyLink ? 'Link copiado!' : null }</p>
          <button
            type="button"
            onClick={ () => this.onClickShare(link) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="Compartilhar"
            />
          </button>
          {recipe.tags.map((tag, twoTag) => {
            if (twoTag > 2 || tag === null) {
              return null;
            }
            return (
              <div data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>
                {tag}
              </div>
            );
          })}
        </section>
      );
    });
  }

  renderFilterDoneRecipe(type) {
    const { doneRecipes } = this.state;
    const filter = doneRecipes.filter((recipe) => recipe.type === type);
    this.setState({
      doneRecipes: filter,
    });
  }

  render() {
    return (
      <section>
        <Header title="Receitas Feitas" />
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ this.getDoneRecipes }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => this.renderFilterDoneRecipe('comida') }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => this.renderFilterDoneRecipe('bebida') }
        >
          Drinks
        </button>
        {this.renderDoneRecipes()}
      </section>
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default DoneRecipes;
