import React from 'react';
import PropTypes from 'prop-types';
import { Header, Footer } from '../Components';
import RecipeCardByIngredient from '../Components/RecipeCardByIngredient';
import '../App.css';

class RecipesByIngredient extends React.Component {
  render() {
    const { location: { pathname },
      match: { params: { recipeType, ingredientName } } } = this.props;

    return (
      <div>
        <Header pathname={ pathname } title={ recipeType } search />
        <RecipeCardByIngredient
          recipeType={ recipeType }
          ingredientName={ ingredientName }
        />
        <Footer />
      </div>);
  }
}

RecipesByIngredient.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeType: PropTypes.string.isRequired,
      ingredientName: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default RecipesByIngredient;
