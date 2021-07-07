import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';
import { actionRecipes, actionCategoriesRecipes,
  actionRecipesByCategories } from '../actions';
import CardItem from '../components/CardItem';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
    };

    this.mapearLista = this.mapearLista.bind(this);
    this.fetchRecipesCategory = this.fetchRecipesCategory.bind(this);
    this.fetchs = this.fetchs.bind(this);
  }

  componentDidMount() {
    this.fetchs();
  }

  async fetchs() {
    const { recipes, categories } = this.props;
    recipes();
    categories();
  }

  async fetchRecipesCategory(category) {
    const { recipesByCategory } = this.props;
    recipesByCategory(category);
    console.log(category);
    this.setState({ filter: true });
  }

  mapearLista({ strMealThumb, strMeal, idMeal }, index) {
    return (
      <CardItem
        key={ index }
        index={ index }
        name={ strMeal }
        image={ strMealThumb }
        id={ idMeal }
      />);
  }

  render() {
    const { filter } = this.state;
    const { listRecipes, listCategories, listByCategory } = this.props;
    if (!listRecipes) return (<h3>Loading...</h3>); // OBS possível bug
    if (listRecipes.length === 1) {
      return <Redirect to={ `/comidas/${listRecipes[0].idMeal}` } />;
    }
    // mudança
    return (
      <>
        <Header header="Comidas" explorer />
        <h2>Recipes</h2>
        <h2>Recipes</h2>
        <h2>Recipes</h2>
        <h2>Recipes</h2>
        <h2>Recipes</h2>
        <h2>Recipes</h2>
        <h2>Recipes</h2>
        <h2>Recipes</h2>
        <h2>Recipes</h2>
        <h2>Recipes</h2>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => this.setState({ filter: false }) }
        >
          All
        </button>
        {listCategories.map(({ strCategory }, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
            name={ strCategory }
            onClick={ () => this.fetchRecipesCategory(strCategory) }
          >
            {strCategory}
          </button>
        ))}
        {filter
          ? listByCategory.map((element) => this.mapearLista(element))
          : listRecipes.map((element) => this.mapearLista(element))}
        <DownMenu />
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  recipes: () => dispatch(actionRecipes()),
  categories: () => dispatch(actionCategoriesRecipes()),
  recipesByCategory: (category) => dispatch(actionRecipesByCategories(category)),
});

const mapStateToProps = (state) => ({
  listRecipes: state.recipes.recipes,
  listCategories: state.categories.categories,
  listByCategory: state.recipes.byCategories,
});

Recipes.propTypes = {
  recipes: PropTypes.func.isRequired,
  listRecipes: PropTypes.arrayOf().isRequired,
  categories: PropTypes.func.isRequired,
  listCategories: PropTypes.arrayOf().isRequired,
  recipesByCategory: PropTypes.func.isRequired,
  listByCategory: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
