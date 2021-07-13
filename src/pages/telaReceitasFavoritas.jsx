import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import { getSearchBarResponse } from '../action/index';

import '../css/TelaDeFavoritas.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class TelaReceitasFavoritas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favIconColor: blackHeartIcon,
      link: false,
      favoriteList: [],
    };

    this.isFavorite = this.isFavorite.bind(this);
    this.getFavoriteRecipes = this.getFavoriteRecipes.bind(this);
  }

  componentDidMount() {
    const { hasSearchBar } = this.props;

    this.getFavoriteRecipes();
    hasSearchBar(false);
  }

  getFavoriteRecipes() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    this.setState({ favoriteList: favoriteRecipes });
  }

  isFavorite(id) {
    const { favoriteList } = this.state;
    const filterFavorite = favoriteList.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavorite));

    this.setState({ favoriteList: filterFavorite });
  }

  func() {
    const { link } = this.state;
    return copy(`http://localhost:3000/`).then(() => this.setState({ link: !link }));
  }

  render() {
    const { location } = this.props;
    const { favIconColor, link, favoriteList } = this.state;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return (
      <section>
        <Header location={ location } />
        <section>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => this.setState({ favoriteList: favoriteRecipes }) }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => {
              this.setState({ favoriteList: favoriteRecipes
                .filter((recipe) => recipe.type === 'comida') });
            } }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => {
              this.setState({ favoriteList: favoriteRecipes
                .filter((recipe) => recipe.type === 'bebida') });
            } }
          >
            Drinks
          </button>
        </section>
        <section>
          {
            favoriteList.map(({
              type, name, id, image, area, category, alcoholicOrNot,
            }, index) => (
              <Card key={ name } className="favorite-card">
                <Link to={ `${type}s/${id}` }>
                  <Card.Img
                    className="favorite-card-img"
                    data-testid={ `${index}-horizontal-image` }
                    src={ image }
                  />
                </Link>
                <Card.Body className="favorite-card-body">
                  <Link to={ `${type}s/${id}` }>
                    <Card.Subtitle
                      data-testid={ `${index}-horizontal-top-text` }
                      className="favorite-card-subtitle"
                    >
                      {
                        (type === 'comida') ? `${area} - ${category}`
                          : alcoholicOrNot
                      }
                    </Card.Subtitle>
                    <Card.Title
                      className="favorite-card-title"
                      data-testid={ `${index}-horizontal-name` }
                    >
                      { name }
                    </Card.Title>
                  </Link>
                  <section className="favorite-buttons">
                    <button
                      type="button"
                      className="favorite-btn-share"
                      onClick={ () => this.func() }
                    >
                      <img
                        data-testid={ `${index}-horizontal-share-btn` }
                        src={ shareIcon }
                        alt={ shareIcon }
                      />
                    </button>
                    {link && <p>Link copiado!</p>}
                    <button
                      type="button"
                      className="favorite-btn"
                      onClick={ () => this.isFavorite(id) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        src={ favIconColor }
                        alt={ favIconColor }
                      />
                    </button>
                  </section>
                </Card.Body>
              </Card>
            ))
          }
        </section>
      </section>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  hasSearchBar: (e) => dispatch(getSearchBarResponse(e)),
});

TelaReceitasFavoritas.propTypes = {
  hasSearchBar: PropTypes.func.isRequired,
  location: PropTypes.shape,
}.isRequired;

export default connect(null, mapDispatchToProps)(TelaReceitasFavoritas);
