import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import Context from '../context/Context';
// import Meal from './Meal';
import ItemCard from './ItemCard';

export default function CocktailList() {
  const [showCocktails, setShowCocktails] = useState(false);
  const { cocktailsRecipes } = useContext(Context);
  const history = useHistory();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setShowCocktails(true);
    }
  }, [cocktailsRecipes]);

  const renderCards = () => {
    if (cocktailsRecipes && cocktailsRecipes.length === 1) {
      console.log('3');
      return history.push(`/bebidas/${cocktailsRecipes[0].idDrink} `);
    }

    if (cocktailsRecipes && cocktailsRecipes.length > 1) {
      const NUMBER = 12;
      return cocktailsRecipes.map((item, index) => {
        if (index < NUMBER) {
          return (<ItemCard key={ index } item={ item } i={ index } />);
        }
        return null;
      });
    }

    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return null;
  };

  return (
    <Container>
      { showCocktails ? renderCards() : <Spinner animation="border" /> }
    </Container>
  );
}
