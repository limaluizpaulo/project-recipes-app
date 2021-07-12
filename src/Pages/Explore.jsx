import React from 'react';
import { Link } from 'react-router-dom';
import HeadBar from '../Components/HeadBar';
import Footer from '../Components/Footer';
import Teste from './Teste';

function Explore() {
  return (
    <div className="foodScreen">
      <HeadBar title="Explore" />
      <Link
        to="/explorar/comidas"
        data-testid="explore-food"
        className="btn-explore"
      >
        Explorar Comidas
      </Link>
      <Link
        to="/explorar/bebidas"
        data-testid="explore-drinks"
        className="btn-explore"
      >
        Explorar Bebidas
      </Link>
      <Teste />
      <Footer />
    </div>
  );
}

export default Explore;
