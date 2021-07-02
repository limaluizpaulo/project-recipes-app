import React from 'react';
import iconProfile from '../images/profileIcon.svg';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
  console.log('');
  return (
    <div>
      <Header title="Perfil" />
      <img src={ iconProfile } alt="profile" />
      <Footer />
    </div>
  );
};

export default Profile;
