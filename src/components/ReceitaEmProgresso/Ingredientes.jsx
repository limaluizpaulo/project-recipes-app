import React, { useEffect, useState } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { addIngredients, getIngredients } from '../../services/localStorage';

function Ingredientes({ listaIngredientes, getIngredientsParams }) {
  const [ingredientesEmProgresso, setIngredientesEmProgresso] = useState([]);

  const handleChange = ({ target: { checked, name } }) => {
    if (checked) {
      setIngredientesEmProgresso([...ingredientesEmProgresso, name]);
    } else {
      setIngredientesEmProgresso(ingredientesEmProgresso.filter(
        (ingrediente) => ingrediente !== name,
      ));
    }
  };

  useEffect(() => {
    const { apelidoAPI, id } = getIngredientsParams;
    const ingredientesSalvos = getIngredients(apelidoAPI, id);
    if (ingredientesSalvos) {
      setIngredientesEmProgresso(ingredientesSalvos);
    }
  }, []);

  useEffect(() => {
    const { apelidoAPI, id } = getIngredientsParams;
    addIngredients(apelidoAPI, id, ingredientesEmProgresso);
  }, [ingredientesEmProgresso]);

  return (
    <>
      {listaIngredientes.map(([nome, medida], index) => (
        <div key={ nome } className="mb-3">
          <label
            htmlFor={ nome }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ nome }
              name={ nome }
              value={ nome }
              onChange={ handleChange }
              checked={ ingredientesEmProgresso.includes(nome) }
            />
            { `${medida} ${nome}` }
          </label>
        </div>
      ))}
    </>
  );
}

Ingredientes.propTypes = {
  listaIngredientes: arrayOf(
    arrayOf(string), arrayOf(string),
  ).isRequired,
  getIngredientsParams: shape({
    apelidoAPI: string,
    id: string,
  }).isRequired,
};

export default Ingredientes;
