import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFilterFoodByCategories } from '../action';
import '../css/buttonCategories.css';

class ButtonCategories extends Component {
  constructor() {
    super();
    this.state = {
      isToggle: false,
      category: '',
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(e, nameCategory) {
    const { isToggle, category } = this.state;
    const { filter, filterAll } = this.props;

    if (e.target.value !== 'All') {
      this.setState({ isToggle: true, category: nameCategory });
      filter(nameCategory);
    } else {
      this.setState({ isToggle: false, category: '' });
      filterAll();
    }

    if (e.target.value === category && isToggle === true) {
      this.setState({ isToggle: false, category: '' });
      filterAll();
    }
  }

  render() {
    const { getCategories } = this.props;
    return (
      <section className="btn-list-cards">
        <button
          data-testid="All-category-filter"
          type="button"
          className="category-filter"
          onClick={ (e) => this.toggle(e, 'All') }
          value="All"
        >
          All
        </button>
        {
          getCategories.map(({ strCategory }, index) => (
            <button
              className="category-filter"
              data-testid={ `${strCategory}-category-filter` }
              type="button"
              key={ strCategory + index }
              onClick={ (e) => this.toggle(e, strCategory) }
              value={ strCategory }
            >
              {strCategory}
            </button>
          ))
        }
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  foodByCategories: (category) => dispatch(fetchFilterFoodByCategories(category)),
});

ButtonCategories.propTypes = {
  getCategories: PropTypes.objectOf(PropTypes.object).isRequired,
  // btnClass: PropTypes.string.isRequired,
  filter: PropTypes.func.isRequired,
  filterAll: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ButtonCategories);
