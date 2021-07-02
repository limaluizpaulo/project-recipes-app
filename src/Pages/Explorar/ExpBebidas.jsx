import React, { useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import Context from '../../context/Context';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';

export default function ExpBebidas() {
  const { openSearchBar } = useContext(Context);

  return (
    <div>
      <Header />
      { openSearchBar ? <SearchBar /> : null }
      <ButtonGroup vertical>
        <Button
          href="/explorar/bebidas/ingredientes"
          data-testid="explore-by-ingredient"
          variant="outline-primary"
          size="lg"
          className="mb-2"
        >
          Por Ingredientes
        </Button>
        <Button
          data-testid="explore-surprise"
          variant="outline-dark"
          size="lg"
          className="mb-2"
        >
          Me Surpreenda!
        </Button>
        {/* <Button
          href="/explorar"
          variant="danger"
          size="lg"
          className="mb-2"
        >
          Voltar
        </Button> */}
      </ButtonGroup>
    </div>
  );
}
