import React, { useContext } from 'react';
import { Col, Image } from 'react-bootstrap';
import ContextBebidas from '../context/ContextBebidas';

import searchIcon from '../images/searchIcon.svg';

export default function SearchIcon() {
  const { handleSearchBarCocktail } = useContext(ContextBebidas);

  return (
    <Col>
      <Image
        src={ searchIcon }
        data-testid="search-top-btn"
        onClick={ handleSearchBarCocktail }
      />
    </Col>
  );
}
