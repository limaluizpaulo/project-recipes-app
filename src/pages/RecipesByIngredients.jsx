import React, { Component } from 'react';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';

class RecipesByIngredients extends Component {
  render() {
    return (
      <div>
        <Header />
        <h2> Recipes By Ingredients</h2>
        <DownMenu />
      </div>
    );
  }
}

export default RecipesByIngredients;
