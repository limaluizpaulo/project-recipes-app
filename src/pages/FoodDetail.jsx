import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

function FoodDetail() {
  const { id } = useParams();
  const history = useHistory();

  function teste() {
    return history.push(`/comidas/${id}/in-progress`);
  }

  return (
    <button type="button" onClick={ teste }>ir</button>
  );
}

export default FoodDetail;
