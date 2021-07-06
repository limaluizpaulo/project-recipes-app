import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

function DrinkDetail() {
  const { id } = useParams();
  const history = useHistory();

  function teste() {
    return history.push(`/bebidas/${id}/in-progress`);
  }

  return (
    <button type="button" onClick={ teste }>ir</button>
  );
}

export default DrinkDetail;
