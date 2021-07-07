import React, { useEffect, useState } from 'react';
import { Container, Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

import ShareButton from './ShareButton';

export default function Title({ currentRecipe, subtitle }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const url = window.location.href;
  const { id, type, area, category, alcoholicOrNot, name, image } = currentRecipe;

  // Atualiza o estado de item favoritado
  const updateFavoriteState = (favorites) => {
    const urlId = url.split('/')[4];

    const exist = favorites.find(({ id: idFavorito }) => idFavorito === urlId);
    if (exist) {
      setIsFavorite(true);
    }
  };

  // Carrega todo o localstorage
  const loadFavoritesLocalStorage = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));

    switch (!favorites) {
    case true:
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      break;
    default:
      updateFavoriteState(favorites);
      break;
    }
  };

  useEffect(() => {
    loadFavoritesLocalStorage();
  }, []);

  // Gera o objeto que será adicionado no localstorage
  const generateLocalStorageObject = () => {
    switch (type) {
    case 'comida':
      return {
        id, type, area, category, alcoholicOrNot: '', name, image,
      };
    case 'bebida':
      return {
        id, type, area: '', category, alcoholicOrNot, name, image,
      };
    default:
      return {};
    }
  };

  // Cria um localStorage, caso não exista
  const createFavoriteToLocalStorage = (newFavorite) => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
  };

  // Adiciona/Remove item do local
  const addFavoriteToLocalStorage = (favorites, newFavorite) => {
    const exist = favorites.find(({ id: idFavorito }) => idFavorito === id);

    if (!exist) {
      favorites.push(newFavorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    } else {
      const removed = favorites.filter(({ id: idFavorito }) => idFavorito !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removed));
    }
  };

  // Atualiza o localStorage
  const updateFavoritesLocalStorage = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorite = generateLocalStorageObject();

    switch (!favorites) {
    case true:
      createFavoriteToLocalStorage(newFavorite);
      break;
    default:
      addFavoriteToLocalStorage(favorites, newFavorite);
      break;
    }
  };

  // Ação ao clicar em favoritar
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    updateFavoritesLocalStorage();
  };

  return (
    <Container>
      <section>
        <strong data-testid="recipe-title">{ name }</strong>
      </section>
      <section>
        <i data-testid="recipe-category">{ subtitle }</i>
      </section>
      <section>
        <ShareButton id={ id } type={ type } />
        <Container>
          <Button onClick={ handleFavorite } variant="success" block>
            <Image
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            />
          </Button>
        </Container>
      </section>
      <br />
    </Container>
  );
}

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}.isRequired;
