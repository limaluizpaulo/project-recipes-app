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
    <main>
      <Header title={ `Explorar ${title}` } showSearchIcon={ false } />
      <div>
        <button
          type="button"
          onClick={ () => push(`/explorar/${typePt}/ingredientes`) }
        >
          Por Ingredientes
        </button>
        {isDrinks ? null : (
          <button
            type="button"
            onClick={ () => push(`/explorar/${typePt}/area`) }
          >
            Por Local de Origem
          </button>
        )}
        <button
          type="button"
          onClick={ surpriseMe }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </main>
  );
}

export default ExploreByType;
