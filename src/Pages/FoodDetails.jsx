/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GetRecipesDetails, getFoods } from '../redux/actions';
import CarroselBebidas from '../Components/CarroselBebidas';
import BeverageAPI from '../services/BeverageRecipesAPI';
import MealRecipesAPI from '../services/MealRecipesAPI';
import Share from '../images/shareIcon.svg';
import FavoriteWhite from '../images/whiteHeartIcon.svg';
import FavoriteBlack from '../images/blackHeartIcon.svg';
import '../styles/Card.css';

const FoodDetails = (props) => {
  const { match: { params: { id } } } = props;
  const [item, setItem] = useState({});
  const [visible, setVisible] = useState('hidden');
  const [favoriteBtn, setFavoriteBtn] = useState(true);
  const [loading, setLoading] = useState(true);
  const {
    foodId,
    getFoodId,
    food,
    redirect,
  } = props;

  async function resultFood() {
    const listRecomendations = await BeverageAPI.getByDefault();
    await getFoodId(id, MealRecipesAPI.getFoodById);
    setItem({ listRecomendations });
  }
  // const recomendationsList = item.listRecomendations;
  useEffect(() => {
    if (loading) {
      foodId(id)
        .then(() => resultFood()
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

  return !redirect ? <h3>Loading</h3>
    : (
      <div className="card-details">
        { food.map((foodItem, index) => (
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
              src={ foodItem.strMealThumb }
              alt="food"
              width="300"
            />
            <h3 data-testid="recipe-title">{foodItem.strMeal}</h3>
            <h6 data-testid="recipe-category">{foodItem.strCategory}</h6>
            <div>
              {
                Object.entries(foodItem).filter((entrie) => {
                  const [key, value] = entrie;
                  return key.startsWith('strIngredient') && value;
                }).map((el, i) => (
                  <>
                    <input
                      type="checkbox"
                      key={ el[0] }
                      data-testid={ `${i}-ingredient-name-and-measure` }
                    />
                    {`${el[1]} ${foodItem[`strMeasure${i + 1}`]}`}
                  </>
                ))
              }
            </div>
            <p data-testid="instructions">{foodItem.strInstructions}</p>
            <iframe
              data-testid="video"
              src={ foodItem.strVideo }
              title={ foodItem.strFood }
              frameBorder="0"
              allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <CarroselBebidas recomendations={ item.listRecomendations || [] } />
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

FoodDetails.propTypes = {
  id: PropTypes.any,
  FoodById: PropTypes.any,
}.isRequired;

const mapStateToProps = (state) => ({
  food: state.details.item,
  redirect: state.details.shouldRedirect,
});

const mapDispatchToProps = (dispatch) => ({
  foodId: (value) => dispatch(GetRecipesDetails(value, MealRecipesAPI.getFoodById)),
  getFoodId: (value, callback) => dispatch(getFoods(value, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetails);
