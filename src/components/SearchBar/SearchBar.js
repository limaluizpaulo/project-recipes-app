import React, { useContext, useState } from 'react';
import './searchBar.css';
import { useLocation, useHistory } from 'react-router-dom';
import { searchMeal, searchDrink } from '../../helpers/searchDrinkOrMeal';
import Context from '../../Provider/context';

function SearchBar() {
  const history = useHistory();
  const [inputSearch, setInputSearch] = useState('');
  const [selectedOptino, setSelectedOptino] = useState('');
  const { pathname } = useLocation();
  const routeName = pathname.split('/')[1];
  const { setDataFood, setDataDrink } = useContext(Context);

  // Se a api retornar somente uma receita então a página vai ser redirecionada para detalhes
  // Se a api retornar mais que uma é mostrado os cards da receitas
  const haveOneDrink = (objDrink) => {
    if (objDrink === undefined) {
      return 0;
    } if (Object.keys(objDrink).length === 0) {
      global.alert('Por favor marque uma opção!');
      return 0;
    } if (objDrink.drinks === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return 0;
    } if (objDrink.drinks.length === 1) {
      return 1;
    } if (objDrink.drinks.length > 1) {
      setDataDrink(objDrink);
      return 0;
    }
  };

  // Se a api retornar somente uma receita então a página vai ser redirecionada para detalhes
  // Se a api retornar mais que uma é mostrado os cards da receitas
  const haveOneMeal = (objMeal) => {
    if (objMeal === undefined) {
      return 0;
    } if (objMeal.meals === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return 0;
    } if (Object.keys(objMeal).length === 0) {
      global.alert('Por favor marque uma opção!');
      return 0;
    } if (objMeal.meals.length === 1) {
      return 1;
    } if (objMeal.meals.length > 1) {
      setDataFood(objMeal);
      return 0;
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    let result;

    switch (routeName) {
    case 'comidas':
      result = await searchMeal(selectedOptino, inputSearch);
      if (haveOneMeal(result) === 1) {
        const { idMeal } = result.meals[0];
        history.push(`/comidas/${idMeal}`);
      }
      break;

    case 'bebidas':
      result = await searchDrink(selectedOptino, inputSearch);
      if (haveOneDrink(result) === 1) {
        const { idDrink } = result.drinks[0];
        history.push(`/bebidas/${idDrink}`);
      }
      break;

    case 'explorar':
      result = await searchDrink(selectedOptino, inputSearch);
      haveOneDrink(result);
      break;

    default:
      result = {};
    }
  };

  return (
    <div className="searchBar">
      <form onSubmit={ submit }>
        <input
          type="text"
          className="search-input"
          value={ inputSearch }
          data-testid="search-input"
          onChange={ ({ target: { value } }) => setInputSearch(value) }
        />

        <div className="radio-buttons">
          <label htmlFor="ingredientes">
            <input
              data-testid="ingredient-search-radio"
              id="ingredientes"
              type="radio"
              value="ingredientes"
              checked={ selectedOptino === 'ingredientes' }
              onChange={ ({ target: { value } }) => setSelectedOptino(value) }
            />
            Ingrediente
          </label>

          <label htmlFor="nome">
            <input
              data-testid="name-search-radio"
              id="nome"
              type="radio"
              value="nome"
              checked={ selectedOptino === 'nome' }
              onChange={ ({ target: { value } }) => setSelectedOptino(value) }
            />
            Nome
          </label>

          <label htmlFor="primeiraLetra">
            <input
              data-testid="first-letter-search-radio"
              id="primeiraLetra"
              type="radio"
              value="primeiraLetra"
              checked={ selectedOptino === 'primeiraLetra' }
              onChange={ ({ target: { value } }) => setSelectedOptino(value) }
            />
            Primeira letra
          </label>
        </div>

        <button data-testid="exec-search-btn" type="submit">Buscar</button>

      </form>
    </div>
  );
}

export default SearchBar;

// how use radio button group in react:
// https://www.pluralsight.com/guides/how-to-use-radio-buttons-in-reactjs
