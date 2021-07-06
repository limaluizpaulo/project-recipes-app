import React, { useContext, useEffect, useRef } from 'react';
import { Button, ButtonToolbar, Container } from 'react-bootstrap';
import Context from '../context/Context';

import '../styles/categories.css';

export default function CategoryFilter() {
  const { requestMealCategories, mealsCategories } = useContext(Context);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      requestMealCategories();
    } else {
      console.log(mealsCategories);
    }
  }, [mealsCategories, requestMealCategories]);

  return (
    <Container>
      <ButtonToolbar bsPrefix="categories-list">
        <Button bsPrefix="btn" data-testid="-category-filter">All</Button>
        <Button bsPrefix="btn" data-testid="Beef-category-filter">Beef</Button>
        <Button bsPrefix="btn" data-testid="Breakfast-category-filter">Breakfast</Button>
        <Button bsPrefix="btn" data-testid="Chicken-category-filter">Chicken</Button>
        <Button bsPrefix="btn" data-testid="Dessert-category-filter">Dessert</Button>
        <Button bsPrefix="btn" data-testid="Goat-category-filter">Goat</Button>
      </ButtonToolbar>
      <ButtonToolbar bsPrefix="categories-list">
        <Button bsPrefix="btn">All</Button>
        <Button bsPrefix="btn">Ordinary Drink</Button>
        <Button bsPrefix="btn">Cocktail</Button>
        <Button bsPrefix="btn">Milk / Float / Shake</Button>
        <Button bsPrefix="btn">Other / Unknown</Button>
        <Button bsPrefix="btn">Cocoa</Button>
      </ButtonToolbar>
    </Container>
  );
}
