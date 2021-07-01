import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import Context from '../context/Context';
import Cocktail from './Cocktail';

export default function CocktailList() {
  const [showCocktail, setShowCocktail] = useState(false);
  const { cocktailRecipes } = useContext(Context);
  const history = useHistory();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setShowCocktail(true);
    }
  }, [cocktailRecipes]);

  const renderCards = () => {
    if (!cocktailRecipes.length) {
      return null; // alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (cocktailRecipes && cocktailRecipes.length > 1) {
      const NUMBER = 12;
      return cocktailRecipes.map((cocktail, index) => {
        if (index < NUMBER) {
          return (<Cocktail key={ index } cocktail={ cocktail } index={ index } />);
        }
        return null;
      });
    }
    if (cocktailRecipes && cocktailRecipes.length === 1) {
      return history.push(`/bebidas/${cocktailRecipes[0].idDrink} `);
    }
  };

  return (
    <Container>
      { showCocktail ? renderCards() : <Spinner animation="border" /> }
    </Container>
  );
}
