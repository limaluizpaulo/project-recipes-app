import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';
import { actionRecipes, actionRecipesByIngredients } from '../actions';
import CardItem from '../components/CardItem';

class Recipes extends Component {
  constructor(props) {
    super(props);

    this.fetchRecipes = this.fetchRecipes.bind(this);
  }

  componentDidMount() {
    this.fetchRecipes();
  }

  async fetchRecipes() {
    const { recipes } = this.props;
    recipes();
  }

  render() {
    const { listRecipes } = this.props;
    console.log(listRecipes);
    if (!listRecipes) return (<h3>Loading...</h3>); // OBS possível bug
    if (listRecipes.length === 1) {
      return <Redirect to={ `/comidas/${listRecipes[0].idMeal}` } />;
    }
    // mudança
    return (
      <>
        <Header header="Comidas" explorer />
        <h2>Recipes</h2>
        {listRecipes.map(({ strMealThumb, strMeal }, index) => (
          <CardItem
            key={ index }
            index={ index }
            name={ strMeal }
            image={ strMealThumb }
          />))}
        <DownMenu />
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  recipes: () => dispatch(actionRecipes()),
  ingredientes: (ingredientes) => dispatch(actionRecipesByIngredients(ingredientes)),
});

const mapStateToProps = (state) => ({
  listRecipes: state.recipes.recipes,
  input: state.recipes.inputIngredientes,
});

Recipes.propTypes = {
  recipes: PropTypes.func.isRequired,
  listRecipes: PropTypes.arrayOf().isRequired,
  // ingredientes: PropTypes.func.isRequired,
  // input: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
