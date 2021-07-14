import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchApiAction } from '../redux/actions';
import fetchAPI from '../services/fetchApi';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.fetchFood = this.fetchFood.bind(this);
    this.fetchBeverages = this.fetchBeverages.bind(this);
    this.OnClickSearch = this.OnClickSearch.bind(this);
    this.onSingleRecipeReturn = this.onSingleRecipeReturn.bind(this);
    this.state = {
      input: '',
      filter: '',
      API: {},
    };
  }

  onChangeInput({ target }, type) {
    return this.setState({
      [type]: target.value,
    });
  }

  onSingleRecipeReturn() {
    const { history } = this.props;
    const { API } = this.state;
    if (API.drinks && API.drinks.length === 1) {
      return history.push(`/bebidas/${API.drinks[0].idDrink}`);
    }
    if (API.meals && API.meals.length === 1) {
      return history.push(`/comidas/${API.meals[0].idMeal}`);
    }
    if (API.meals === null || API.drinks === null) {
      return global
        .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    return null;
  }

  async fetchFood() {
    const { SendApiToState } = this.props;
    const { input, filter } = this.state;
    let url;
    if (filter === 'Ingrediente') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
    }
    if (filter === 'Nome') {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
    }
    if (filter === 'Primeira Letra') {
      if (input.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;
    }
    const responseAPI = await fetchAPI(url);
    SendApiToState(responseAPI);
    return this.setState({
      API: responseAPI,
    }, () => this.onSingleRecipeReturn());
  }

  async fetchBeverages() {
    const { SendApiToState } = this.props;
    const { input, filter } = this.state;
    let url;
    if (filter === 'Ingrediente') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`;
    }
    if (filter === 'Nome') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
    }
    if (filter === 'Primeira Letra') {
      if (input.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`;
    }
    const responseAPI = await fetchAPI(url);
    SendApiToState(responseAPI);
    return this.setState({
      API: responseAPI,
    }, () => this.onSingleRecipeReturn());
  }

  OnClickSearch() {
    const { title } = this.props;
    if (title === 'Comidas') {
      return this.fetchFood();
    }
    if (title === 'Bebidas') {
      return this.fetchBeverages();
    }
    return null;
  }

  render() {
    return (
      <form className="searchBar-form">
        <label htmlFor="search">
          <input
            className="searchBar-input"
            type="text"
            placeholder="Buscar receita"
            data-testid="search-input"
            onChange={ (event) => this.onChangeInput(event, 'input') }
            id="search"
          />
        </label>
        <button
          variant="primary"
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => this.OnClickSearch() }
        >
          Buscar
        </button>
        {['radio'].map((type) => (
          <div key={ `inline-${type}` } className="searchBar-radio-div">
            <label htmlFor="Ingrediente">
              <input
                id="Ingrediente"
                name="radio"
                value="Ingrediente"
                type={ type }
                data-testid="ingredient-search-radio"
                onChange={ (event) => this.onChangeInput(event, 'filter') }
              />
              Ingrediente
            </label>
            <label htmlFor="Nome">
              <input
                id="Nome"
                name="radio"
                value="Nome"
                type={ type }
                data-testid="name-search-radio"
                onChange={ (event) => this.onChangeInput(event, 'filter') }
              />
              Nome
            </label>
            <label htmlFor="Primeira Letra">
              <input
                id="Primeira Letra"
                name="radio"
                value="Primeira Letra"
                type={ type }
                data-testid="first-letter-search-radio"
                onChange={ (event) => this.onChangeInput(event, 'filter') }
              />
              Primeira Letra
            </label>
          </div>
        ))}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  SendApiToState: (payload) => dispatch(fetchApiAction(payload)),
});

SearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  SendApiToState: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(withRouter(SearchBar));
