import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../ContextApi/Context';

export default function Drink() {
  const { listOfContext: { foodAndDrinkList } } = useContext(AppContext);

  return (
    <div>
      <Header title="Bebidas" />
      <Footer />
      { foodAndDrinkList && foodAndDrinkList.map((item, index) => (
        <div
          key={ item.idDrink }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
          />
          <p data-testid={ `${index}-card-name` }>{ item.strDrink }</p>
        </div>)) }
    </div>
  );
}
