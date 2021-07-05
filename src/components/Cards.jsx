import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';

function Cards() {
  const { data, nameRecipes, imgRecipes } = useContext(FetchContext);
  const ELEVEN = 11;
  return (
    <div>
      { console.log(data) }
      {
        data.filter((el, index) => index <= ELEVEN)
          .map((food, index) => (
            <div key={ food } data-testid={ `${index}-recipe-card` }>
              <img data-testid={ `${index}-card-img` } src={ food[imgRecipes] } alt="" />
              <p data-testid={ `${index}-card-name` }>{ food[nameRecipes] }</p>
            </div>
          ))
      }
    </div>
  );
}

export default Cards;
