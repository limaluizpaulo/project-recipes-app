import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonCategories extends Component {
  render() {
    const { name } = this.props;
    return (
      <button
        type="button"
        data-testid={ `${name}-category-filter` }
      >
        {name}
      </button>
    );
  }
}

ButtonCategories.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ButtonCategories;
