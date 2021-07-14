import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function IngList({ details }) {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measuresList, setMeasuresList] = useState([]);

  useEffect(() => {
    const objKeys = Object.keys(details);

    const ingredientName = objKeys.filter((key) => key.includes('strIngredient'));
    const ingredientMeasures = objKeys.filter((key) => key.includes('strMeasure'));

    const ingredientItems = [];
    const ingredientQuanti = [];

    ingredientName.forEach((item) => {
      if (details[item] !== null || details[item !== '']) {
        ingredientItems.push(details[item]);
      }
    });
    setIngredientsList(ingredientItems);

    ingredientMeasures.forEach((item) => {
      if (details[item] !== null || details[item !== '']) {
        ingredientQuanti.push(details[item]);
      }
    });
    setMeasuresList(ingredientQuanti);
  }, [details]);

  return (
    <section>
      Lista de ingredientes :
      <ul>
        {
          ingredientsList.map((item, idx) => (
            <li
              key={ idx }
              data-testid={ `${idx}-ingredient-name-and-measure` }
            >
              { `${measuresList[idx]} of ${item}`}
            </li>
          ))
        }
      </ul>
    </section>
  );
}

IngList.propTypes = {
  details: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  ).isRequired,
};

// IngList.defaultProps = {
//   details: undefined,
// };

export default IngList;
