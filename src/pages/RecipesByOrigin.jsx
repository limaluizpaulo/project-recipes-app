import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // locations: [],
    };
    this.fetchLocations = this.fetchLocations.bind(this);
  }

  componentDidMount() {
    this.fetchLocations();
  }

  async fetchLocations() {
    const location = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const { meals } = await location.json();
    console.log(meals);
    // this.setState({ locations: meals.strArea });
  }

  // fetchRecipes() {
  //   const { recipes } = this.props;
  //   console.log(recipes());
  //   return recipes();
  // }

  render() {
    // const { locations } = this.props;
    // console.log(locations);

    return (
      <div>
        <Header header="Comidas" explorer />
        <h2>Recipes</h2>
        <DownMenu />
      </div>
    );
  }
}

export default (Recipes);
