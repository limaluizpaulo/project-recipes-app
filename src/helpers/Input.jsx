import React from 'react';

export default function Input(values) {
  const { className, func, label, testid, type, value, htmlFor, checked, name } = values;

  return (
    <label htmlFor={ htmlFor }>
      {label}
      <input
        name={ name }
        className={ className }
        data-testid={ testid }
        id={ testid }
        onChange={ ({ target }) => func(target.value) }
        type={ type }
        value={ value }
        checked={ checked }
      />
    </label>
  );
}
