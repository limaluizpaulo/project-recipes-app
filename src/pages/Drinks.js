import React from 'react';
import Header from '../components/Header';
// import { GlobalContext } from '../context/Provider';

const Drinks = () => {
  // const { recipes: { drinks = [] } } = useContext(GlobalContext);

  return (
    <div>
      <Header title="Bebidas" search />
      {/* {drinks.length < 12 } */}
    </div>
  );
};

export default Drinks;
