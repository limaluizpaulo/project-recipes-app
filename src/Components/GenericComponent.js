import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

class GenericComponent extends React.Component {
  render() {
    const { location: { pathname } } = this.props;
    const isFavoriteRecipes = pathname.includes('favorita');

    return (
      <main>
        <Header pathname={ pathname } />
        {!isFavoriteRecipes && <Footer />}
      </main>
    );
  }
}

GenericComponent.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default GenericComponent;
