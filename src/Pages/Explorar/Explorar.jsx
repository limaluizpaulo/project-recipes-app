import React, { useContext } from 'react';
import { Button } from 'bootstrap';
import Context from '../../context/Context';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';

export default function Explorar() {
  const { openSearchBar } = useContext(Context);

  return (
    <div>
      <Header />
      { openSearchBar ? <SearchBar /> : null }
      <Button variant="outline-primary" size="lg">
        Eplorar Comidas
      </Button>
      <Button variant="outline-primary" size="lg">
        Eplorar Bebidas
      </Button>
    </div>
  );
}
