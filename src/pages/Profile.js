import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Profile extends React.Component {
  render() {
    return (
      <section>
        <Header title="Perfil" />
        <Footer />
      </section>
    );
  }
}

export default Profile;
