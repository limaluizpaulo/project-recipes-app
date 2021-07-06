import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import Explore from './Explore';

class GenericComponent extends React.Component {
  render() {
    const { location: { pathname } } = this.props;
    const isExploreScreen = pathname.includes('explorar');

    return (
      <div>
        <Header pathname={ pathname } />
        <main>
          {isExploreScreen && <Explore />}
        </main>
        <Footer />
      </div>
    );
  }
}

GenericComponent.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default GenericComponent;
