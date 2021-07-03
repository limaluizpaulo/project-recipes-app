import React from 'react';

const FoodInProgressBtn = () => {
  const a = 'hold';
  return (
    <div>
      <button
        data-testid="finish-recipe-btn"
        type="button"
      >
        Finalizar
      </button>
    </div>
  );
};

export default FoodInProgressBtn;
