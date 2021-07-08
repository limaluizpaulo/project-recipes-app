import React from 'react';
import { useHistory } from 'react-router-dom';

import { setConstants } from '../../helpers';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExploreByArea() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const isDrinks = pathname.includes('bebidas');
  const { title } = setConstants(isDrinks);

  return (
    <div>
      <Header title="Explorar Origem" />
      <p>{ `${title}PorArea` }</p>
      <Footer />
    </div>
  );
}

export default ExploreByArea;
