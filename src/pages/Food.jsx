import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../ContextApi/Context';

export default function Food() {
  const { listOfContext: { foodAndDrinkList } } = useContext(AppContext);

  return (
    <div>
      <Header title="Comidas" />
      <Footer />
      { foodAndDrinkList && foodAndDrinkList.map((item, index) => (
        <div
          key={ item.idMeal }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ item.strMealThumb }
            alt={ item.strMeal }
          />
          <p data-testid={ `${index}-card-name` }>{ item.strMeal }</p>
        </div>)) }
    </div>
  );
}
