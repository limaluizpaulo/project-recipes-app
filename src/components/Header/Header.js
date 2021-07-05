import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './style/Header.css';

import SearchForm from './SearchForm';
import SearchIcon from './SearchIcon';

import pageTitleByLocation from '../../services/pageTitleByLocation';
import { allowedSearchIconPaths } from '../../services/allowanceToRender';

import ProfileIcon from '../../images/profileIcon.svg';

function Header() {
  const [searchIcon, setSearchIcon] = useState(true);
  const [searchForm, setSearchForm] = useState(false);
  const [pageTitle, setPageTitle] = useState('Comidas');
  const location = useLocation();

  useEffect(() => {
    setPageTitle(pageTitleByLocation[location.pathname]);
  }, [location.pathname]);

  useEffect(() => {
    setSearchIcon(allowedSearchIconPaths.some((path) => (
      path === location.pathname
    )));
  }, [location.pathname]);

  return (
    <header>
      <section className="header">
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={ ProfileIcon } alt="profile-icon" />
        </Link>
        <h3 data-testid="page-title">{ pageTitle }</h3>
        {
          searchIcon ? <SearchIcon
            searchForm={ searchForm }
            setSearchForm={ setSearchForm }
          /> : <div style={ { width: '30px' } } />
        }
      </section>
      {searchForm && <SearchForm />}
    </header>
  );
}

export default Header;
