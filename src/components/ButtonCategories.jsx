import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonCategories extends Component {
  render() {
    const { getCategories, btnClass } = this.props;
    return (
      <section className="btn-list-cards">
        {
          getCategories.map(({ strCategory }, index) => (
            <button
              className={ btnClass }
              data-testid={ `${strCategory}-category-filter` }
              type="button"
              key={ strCategory + index }
            >
              {strCategory}
            </button>
          ))
        }
      </section>
    );
  }
}

ButtonCategories.propTypes = {
  getCategories: PropTypes.objectOf(PropTypes.object).isRequired,
  btnClass: PropTypes.string.isRequired,
};

export default ButtonCategories;
