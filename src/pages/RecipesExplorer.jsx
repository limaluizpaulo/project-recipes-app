import React, { Component } from 'react';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';

class RecipesExplorer extends Component {
  render() {
    return (
      <div>
        <Header header="Explorar Comidas" explorer={ false } />
        <h2>Recipes Explorer</h2>
        <DownMenu />
      </div>
    );
  }
}

export default RecipesExplorer;
