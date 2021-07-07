import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import FetchContext from '../context/FetchContext';
import '../App.css';

function Cards() {
  const { data, nameRecipes, imgRecipes, idRecip, typeFunc } = useContext(FetchContext);
  const ELEVEN = 11;
  return (
    <div className="card-container">
      {
        data.filter((el, index) => index <= ELEVEN)
          .map((food, index) => (
            <div key={ food } data-testid={ `${index}-recipe-card` }>
              <Link to={ `/${typeFunc}/${data[0][idRecip]}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ food[imgRecipes] }
                  alt={ food[nameRecipes] }
                />
                <p data-testid={ `${index}-card-name` }>{ food[nameRecipes] }</p>
              </Link>
            </div>
          ))
      }
    </div>
  );
}

export default Cards;
