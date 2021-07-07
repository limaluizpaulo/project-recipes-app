import React, { useContext, useEffect, useState } from 'react';
import { MealsContext } from '../context/MealsProvider';
import fetchAreas from '../services/api/fetchAreas';
import fetchFilteredByArea from '../services/api/fetchFilteredByArea';

const AreasDropDown = () => {
  const { setMeals } = useContext(MealsContext);

  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const load = async () => {
      const newAreas = await fetchAreas();
      setAreas(['All', ...newAreas]);
    };
    load();
  }, []);

  const handleChange = async ({ target: { value } }) => {
    const filtered = await fetchFilteredByArea(value);
    setMeals(filtered);
  };
  return (
    <section>

      <label htmlFor="areas">
        <select
          name="areas"
          id="areas"
          onChange={ handleChange }
          data-testid="explore-by-area-dropdown"
        >
          {areas.map(((area, i) => (
            <option
              key={ i }
              value={ area }
              data-testid={ `${area}-option` }
            >
              {area}
            </option>
          )))}
        </select>
      </label>
    </section>

  );
};

export default AreasDropDown;
