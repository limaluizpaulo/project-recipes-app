import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import { getSearchBarResponse } from '../action/index';

export class TelaDeExplorar extends Component {
  componentDidMount() {
    const { hasSearchBar } = this.props;

    hasSearchBar(false);
  }

  render() {
    const { location } = this.props;

    return (
      <div>
        <Header location={ location } />
        <Link to="/explorar/comidas">
          <button
            data-testid="explore-food"
            name="comidas"
            type="button"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            data-testid="explore-drinks"
            name="bebidas"
            type="button"
          >
            Explorar Bebidas
          </button>
        </Link>
        <Footer />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  hasSearchBar: (e) => dispatch(getSearchBarResponse(e)),
});

TelaDeExplorar.propTypes = {
  hasSearchBar: PropTypes.func.isRequired,
  location: PropTypes.shape,
}.isRequired;

export default connect(null, mapDispatchToProps)(TelaDeExplorar);
