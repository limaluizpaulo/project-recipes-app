import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../helpers/Button';

function ExploreRecipes() {
  const history = useHistory();
  const { pathname } = useLocation();
  const food = pathname.includes('bebidas') ? 'Bebidas' : 'Comidas';

  return (
    <div>
      <Header title={ `Explorar ${food}` } />
      <Button
        label="Por Ingredientes"
        testid="explore-by-ingredient"
        func={ () => history.push(`/explorar/${food.toLowerCase()}/ingredientes`) }
      />
      {food === 'Comidas'
      && <Button
        label="Por Local de Origem"
        testid="explore-by-area"
        func={ () => history.push(`/explorar/${food.toLowerCase()}/area`) }
      />}
      <Button
        label="Me Surpreenda!"
        testid="explore-surprise"
        func={ () => history.push('/explorar/bebidas') }
      />
      <Footer />
    </div>
  );
}

export default ExploreRecipes;
