import React from 'react';

const AreasDropDown = ({ areas }) => (
  <label htmlFor="areas">
    <select
      name="areas"
      id="areas"
      onChange={ ({ target }) => console.log(target.value) }
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
);

export default AreasDropDown;
