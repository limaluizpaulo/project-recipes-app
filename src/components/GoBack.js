import React from 'react';
import { useHistory } from 'react-router-dom';
import './GoBack.css';

function GoBack() {
  const { location: { pathname }, push } = useHistory();
  const isDrinks = pathname.includes('/bebidas');
  const location = isDrinks ? '/bebidas' : '/comidas';

  return (
    <div className="button-back">
      <button onClick={ () => push(`${location}`) } id="button-go-back" type="button">
        <i className="fas fa-home fas-button-go-back" />
      </button>
    </div>
  );
}

export default GoBack;
