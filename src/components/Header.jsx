import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import RecipeContext from '../context';

function Header({ title, search }) {
  const history = useHistory();
  const { showSearch, setShowSearch } = useContext(RecipeContext);

  // const handleClick = () => {
  //   history.push('/perfil');
  // };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home" className="d-flex">
        <Link to="/perfil" className="mr-2">
          <img
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </Link>
        <h2 className="font-weight-normal" data-testid="page-title">{title}</h2>
      </Navbar.Brand>
      {search && (
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      )}
      <Navbar.Collapse id="basic-navbar-nav">
        <SearchBar />
      </Navbar.Collapse>
    </Navbar>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
