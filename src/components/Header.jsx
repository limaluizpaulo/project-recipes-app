import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

// import SearchIconCocktail from './SearchIconCocktail';
import SearchIcon from './SearchIcon';
import ProfileIcon from './ProfileIcon';

export default function Header(props) {
  const {
    title = 'TÍTULO',
    searchIcon = false,
  } = props;

  return (
    <Container>
      <Row>
        <ProfileIcon />
        <Col>
          <h1 data-testid="page-title">
            { title }
          </h1>
        </Col>
        {/* { (title === 'Bebidas') && (searchIcon ? <SearchIconCocktail /> : null) } */}
        { (title === 'Comidas') && (searchIcon ? <SearchIcon /> : null) }
      </Row>
    </Container>
  );
}

Header.propTypes = {
  props: PropTypes.shape(),
}.isRequired;
