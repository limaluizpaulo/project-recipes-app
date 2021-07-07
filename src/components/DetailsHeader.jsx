import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../css/DetailsHeader.css';
import identification from '../helper/dictionaryApi';

class DetailsHeader extends Component {
  render() {
    const { data, isDrink } = this.props;
    const keyName = identification(data);
    return (
      <section>
        <section className="recipe-details">
          <img
            data-testid="recipe-photo"
            src={ data[keyName.Thumb] }
            alt={ data[keyName.Name] }
          />
        </section>
        <section className="details-content">
          <div>
            <h2 className="details-title" data-testid="recipe-title">
              {data[keyName.Name]}
            </h2>
          </div>
          <div>
            <span
              className="details-category"
              data-testid="recipe-category"
            >
              { isDrink ? data[keyName.Alcoholic] : data[keyName.Category] }
            </span>
          </div>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  isDrink: state.recipeDetails.isDrink,
});

DetailsHeader.propTypes = {
  data: PropTypes.shape.isRequired,
  isDrink: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(DetailsHeader);
