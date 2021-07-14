import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../helpers/Button';
import RecipesContext from '../contexts/RecipesContext';

function Explore() {
  const history = useHistory();
  const { setIngredient } = useContext(RecipesContext);
  useEffect(() => { setIngredient(''); }, []);

  return (
    <div>
      <Header title="Explorar" />
      <Button
        label="Explorar Comidas"
        testid="explore-food"
        func={ () => history.push('/explorar/comidas') }
      />
      <Button
        label="Explorar Bebidas"
        testid="explore-drinks"
        func={ () => history.push('/explorar/bebidas') }
      />
      <Footer />
    </div>
  );
}

export default Explore;
