import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import IngredientCard from '../Components/IngredientCard';

class ExploreIngredientes extends React.Component {
  constructor() {
    super();

    this.state = {
      ingredients: [],
    };

    this.fetchIngredients = this.fetchIngredients.bind(this);
    this.setIngredientsToState = this.setIngredientsToState.bind(this);
  }

  componentDidMount() {
    this.fetchIngredients()
      .then((ingredients) => this.setIngredientsToState(ingredients));
  }

  setIngredientsToState(ingredients) {
    const arrayOfIngredients = Object.values(ingredients)[0];
    this.setState({
      ingredients: arrayOfIngredients,
    });
  }

  fetchInfo(url) {
    return fetch(url)
      .then((response) => (
        response
          .json()
          .then((json) => (response.ok
            ? Promise.resolve((json)) : Promise.reject(json)))
      ));
  }

  fetchIngredients() {
    const { match: { params: { recipeType } } } = this.props;
    switch (recipeType) {
    case 'comidas':
      return this.fetchInfo('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    case 'bebidas':
      return this.fetchInfo('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    default:
      break;
    }
  }

  render() {
    const { location: { pathname }, match: { params: { recipeType } } } = this.props;
    const { ingredients } = this.state;

    return (
      <div>
        <Header pathname={ pathname } />
        { ingredients.length === 0 ? <span>Carregando...</span>
          : <IngredientCard recipeType={ recipeType } ingredients={ ingredients } /> }
        <Footer />
      </div>
    );
  }
}

ExploreIngredientes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeType: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ExploreIngredientes;
