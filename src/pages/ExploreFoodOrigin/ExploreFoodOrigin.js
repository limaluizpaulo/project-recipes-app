import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function ExploreLocationFood() {
  return (
    <div>
      <Header title="Explorar Origem" haveSrc />
      <select>
        <option>Canadá</option>
        <option>Brasil</option>
      </select>
      <Footer />
    </div>
  );
}

export default ExploreLocationFood;
