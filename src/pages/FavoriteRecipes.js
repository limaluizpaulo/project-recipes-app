import React, { Component } from 'react';
import Header from '../components/Header';

class FavoriteRecipes extends Component {
  render() {
    return (
      <section>
        <Header title="Receitas Favoritas" searchIcon />
      </section>
    );
  }
}

export default FavoriteRecipes;
