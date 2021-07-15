import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'react-bootstrap';
import { verifyFavorite } from '../services/manageLocalStorage';
import { settingFavorite2 } from '../services/manageLocalStorage2';
import DecentFooter from '../components/DecentFooter';
import Header from '../components/Header';
import BodyFavoriteRecipes from '../components/BodyFavoriteRecipes';

export default function FavoriteRecipes({ history }) {
  const [whatIsActivated, setWhatIsActivated] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const rawDestructuredStorage = localStorage.getItem('favoriteRecipes');
  const destructuredStorage = JSON.parse(rawDestructuredStorage);

  const attStateFilter = (selected) => {
    setWhatIsActivated(selected);
  };
  const renderFilteredList = () => {
    let filteredList = [];
    if (whatIsActivated === 0) {
      filteredList = destructuredStorage;
    }
    if (whatIsActivated === 1) {
      filteredList = destructuredStorage
        .filter((eachOne) => eachOne.type === 'comida');
    }
    if (whatIsActivated === 2) {
      filteredList = destructuredStorage
        .filter((eachOne) => eachOne.type === 'bebida');
    }
    return (filteredList
      .map((each, index) => (
        <main key={ index }>
          <BodyFavoriteRecipes
            key={ index }
            index={ index }
            history={ history }
            each={ each }
          />
          <Button
            variant="outline-danger"
            type="button"
            onClick={ () => setRefresh(settingFavorite2(each, each.id, refresh)) }
          >
            <img
              alt="Favorite"
              src={ verifyFavorite(each.id) }
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </Button>
        </main>
      )));
  };
  return (
    <article>
      <Header title="Receitas Favoritas" />
      <section className="buttons-fav">
        <Button
          variant="outline-dark"
          data-testid="filter-by-all-btn"
          onClick={ () => attStateFilter(0) }
          type="button"
        >
          Todas
        </Button>
        <Button
          variant="outline-dark"
          data-testid="filter-by-food-btn"
          onClick={ () => attStateFilter(1) }
          type="button"
        >
          Comidas
        </Button>
        <Button
          variant="outline-dark"
          data-testid="filter-by-drink-btn"
          onClick={ () => attStateFilter(2) }
          type="button"
        >
          Bebidas
        </Button>
      </section>
      {destructuredStorage ? renderFilteredList() : null}
      <DecentFooter />
    </article>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};
