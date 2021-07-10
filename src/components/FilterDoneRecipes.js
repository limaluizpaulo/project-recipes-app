import Button from 'react-bootstrap/Button';
import React from 'react';

export default function FilterDoneRecipes() {
  const dale = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log(dale);
  // function DoneRecipes() {
  //   return console.log('id-recipe', dale);
  // }

  return (
    <div>
      <div>
        <Button data-testid="filter-by-all-btn">
          All
        </Button>
        <Button data-testid="filter-by-food-btn">
          Food
        </Button>
        <Button data-testid="filter-by-drink-btn">
          Drinks
        </Button>
      </div>
      <div>
        { dale.length <= 1 ? <p>Não há receitas feitas</p>
          : dale.slice(1).map((el) => (
            <div key={ el.id }>
              <img src={ el.image } alt={ el.name } />
              <span>{ `${el.area} - ${el.category}` }</span>
              <h3>{ el.name }</h3>
            </div>
          ))}
      </div>
    </div>
  );
}
