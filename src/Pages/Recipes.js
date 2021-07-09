import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Footer } from '../Components';
import RecipeCard from '../Components/RecipeCard';
import '../App.css';
import { setRecipeType } from '../redux/actions';

class Recipes extends React.Component {
  componentDidMount() {
    const { saveRecipeType, match: { params: { recipeType } } } = this.props;
    saveRecipeType(recipeType);
  }

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
  saveRecipeType: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveRecipeType: (recipeType) => dispatch(setRecipeType(recipeType)),
});

export default connect(null, mapDispatchToProps)(Recipes);
