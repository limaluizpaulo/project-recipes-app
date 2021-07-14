import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      Not Found
      <Link to="/explorar">
        <button type="button">voltar</button>
      </Link>
    </div>
  );
}
