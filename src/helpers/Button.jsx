import React from 'react';

export default function Button(values) {
  const { label, func, testid, className, disabled } = values;

  return (
    <button
      className={ className }
      data-testid={ testid }
      disabled={ disabled }
      id={ testid }
      onClick={ () => func() }
      type="button"
    >
      {label}
    </button>
  );
}
