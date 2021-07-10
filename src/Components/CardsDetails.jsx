import React from 'react';
import PropTypes from 'prop-types';
import '../styles/CardsRecomendation.css';

export default class CardsDetails extends React.Component {
  render() {
    const SEIS = 6;
    const { recomendation, type } = this.props;

    return (
      <section>
        <h2>Recomendations</h2>
        <div className="list-cards">
          {
            (type === 'comidas')
              ? recomendation.map(({ idDrink,
                strDrink,
                strAlcoholic,
                strDrinkThumb }, index) => {
                if (index < SEIS) {
                  return (
                    <div
                      key={ idDrink }
                      data-testid={ `${index}-recomendation-card` }
                      className="container-card"
                    >
                      <img
                        src={ strDrinkThumb }
                        alt="card Drink"
                        className="image-card"
                      />
                      <p>{strAlcoholic }</p>
                      <h3 data-testid={ `${index}-recomendation-title` }>{strDrink}</h3>
                    </div>
                  );
                }
                return null;
              })
              : recomendation.map(({ idMeal,
                strMeal,
                strCategory,
                strMealThumb }, index) => {
                if (index < SEIS) {
                  return (
                    <div
                      key={ idMeal }
                      data-testid={ `${index}-recomendation-card` }
                      className="container-card"
                    >
                      <img
                        src={ strMealThumb }
                        alt="card Food"
                        className="image-card"
                      />
                      <p>{strCategory }</p>
                      <h3 data-testid={ `${index}-recomendation-title` }>{strMeal}</h3>
                    </div>
                  );
                }
                return null;
              })
          }
        </div>
      </section>
    );
  }
}

CardsDetails.propTypes = {
  recomendation: PropTypes.arrayOf(Object).isRequired,
}.isRequired;
