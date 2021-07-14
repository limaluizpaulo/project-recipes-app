import React, { useContext } from 'react';
import FetchContext from '../context/FetchContext';
import { fetchArea } from '../services/Api';

function DropDownArea() {
  const { areasFood, setData } = useContext(FetchContext);

  async function rendercards({ target: { value } }) {
    const filterArea = await fetchArea(value);
    setData(filterArea);
  }

  return (
    <select
      name="area"
      id="area"
      data-testid="explore-by-area-dropdown"
      onChange={ rendercards }
    >
      <option
        data-testid="All-option"
        value="All"
      >
        All
      </option>
      {areasFood.map(({ strArea }, index) => (
        <option
          key={ index }
          value={ `${strArea}` }
          data-testid={ `${strArea}-option` }
        >
          {strArea}
        </option>
      ))}
    </select>
  );
}

export default DropDownArea;
