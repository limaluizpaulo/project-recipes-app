import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dropdown extends Component {
  render() {
    const { name } = this.props;
    return (
      <option
        value={ name }
        data-testid={ `${name}-option` }
      >
        {name}

      </option>
    );
  }
}

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Dropdown;
