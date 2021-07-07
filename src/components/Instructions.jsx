import React, { Component } from 'react';
import PropTypes from 'prop-types';
import identification from '../helper/dictionaryApi';

class Instructions extends Component {
  render() {
    const { data } = this.props;
    const dictionary = identification(data);
    return (
      <section data-testid="instructions">
        <p>{data[dictionary.Instructions]}</p>
      </section>
    );
  }
}

Instructions.propTypes = {
  data: PropTypes.shape.isRequired,
};

export default Instructions;
