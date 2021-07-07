import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Image } from 'react-bootstrap';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function FavoriteButton(
  { recipe, dataTestId, updateCards, setUpdateCards },
) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Atualiza o estado de item favoritado
  const updateFavoriteState = (favorites) => {
    const { id } = recipe;

    const exist = favorites.find(({ id: idFavorito }) => idFavorito === id);
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
  const generateLocalStorageObject = (type) => {
    const { id, category, alcoholicOrNot, name, area, image } = recipe;

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
    const { id } = recipe;
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
    const { type } = recipe;
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

  // // Ação ao clicar em favoritar
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    setUpdateCards(!updateCards);
    updateFavoritesLocalStorage();
  };

  return (
    <Container>
      <Button
        block
        onClick={ handleFavorite }
        variant="success"
      >
        <Image
          data-testid={ dataTestId }
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        />
      </Button>
    </Container>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    area: PropTypes.string,
    type: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }),
  dataTestId: PropTypes.string,
  updateCards: PropTypes.bool,
  setUpdateCards: PropTypes.func,
}.isRequired;
