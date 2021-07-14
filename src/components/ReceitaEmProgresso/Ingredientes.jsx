import React, { useEffect, useState } from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import { addIngredients, getIngredients,
  removeIngredient } from '../../services/localStorage';

function Ingredientes({ listaIngredientes, getIngredientsParams, setIsComplete }) {
  const { apelidoAPI, id } = getIngredientsParams;
  const ingredientesSalvos = getIngredients(apelidoAPI, id);
  const [ingredientesMarcados, setIngredientesMarcados] = useState(null);

  useEffect(() => {
    if (!ingredientesSalvos.length) {
      setIngredientesMarcados(0);
    }
  }, []);

  useEffect(() => {
    if (ingredientesMarcados === listaIngredientes.length) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [ingredientesMarcados]);

  const handleChange = ({ target: { checked, name } }) => {
    if (checked) {
      addIngredients(apelidoAPI, id, name);
      setIngredientesMarcados(ingredientesMarcados + 1);
    } else {
      removeIngredient(apelidoAPI, id, name);
      setIngredientesMarcados(ingredientesMarcados - 1);
    }
  };

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
              checked={ ingredientesSalvos.includes(nome) }
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
  setIsComplete: func.isRequired,
};

export default Ingredientes;
