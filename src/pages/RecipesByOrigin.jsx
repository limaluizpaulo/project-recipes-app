import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';
import Dropdown from '../components/Dropdown';
import { actionRecipes } from '../actions';
import CardItem from '../components/CardItem';
import '../Style/Recipes.css';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fMeals: [],
      locations: [],
      value: '',
      // filter: false,
      // categories: '',
    };
    this.fetchLocations = this.fetchLocations.bind(this);
    this.mapearLista = this.mapearLista.bind(this);
    this.fetchs = this.fetchs.bind(this);
    this.returnSelected = this.returnSelected.bind(this);
    this.fetchRecipesByLocations = this.fetchLocations.bind(this);
  }

  componentDidMount() {
    this.fetchLocations();
    this.fetchs();
  }

  async fetchRecipesByLocations() {
    const { value } = this.state;
    const location = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`);
    const { meals } = await location.json();
    console.log(meals);
    this.setState({ fMeals: meals });
  }

  async fetchLocations() {
    const location = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const { meals } = await location.json();
    this.setState({ locations: meals });
  }

  async fetchs() {
    const { listRecipes, recipes } = this.props;
    if (listRecipes.length === 0) recipes();
  }

  mapearDropdown({ strArea }, index) {
    return (
      <Dropdown
        key={ index }
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

  async returnSelected() {
    const e = document.getElementById('DropdowN');
    if (e !== '') { this.setState({ value: e.value }); }
    this.fetchRecipesByLocations();
    // if (e !== null) {
    //   ;
    // }
  }

  render() {
    const { locations, value, fMeals } = this.state;
    const { listRecipes } = this.props;
    if (listRecipes.length === 1) {
      return <Redirect to={ `/comidas/${listRecipes[0].idMeal}` } />;
    }
    console.log(fMeals);
    console.log(value);
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
        <select
          onChange={ this.returnSelected }
          defaultValue="All"
          data-testid="explore-by-area-dropdown"
          id="DropdowN"
        >
          <option
            value="All"
            data-testid="All-option"
          >
            All
          </option>
          {locations.map((item, index) => this.mapearDropdown(item, index))}
        </select>
        { fMeals.map((element, index) => this.mapearLista(element, index))}
        {
          listRecipes.map((element, index) => this.mapearLista(element, index))
        }
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
  listRecipes: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
