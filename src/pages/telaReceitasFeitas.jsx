import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';
import { getSearchBarResponse } from '../action/index';

export class TelaReceitasFeitas extends Component {
  componentDidMount() {
    const { hasSearchBar } = this.props;

    hasSearchBar(false);
  }

  render() {
    const { location } = this.props;

    return (
      <div>
        <Header location={ location } />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  hasSearchBar: (e) => dispatch(getSearchBarResponse(e)),
});

TelaReceitasFeitas.propTypes = {
  hasSearchBar: PropTypes.func.isRequired,
  location: PropTypes.shape,
}.isRequired;

export default connect(null, mapDispatchToProps)(TelaReceitasFeitas);
