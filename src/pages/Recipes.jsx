import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';
import { actionRecipes, actionCategoriesRecipes,
  actionRecipesByCategories } from '../actions';
import CardItem from '../components/CardItem';
import ButtonCategories from '../components/ButtonCategories';

class Recipes extends Component {
  constructor(props) {
    super(props);

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
    this.setState({ loading: false });
  }

  async fetchRecipesCategory(category) {
    const { recipesByCategory } = this.props;
    recipesByCategory(category);
    console.log(category);
    // this.setState((prev) => ({ filter: !prev.filter }));
  }

  render() {
    const { listRecipes, listCategories } = this.props;
    if (!listRecipes) return (<h3>Loading...</h3>); // OBS possível bug
    if (listRecipes.length === 1) {
      return <Redirect to={ `/comidas/${listRecipes[0].idMeal}` } />;
    }
    // mudança
    return (
      <>
        <Header header="Comidas" explorer />
        <h2>Recipes</h2>
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
  // recipesByCategory: PropTypes.func.isRequired,
  // listByCategory: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
