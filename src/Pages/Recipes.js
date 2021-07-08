import React from 'react';
import PropTypes from 'prop-types';
import { Header, Footer } from '../Components';
import RecipeCard from '../Components/RecipeCard';
import '../App.css';

class Recipes extends React.Component {
  render() {
    const { history, location: { pathname },
      match: { params: { recipeType } } } = this.props;

    return (
      <div>
        <Header pathname={ pathname } title={ recipeType } search />
        <RecipeCard history={ history } recipeType={ recipeType } />
        <Footer />
      </div>);
  }
}

Recipes.propTypes = {
  recipes: PropTypes.shape({
    meals: PropTypes.shape(),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeType: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default Recipes;
