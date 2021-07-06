import React from 'react';
import Header from './Header';
import Footer from './Footer';

class GenericComponent extends React.Component {
  render() {
    const { location: {pathname}} = this.props;
    const isFavoriteRecipes = pathname.includes('favorita');

    return (
      <main>
        <Header />
        {!isFavoriteRecipes && <Footer />}
      </main>
    );
  }
}

export default GenericComponent;
