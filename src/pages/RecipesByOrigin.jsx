import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';
import Dropdown from '../components/Dropdown';
import { actionRecipes, actionCategoriesRecipes,
  actionRecipesByCategories } from '../actions';
import CardItem from '../components/CardItem';
import '../Style/Recipes.css';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      // filter: false,
      // categories: '',
    };
    this.fetchLocations = this.fetchLocations.bind(this);
    this.mapearLista = this.mapearLista.bind(this);
    // this.fetchRecipesCategory = this.fetchRecipesCategory.bind(this);
    this.fetchs = this.fetchs.bind(this);
  }

  componentDidMount() {
    this.fetchLocations();
    this.fetchs();
  }

  async fetchLocations() {
    const location = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const { meals } = await location.json();
    this.setState({ result: meals });
    // console.log(meals);
    // // const something = { meals };
    // console.log(meals[5].strArea);
    // // let final = [];
    // console.log(meals.strArea);
    // reminder of my struggles
  }

  async fetchs() {
    const { listRecipes, recipes } = this.props;

    if (listRecipes.length === 0) recipes();
  }

  async fetchRecipesCategory() {
    const { recipes } = this.props;
    recipes();
  }

  mapearDropdown({ strArea }) {
    return (
      <Dropdown
        className="list"
        name={ strArea }
      />
    );
  }

  mapearLista({ strMealThumb, strMeal, idMeal }, index) {
    return (
      <Link to={ `/comidas/${idMeal}` } key={ idMeal }>
        <CardItem
          className="list"
          index={ index }
          name={ strMeal }
          image={ strMealThumb }
        />
      </Link>);
  }

  render() {
    const { result } = this.state;
    const { listRecipes } = this.props;
    if (listRecipes.length === 1) {
      return <Redirect to={ `/comidas/${listRecipes[0].idMeal}` } />;
    }

    return (
      <div>
        <Header header="Comidas" explorer />
        <h1>Recipes</h1>
        <h1>Recipes</h1>
        <h1>Recipes</h1>
        <h1>Recipes</h1>
        <h1>Recipes</h1>
        <h1>Recipes</h1>
        <h1>Recipes</h1>
        <select data-testid="explore-by-area-dropdown">
          {result.map((item) => this.mapearDropdown(item))}
        </select>

        { listRecipes.map((element, index) => this.mapearLista(element, index))}
        <DownMenu />
      </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
