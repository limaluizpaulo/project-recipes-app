import React, { Component } from 'react';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';

class Explorer extends Component {
  render() {
    return (
      <div>
        <Header header="Explorar" explorer={ false } />
        <h2>Explorer</h2>
        <DownMenu />
      </div>
    );
  }
}

export default Explorer;
