import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import DownMenu from '../components/DownMenu';

class Perfil extends Component {
  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <Header header="Perfil" />
        <h2>Perfil</h2>
        <h1>{userEmail}</h1>
        <DownMenu />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Perfil.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Perfil);
