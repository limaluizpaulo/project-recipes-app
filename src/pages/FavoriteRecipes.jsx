import React, { Component } from 'react';
import Header from '../components/Header';

class FavoriteRecipes extends Component {
  render() {
    return (
      <div>
        <Header header="Receitas Favoritas" />
        <h2> Favorite Recipes</h2>
      </div>
    );
  }
}

export default FavoriteRecipes;
