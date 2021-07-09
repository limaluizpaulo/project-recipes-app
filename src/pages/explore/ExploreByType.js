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
    <main className="control-buttons-page">
      <Header title={ `Explore ${title}` } showSearchIcon={ false } />
      <section className="control-buttons-container">
        <button
          type="button"
          className="control-button"
          onClick={ () => push(`/explorar/${typePt}/ingredientes`) }
        >
          By Ingredients
        </button>
        {isDrinks ? null : (
          <button
            type="button"
            className="control-button"
            onClick={ () => push(`/explorar/${typePt}/area`) }
          >
            By Region
          </button>
        )}
        <button
          type="button"
          className="last control-button"
          onClick={ surpriseMe }
        >
          Surprise Me!
        </button>
      </section>
      <Footer />
    </main>
  );
}

export default ExploreByType;
