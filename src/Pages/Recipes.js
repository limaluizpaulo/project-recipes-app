import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Footer } from '../Components';
import RecipeCard from '../Components/RecipeCard';
import '../App.css';
import { requestCurrentRoute } from '../redux/actions';

class Recipes extends React.Component {
  render() {
    const { match: { params: { recipeType } } } = this.props;
    return (
      <div>
        <Header search />
        <RecipeCard recipeType={ recipeType } />
        <Footer />
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrentRoute: (route) => dispatch(requestCurrentRoute(route)),
});

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
};

export default connect(null, mapDispatchToProps)(Recipes);
