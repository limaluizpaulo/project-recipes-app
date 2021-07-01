import React from 'react';
import { useParams } from 'react-router-dom';

function DetalhesBebida() {
  const { id } = useParams();
  return (
    <div>
      <p>{ id }</p>
    </div>
  );
}

export default DetalhesBebida;
