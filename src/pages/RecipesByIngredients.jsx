import React, { Component } from 'react';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';

class DrinksByIngredients extends Component {
  render() {
    return (
      <div>
        <Header header="Explorar Ingredientes" />
        <h2> Drinks By Ingredients</h2>
        <DownMenu />
      </div>
    );
  }
}

export default DrinksByIngredients;
