import React from 'react';
import Header from './Header';
import Footer from './Footer';

class GenericComponent extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <Footer />
      </main>
    );
  }
}

export default GenericComponent;
