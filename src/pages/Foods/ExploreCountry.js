import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { fetchRecipeAllFood,
  fetchRecipeBySelectedCountry, fetchRecipeCountry } from '../../services/recipeAPI';

export default function ExploreCountry() {
  const history = useHistory();
  const [countries, setCountries] = useState([]);
  const [countrySelected, setCountrySelected] = useState('All');
  const [recepies, setRecepies] = useState([]);
  const NUMBER = 12;
  // (recepies);

  useEffect(() => {
    const getCountries = async () => {
      const newCountries = await fetchRecipeCountry();
      setCountries(newCountries.meals);
    };
    getCountries();
  }, []);

  useEffect(() => {
    let newRecepies;
    const getRecepies = async () => {
      if (countrySelected === 'All') {
        newRecepies = await fetchRecipeAllFood();
      } else {
        newRecepies = await fetchRecipeBySelectedCountry(countrySelected);
      }
      setRecepies(newRecepies.meals.slice(0, NUMBER));
    };
    getRecepies();
  }, [countrySelected]);
  return (
    <div>
      <Header title="Explorar Origem" display="true" />
      <select
        data-testid="explore-by-area-dropdown"
        name="country"
        id="id-country"
        onChange={ ({ target }) => setCountrySelected(target.value) }
      >
        <option key="0" data-testid="All-option">All</option>
        {countries.map((country, index) => (
          <option
            key={ index + 1 }
            data-testid={ `${country.strArea}-option` }
          >
            {country.strArea}
          </option>
        ))}
      </select>

      <div className="show-recipe">
        { recepies.map((element, index) => (
          <div
            role="presentation"
            className="papai"
            key={ index }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/comidas/${element.idMeal}`) }
          >
            <img
              className="filhinho"
              src={ element.strMealThumb }
              data-testid={ `${index}-card-img` }
              alt={ element.strMeal }
              width="20%"
            />
            <p data-testid={ `${index}-card-name` }>
              { element.strMeal}
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
