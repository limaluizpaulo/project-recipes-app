import React, { useEffect, useState } from 'react';
import { Container, Button, Image, Alert } from 'react-bootstrap';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function Title({ currentRecipe, id, title, subtitle }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const url = window.location.href;

  // Carrega todo o localstorage
  const loadFavoritesLocalStorage = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const urlId = url.split('/')[4];

    if (!favorites) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      const exist = favorites.find(({ id: idFavorito }) => idFavorito === urlId);
      if (exist) {
        setIsFavorite(true);
      }
    }
  };

  useEffect(() => {
    loadFavoritesLocalStorage();
  }, []);

  // Ação de clicar no botão compartilhar
  const handleShare = () => {
    const SECONDS = 3000;
    copy(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), SECONDS);
  };

  // Gera o objeto que será adicionado no localstorage
  const generateLocalStorageObject = (type) => {
    const { area, thumb, category } = currentRecipe;

    switch (type) {
    case 'comida':
      return {
        id, type, area, category: subtitle, alcoholicOrNot: '', name: title, image: thumb,
      };
    case 'bebida':
      return {
        id, type, area: '', category, alcoholicOrNot: subtitle, name: title, image: thumb,
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
    const { type } = currentRecipe;
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorite = generateLocalStorageObject(type);

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
        <strong data-testid="recipe-title">{ title }</strong>
      </section>
      <section>
        <i data-testid="recipe-category">{ subtitle }</i>
      </section>
      <section>
        <Button
          data-testid="share-btn"
          onClick={ handleShare }
          variant="primary"
        >
          <Image src={ shareIcon } />
          { isCopied && <Alert variant="primary">Link copiado!</Alert> }
        </Button>
        <Button onClick={ handleFavorite } variant="success">
          <Image
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          />
        </Button>
      </section>
      <br />
    </Container>
  );
}

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}.isRequired;
