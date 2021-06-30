import React, { Component } from 'react';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';

class Recipes extends Component {
  render() {
    return (
      <div>
        <Header header="Comidas" explorer />
        <h2>Recipes</h2>
        <DownMenu />
      </div>
    );
  }
}

export default Recipes;
