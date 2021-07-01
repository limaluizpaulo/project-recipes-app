import React, { useState, useEffect } from 'react';
import requestMeal from '../../helpers/requests';


function Detalhes() {

const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  (async function resolved() {
    const resolve = await requestMeal();
    setData(resolve);
    setLoading(false);
  }());
}, []);

function renderButtons() {
  return (
    <>
      <button type="button">
        <img src={ profileIcon } alt="profile icon" data-testid="share-btn" />
      </button>
    </>
  )
}

function mapData(param) {
  const { meals } = param;
  return meals
    .map((item, index) => {
      if( item.idMeal === "52977") {
        console.log(item);
        return(
          <>
            <img src={item.strMealThumb} data-testid="recipe-photo" />
            <h1 data-testid="recipe-title">{item.strMeal}</h1>
          </>
        )        
      }
    });
}

  return(
    <div className="card-meals">
      {
        loading
          ? 'Carregando...'
          : (mapData(data))
      }
    </div>    
  )
}

export default Detalhes;
