/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GetRecipesDetails, getDrinks } from '../redux/actions';
import CarroselComidas from '../Components/CarroselComidas';
import BeverageAPI from '../services/BeverageRecipesAPI';
import MealRecipesAPI from '../services/MealRecipesAPI';
import Share from '../images/shareIcon.svg';
import Favorite from '../images/whiteHeartIcon.svg';
import '../styles/Card.css';

const DrinkDetails = (props) => {
  const { match: { params: { id } } } = props;
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const {
    drinkId,
    getDrinkId,
    drink,
    redirect,
  } = props;
  console.log(drink);
  async function resultDrink() {
    const listRecomendations = await MealRecipesAPI.getByDefault();
    await getDrinkId(id, BeverageAPI.getDrinkById);
    setItem({ listRecomendations });
  }
  // const recomendationsList = item.listRecomendations;
  useEffect(() => {
    if (loading) {
      drinkId(id)
        .then(() => resultDrink()
          .then(() => setLoading(false)));
    }
  }, []);

  return !redirect ? <h3>Loading</h3>
    : (
      <div className="card-details">
        { drink.map((drinkItem, index) => (
          <>
            <button
              type="button"
              data-testid="share-btn"
            >
              <img alt="share-btn" src={ Share } />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
            >
              <img alt="favorite-btn" src={ Favorite } />
            </button>
            <img
              key={ index }
              data-testid="recipe-photo"
              src={ drinkItem.strDrinkThumb }
              alt="drink"
              width="300"
            />
            <h3 data-testid="recipe-title">{drinkItem.strDrink}</h3>
            <h6 data-testid="recipe-category">{drinkItem.strAlcoholic}</h6>
            <ul>
              {
                Object.entries(drinkItem).filter((entrie) => {
                  const [key, value] = entrie;
                  return key.startsWith('strIngredient') && value;
                }).map((el, i) => (
                  <li
                    key={ el[0] }
                    data-testid={ `${i}-ingredient-name-and-measure` }
                  >
                    {`${el[1]} ${drinkItem[`strMeasure${i + 1}`]}`}
                  </li>))
              }
            </ul>
            <p data-testid="instructions">{drinkItem.strInstructions}</p>
            <iframe
              width="560"
              height="315"
              src={ drinkItem.strVideo }
              title={ drinkItem.strDrink }
              frameBorder="0"
              allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <CarroselComidas recomendations={ item.listRecomendations || [] } />
          </>
        ))}
      </div>
    );
};

DrinkDetails.propTypes = {
  id: PropTypes.any,
  drinkById: PropTypes.any,
}.isRiquered;

const mapStateToProps = (state) => ({
  drink: state.details.item,
  redirect: state.details.shouldRedirect,
});

const mapDispatchToProps = (dispatch) => ({
  drinkId: (value) => dispatch(GetRecipesDetails(value, BeverageAPI.getDrinkById)),
  getDrinkId: (value, callback) => dispatch(getDrinks(value, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinkDetails);
