import React from 'react';
// HANDLERS:
// FoodsAndDrinks

// const {ingredientsData, setIngredientsData } = useContext(GlobalState);

// FUNÇÃO PARA FORMATAR OS DADOS RECEBIDOS DA API
function handleIngredientsData() {
  return ingredientsList.map((el, i, arr) => (
    (el[0].includes('Ingredient')) && ([`${el[1]
      + arr.filter((elt) => elt[0] === (`strMeasure${i + 1}`))
        .map((result) => (` - ${result[1]}`))}`,
    ]))).filter((fil) => fil);
}

// const data = handleIngredientsData();
// setIngredientsData(data);

// RENDERERS:
export default function TheRenderer() {
  // FoodsAndDrinks 97
  return (
    <div>
      {handleIngredientsData().map((string, i) => (
        <div key={ i }>
          <p data-testid={ `${i}-ingredient-name-and-measure` }>
            { string }
          </p>
        </div>
      ))}
    </div>
  );
}
