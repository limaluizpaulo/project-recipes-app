import React, { Component } from 'react';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.fetchLocations = this.fetchLocations.bind(this);
  }

  componentDidMount() {
    this.fetchLocations();
  }

  async fetchLocations() {
    const location = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const { meals } = await location.json();
    // const something = { meals };
    console.log(meals[5].strArea);
    // let final = [];
    console.log(meals[0].strArea);

    for (let i = 1; i < meals.length; i += 1) {
      const locations = +meals[i].strArea;
      return locations;
    }
    console.log(meals[i].strArea);

    // console.log(final);
    // this.setState( locations: {something} );
    // this.setState({ locations: meals.strArea });
  }

  render() {
    const { place } = this.state;
    // if ()
    console.log([place]);
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
