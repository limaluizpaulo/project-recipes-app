import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import DetailsContext from '../../context/details.context';
import { getDetails } from '../../helpers';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExplorarComidaOuBebida() {
  const { setDetails, setIngredients, setMeasures } = useContext(DetailsContext);
  const { location: { pathname }, push } = useHistory();

  const isDrinks = pathname.includes('bebidas');
  const idKey = isDrinks ? 'idDrink' : 'idMeal';
  const title = isDrinks ? 'Bebidas' : 'Comidas';
  const type = isDrinks ? 'drinks' : 'meals';
  const typePt = isDrinks ? 'bebidas' : 'comidas';

  async function surpriseMe() {
    const result = await getDetails(type, null, true);
    if (result[0]) {
      setDetails(result[0]);
      setIngredients(result[1]);
      setMeasures(result[2]);
    }

    push(`/${typePt}/${result[0][idKey]}`);
  }

  return (
    <div>
      <Header title={ `Explorar ${title}` } showSearchIcon={ false } />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => push(`/explorar/${typePt}/ingredientes`) }
        >
          Por Ingredientes
        </button>
        {isDrinks ? null : (
          <button
            type="button"
            data-testid="explore-by-area"
            onClick={ () => push(`/explorar/${typePt}/area`) }
          >
            Por Local de Origem
          </button>
        )}
        <button
          type="button"
          onClick={ surpriseMe }
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarComidaOuBebida;
