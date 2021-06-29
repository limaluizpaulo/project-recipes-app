import React, { useContext } from 'react';
import RecipeContext from '../context/Context';

const Teste = () => {
  const { teste } = useContext(RecipeContext);
  console.log(teste);
  return (
    <div>
      <h1>teste</h1>
    </div>
  );
};

export default Teste;
