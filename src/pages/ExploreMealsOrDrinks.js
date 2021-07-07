import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useRouteMatch } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoods() {
  const [verifyPath, setVerifyPath] = useState(true);
  const { path } = useRouteMatch();

  useEffect(() => {
    setVerifyPath(path.includes('/comidas'));
  }, [path]);

  return (
    <>
      <Header />
      <Link to="/explorar/comidas/ingredientes">
        <Button variant="primary" data-testid="explore-by-ingredient">
          Por Ingredientes
        </Button>
      </Link>
      {verifyPath && (
        <Link to="/explorar/comidas/area">
          <Button variant="primary" data-testid="explore-by-area">
            Por Local de Origem
          </Button>
        </Link>)}
      <Button variant="primary" data-testid="explore-surprise">
        Me Surpreenda!
      </Button>
      <Footer />
    </>
  );
}

export default ExploreFoods;
