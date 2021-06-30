import React from 'react';
import { Link } from 'react-router-dom';
import HeadBar from '../Components/HeadBar';

function Explore() {
  return (
    <div className="foodScreen">
      <HeadBar title="Explore" />
      <Link to="explorar/comidas" data-testid="explore-food">Explorar Comidas</Link>
      <Link to="/explorar/bebidas" data-testid="explore-drinks">Explorar Bebidas</Link>
    </div>
  );
}

export default Explore;
