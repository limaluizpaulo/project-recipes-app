import React, { Component } from 'react';
import Header from '../components/Header';
import DoneRecipesButtons from '../components/DoneRecipesButtons';

class DoneRecipes extends Component {
  render() {
    return (
      <section>
        <Header title="Receitas Feitas" searchIcon />
        <DoneRecipesButtons />
      </section>
    );
  }
}

export default DoneRecipes;
