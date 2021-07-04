import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';

const DropDownList = () => {
  const { places, setPlaces, area, setArea, setRecipesByPlace } = useContext(Context);

  useEffect(() => {
    const fetchPlaces = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const request = await fetch(endpoint);
      const { meals } = await request.json();
      const countries = meals.map((country) => country.strArea);
      setPlaces(countries);
    };
    fetchPlaces();
  }, []);

  useEffect(() => {
    if (area) {
      const fetchRecipeByPlace = async () => {
        const DOZE = 12;
        const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
        const request = await fetch(endpoint);
        const result = await request.json();
        const recipes = result.meals.filter((_recipe, idx) => idx < DOZE);
        setRecipesByPlace(recipes);
      };
      fetchRecipeByPlace();
    }
  }, [area]);

  const handleChange = ({ target }) => {
    setArea(target.value);
  };

  return (
    <select
      data-testid="explore-by-area-dropdown"
      onChange={ handleChange }
    >
      <option
        data-testid="All-option"
      >
        All
      </option>
      {places.map((place, idx) => (
        <option
          data-testid={ `${place}-option` }
          key={ idx }
        >
          { place }
        </option>
      ))}
    </select>
  );
};

export default DropDownList;
