import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import DescriptionRecipeCard from '../components/DescriptionRecipeCard';
import Header from '../components/Header';

export default function ReceitasFeitas() {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [updateCards, setUpdateCards] = useState(false);

  return (
    <Container>
      <Header title="Receitas Feitas" />
      {
        favorites && favorites.map((favorite, index) => (
          <DescriptionRecipeCard
            updateCards={ updateCards }
            setUpdateCards={ setUpdateCards }
            key={ favorite.id }
            index={ index }
            recipe={ favorite }
            page="mades"
          />
        ))
      }
    </Container>
  );
}
