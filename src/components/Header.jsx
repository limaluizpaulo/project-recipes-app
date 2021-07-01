import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import profileImg from '../images/profileIcon.svg';
import searchImg from '../images/searchIcon.svg';

import SearchBar from './SearchBar';

function Header({ search, profile, name }) {
  const [dropDown, setDropDown] = useState(false);

  function showSearchBar() {
    setDropDown(!dropDown);
  }

  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col>
            {profile && (
              <button type="button">
                <Link to="/perfil">
                  <img
                    src={ profileImg }
                    alt="Ir para perfil"
                    data-testid="profile-top-btn"
                  />
                </Link>
              </button>
            )}

          </Col>
          <Col className="mt-1">
            {name && (
              <p data-testid="page-title">{ name }</p>
            )}

          </Col>
          <Col>
            {search && (
              <button type="button" onClick={ showSearchBar }>
                <img
                  src={ searchImg }
                  alt="Buscar receita"
                  data-testid="search-top-btn"
                />
              </button>
            )}
          </Col>
        </Row>
      </Container>
      {/* {profile && (
        <button type="button">
          <Link to="/perfil">
            <img src={ profileImg } alt="Ir para perfil" data-testid="profile-top-btn" />
          </Link>
        </button>
      )}
      {name && (
        <p data-testid="page-title">{ name }</p>
      )}
      {search && (
        <button type="button" onClick={ showSearchBar }>
          <img src={ searchImg } alt="Buscar receita" data-testid="search-top-btn" />
        </button>
      )} */}
      { dropDown && <SearchBar />}
    </>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
};

export default Header;
