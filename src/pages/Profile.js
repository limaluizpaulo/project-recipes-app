import React from 'react';
import iconProfile from '../images/profileIcon.svg';
import Header from '../components/Header';

const Profile = () => {
  console.log('');
  return (
    <div>
      <Header title="Perfil" />
      <img src={ iconProfile } alt="profile" />
    </div>
  );
};

export default Profile;
