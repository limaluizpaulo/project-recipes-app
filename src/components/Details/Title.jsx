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

  const loadFavoritesLocalStorage = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const urlId = window.location.href.split('/')[4];

    if (!favorites || !favorites[0]) {
      console.log('n exist');
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      console.log('s exist');

      const exist = favorites.find(({ id: idFavorito }) => idFavorito === urlId);
      if (exist) {
        setIsFavorite(true);
      }
    }
  }

  useEffect(() => {
    loadFavoritesLocalStorage();
  }, []);

  const handleShare = () => {
    const SECONDS = 3000;
    const url = window.location.href;
    copy(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), SECONDS);
  };

  const updateFavoritesLocalStorage = () => {
    const { area, type, thumb, category } = currentRecipe;
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let newFavorite = {};

    if (currentRecipe.video) {
      newFavorite = {
        id, type, area, category: subtitle, alcoholicOrNot: '', name: title, image: thumb
      };
    } else {
      newFavorite = {
        id, type, area: '', category, alcoholicOrNot: subtitle, name: title, image: thumb
      };
    }

    if (!favorites || !favorites[0]) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
    } else {
      const exist = favorites.find(({ id: idFavorito }) => idFavorito === id);

      if (!exist) {
        favorites.push(newFavorite);
        localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
      } else {
        localStorage.setItem(
          'favoriteRecipes', JSON.stringify(
            favorites.filter(({ id: idFavorito }) => idFavorito !== id),
          ),
        );
      }
    }
  };

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
        <Button onClick={ handleShare } data-testid="share-btn" variant="primary">
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
