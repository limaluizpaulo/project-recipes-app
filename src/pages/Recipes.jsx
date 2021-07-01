import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';
import { actionRecipes } from '../actions';

class Recipes extends Component {
  constructor(props) {
    super(props);

    this.fetchRecipes = this.fetchRecipes.bind(this);
  }

  componentDidMount() {
    this.fetchRecipes();
  }

  fetchRecipes() {
    const { recipes } = this.props;
    recipes();
  }

  render() {
    const { listRecipes } = this.props;
    if (!listRecipes) return (<h3>Loading...</h3>);
    return (
      <div>
        <Header header="Comidas" explorer />
        <h2>Recipes</h2>
        {listRecipes.map((recipe) => <h5 key={ recipe.strMeal }>{recipe.strMeal}</h5>)}
        <DownMenu />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  recipes: () => dispatch(actionRecipes()),
});
const mapStateToProps = (state) => ({
  listRecipes: state.recipes.recipes,
});

Recipes.propTypes = {
  recipes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
