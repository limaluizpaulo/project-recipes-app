/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { copy } from 'fs-extra';
import { GetRecipesDetails, getDrinks } from '../redux/actions';
import CarroselComidas from '../Components/CarroselComidas';
import BeverageAPI from '../services/BeverageRecipesAPI';
import MealRecipesAPI from '../services/MealRecipesAPI';
import Share from '../images/shareIcon.svg';
import FavoriteWhite from '../images/whiteHeartIcon.svg';
import FavoriteBlack from '../images/blackHeartIcon.svg';
import '../styles/Card.css';

const DrinkDetails = (props) => {
  const { match: { params: { id } } } = props;
  const [item, setItem] = useState({});
  const [visible, setVisible] = useState('hidden');
  const [favoriteBtn, setFavoriteBtn] = useState(true);
  const [loading, setLoading] = useState(true);
  const {
    drinkId,
    getDrinkId,
    drink,
    redirect,
  } = props;

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

  function checkBtnReceita() {
    const getReceitaStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    getReceitaStorage.forEach((receita) => {
      if (receita === id) {
        setVisible('');
      }
    });
  }

  function iniciarReceita() {
    const valueStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    localStorage.setItem('doneRecipes', JSON.stringify([...valueStorage, id]));
    checkBtnReceita();
  }

  function favoriteChanger() {
    setFavoriteBtn(!favoriteBtn);
  }

  function Checker() {
    console.log(drink[0]);
  }

  // const copy = require('clipboard-copy')

  return !redirect ? <h3>Loading</h3>
    : (
      <div className="card-details">
        { drink.map((drinkItem, index) => (
          <>
            <button
              type="button"
              data-testid="share-btn"
              // onClick={ () => copy('Link copiado!') }
            >
              <img alt="share-btn" src={ Share } />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ favoriteChanger }
            >
              <img
                alt="favorite-btn"
                data-testid="favorite-btn"
                src={ favoriteBtn ? FavoriteWhite : FavoriteBlack }
              />
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
            <div className="recipes-itens">
              {
                Object.entries(drinkItem).filter((entrie) => {
                  const [key, value] = entrie;
                  return key.startsWith('strIngredient') && value;
                }).map((el, i) => (
                  <>
                    <input
                      type="checkbox"
                      key={ el[0] }
                      data-testid={ `${i}-ingredient-name-and-measure` }
                      onChange={ Checker }
                    />
                    {`${el[1]} ${drinkItem[`strMeasure${i + 1}`]}`}
                  </>
                ))
              }
            </div>
            <p data-testid="instructions">{drinkItem.strInstructions}</p>
            <iframe
              data-testid="video"
              src={ drinkItem.strVideo }
              title={ drinkItem.strDrink }
              frameBorder="0"
              allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <CarroselComidas recomendations={ item.listRecomendations || [] } />
            <button
              type="button"
              className={ `btn-iniciar-receita ${visible}` }
              data-testid="start-recipe-btn"
              onClick={ iniciarReceita }
            >
              iniciar receita

            </button>
          </>
        ))}
      </div>
    );
};

DrinkDetails.propTypes = {
  id: PropTypes.any,
  drinkById: PropTypes.any,
}.isRequired;

const mapStateToProps = (state) => ({
  drink: state.details.item,
  redirect: state.details.shouldRedirect,
});

const mapDispatchToProps = (dispatch) => ({
  drinkId: (value) => dispatch(GetRecipesDetails(value, BeverageAPI.getDrinkById)),
  getDrinkId: (value, callback) => dispatch(getDrinks(value, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrinkDetails);
