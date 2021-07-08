import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import DetailsContext from '../../context/details.context';
import { getDetails, setConstants } from '../../helpers';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExploreByType() {
  const { setDetails } = useContext(DetailsContext);
  const { location: { pathname }, push } = useHistory();

  const isDrinks = pathname.includes('bebidas');
  const { idKey, title, type, typePt } = setConstants(isDrinks);

  async function surpriseMe() {
    const result = await getDetails({ isRandom: true, type, setDetails });
    push(`/${typePt}/${result[idKey]}`);
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

export default ExploreByType;
