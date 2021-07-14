import React from 'react';
import { Link } from 'react-router-dom';
import HeadBar from '../Components/HeadBar';
import Footer from '../Components/Footer';

function Explore() {
  return (
    <div className="tela-explore">
      <HeadBar title="Explore" />
      <div className="foodScreen">
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
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Explore;
