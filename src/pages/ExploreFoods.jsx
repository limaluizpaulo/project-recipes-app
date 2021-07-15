/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import renderExporeBtn from '../components/ExploreBtn';
import Context from '../context/Context';

function ExploreFoods() {
  const [redirectTo, setRedirectTo] = useState();
  const { updateEndPoint, randomRecipe } = useContext(Context);

  useEffect(() => {
    updateEndPoint('food');
  }, []);

  const handleRedirect = async (url) => {
    if (url === 'rand') {
      setRedirectTo(`/comidas/${await randomRecipe()}`);
    } else setRedirectTo(`/explorar/comidas/${url}`);
  };

  return redirectTo ? <Redirect to={ redirectTo } /> : (
    <>
      <Header title="Explorar Comidas" />
      {renderExporeBtn(handleRedirect)}
      <Footer />
    </>
  );
}

export default ExploreFoods;
