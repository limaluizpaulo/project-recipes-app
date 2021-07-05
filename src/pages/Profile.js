import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

export default function Profile() {
  const { userInfo } = useContext(RecipesContext);
  return (
    <>
      <Header />
      <p>{ userInfo.email }</p>
      <Footer />
    </>
  );
}
