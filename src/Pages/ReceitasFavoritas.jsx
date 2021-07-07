import React from 'react';
import { Container } from 'react-bootstrap';
import FavoritesCard from '../components/FavoritesCard';
import Header from '../components/Header';

export default function ReceitasFavoritas() {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));

  return (
    <Container>
      <Header title="Receitas Favoritas" />
      {
        favorites && favorites.map((favorite) => (
          <FavoritesCard key={ favorite.id } favorite={ favorite } />
        ))
      }
    </Container>
  );
}
