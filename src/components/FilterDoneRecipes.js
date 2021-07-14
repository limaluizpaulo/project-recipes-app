import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import '../styles/card.css';
import ShareBtn from './ShareBtn';

export default function FilterDoneRecipes() {
  const storage = JSON.parse(localStorage.getItem('doneRecipes'));
  const [doneRecipes, setDoneRecipes] = useState([]);
  const { push } = useHistory();
  const [fil, setFil] = useState('');

  useEffect(() => {
    setDoneRecipes(storage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function filter(param = '') {
    if (param === '') {
      return storage;
    }
    const result = doneRecipes.filter((rec) => rec.type === param);
    return result;
  }

  // function disable() {
  //   if (storage.lentgh === 0) {
  //     return true;
  //   }
  //   return false;
  // }

  function clickCard(type, id) {
    console.log(type);
    if (type === 'comida') {
      push(`/comidas/${id}`);
    } else {
      push(`/bebidas/${id}`);
    }
  }

  return (
    <div>
      <div>
        <Button
          // disabled={ disable }
          data-testid="filter-by-all-btn"
          onClick={ () => setFil() }
        >
          All
        </Button>
        <Button
          // disabled={ disable }
          data-testid="filter-by-food-btn"
          onClick={ () => setFil('comida') }
        >
          Food
        </Button>
        <Button
          // disabled={ disable }
          data-testid="filter-by-drink-btn"
          onClick={ () => setFil('bebida') }
        >
          Drinks
        </Button>
      </div>
      <div className="card-container">
        { !filter(fil) ? <p>Não há receitas feitas</p>
          : filter(fil).map((el, i) => (
            <div className="recipe-card" key={ el.id }>
              <button
                type="button"
                onClick={ () => { clickCard(el.type, el.id); } }
              >
                <img
                  data-testid={ `${i}-horizontal-image` }
                  className="card-img"
                  src={ el.image }
                  alt={ el.name }
                />
              </button>
              <ShareBtn type={ el.type } id={ el.id } index={ i } />
              <span data-testid={ `${i}-horizontal-top-text` }>
                { `${el.area ? `${el.area} -` : ''} ${el.category}` }
                {' '}
                { el.alcoholicOrNot }
              </span>
              <p data-testid={ `${i}-horizontal-done-date` }>
                Feita em:
                { el.doneDate }
              </p>

              <button
                type="button"
                onClick={ () => { clickCard(el.type, el.id); } }
                data-testid={ `${i}-horizontal-name` }
              >
                { el.name }
              </button>
              <div>
                { el.tags !== null ? el.tags.map((tag) => (
                  <span data-testid={ `${i}-${tag}-horizontal-tag` } key={ tag }>
                    { tag }
                  </span>
                )) : null }
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
