import React, { useContext } from 'react';
import Header from '../components/Header';
import FiltersButtons from '../components/FiltersButtons';
import RecipesContext from '../Context/RecipesContext';

function ReceitasFavoritas() {
  const { favoriteFilters } = useContext(RecipesContext);
  console.log(favoriteFilters);
  return (
    <>
      <Header />
      <FiltersButtons />
      {favoriteFilters.map(({ image, category, name, id }) => (
        <div key={ id }>
          <img
            src={ image }
            alt="xxxx"
            data-testid={ `${id}-horizontal-image` }
            width="50px"
          />
          <span data-testid={ `${id}-horizontal-name` }>{ name }</span>
          <span data-testid={ `${id}-horizontal-top-text` }>{ category }</span>
        </div>
      ))}
      ;
    </>

  );
}

export default ReceitasFavoritas;

// imagem, texto de categoria, nome, alcaholicOrNot (é pra dizer se é alcólico ou não )
