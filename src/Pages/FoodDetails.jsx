/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ClipboardJS from 'clipboard';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setProgressItem } from '../services/services';
import { GetRecipesDetails, getFoods } from '../redux/actions';
import CarroselBebidas from '../Components/CarroselBebidas';
import BeverageAPI from '../services/BeverageRecipesAPI';
import MealRecipesAPI from '../services/MealRecipesAPI';
import Share from '../images/shareIcon.svg';
import Favorite from '../images/whiteHeartIcon.svg';
import '../styles/Card.css';
import '../styles/Buttons.css';

const FoodDetails = (props) => {
  const clipboard = new ClipboardJS('.share');
  const { match: { params: { id } } } = props;
  const [item, setItem] = useState({});
  const [isCopy, setIsCopy] = useState(false);
  const [loading, setLoading] = useState(true);
  const inProgressItems = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
  const inProgressItemsIDs = Object.keys(inProgressItems.meals || {});
  const {
    getId,
    food,
    redirect,
  } = props;
  async function resultFood() {
    const listRecomendations = await BeverageAPI.getByDefault();
    setItem({ listRecomendations });
  }
  useEffect(() => {
    if (loading) {
      getId(id)
        .then(() => resultFood()
          .then(() => setLoading(false)));
    }
  }, []);

  useEffect(() => () => clipboard.destroy(), []);

  function copyLink() {
    setIsCopy(true);
  }

  return !redirect ? <h3>Loading</h3>
    : (
      <div className="card-details">
        { food.map((foodItem, index) => (
          <React.Fragment key={ index }>

            <button
              key={ index }
              type="button"
              data-testid="share-btn"
              className="share"
              data-clipboard-text={ window.location.href }
              onClick={ copyLink }
            >
              {isCopy ? 'Link copiado!' : <img alt="share-btn" src={ Share } />}
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
              src={ foodItem.strMealThumb }
              alt="food"
              width="100"
            />
            <h3 data-testid="recipe-title">{foodItem.strMeal}</h3>
            <h6 data-testid="recipe-category">{foodItem.strCategory}</h6>
            <ul>
              {
                Object.entries(foodItem).filter((entrie) => {
                  const [key, value] = entrie;
                  return key.startsWith('strIngredient') && value;
                }).map((el, i) => (
                  <li
                    key={ el[0] }
                    data-testid={ `${i}-ingredient-name-and-measure` }
                  >
                    {`${el[1]} ${foodItem[`strMeasure${i + 1}`]}`}
                  </li>))
              }
            </ul>
            <p data-testid="instructions">{foodItem.strInstructions}</p>
            <span data-testid="video">video</span>
            {/* <embed
              width="560"
              height="315"
              src={ foodItem.strVideo }
              title={ foodItem.strMeal }
              frameBorder="0"
              allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            /> */}
            <CarroselBebidas recomendations={ item.listRecomendations || [] } />
            <Link to={ `/comidas/${id}/in-progress` }>
              <button
                className="start"
                type="button"
                data-testid="start-recipe-btn"
                onClick={ () => setProgressItem(id, 'meals') }
              >
                {inProgressItemsIDs.includes(id)
                  ? 'Continuar Receita' : 'Iniciar Receita'}

              </button>
            </Link>
          </React.Fragment>

        ))}
      </div>
    );
};

FoodDetails.propTypes = PropTypes.shape({}).isRequired;

const mapStateToProps = (state) => ({
  food: state.details.item,
  redirect: state.details.shouldRedirect,
});

const mapDispatchToProps = (dispatch) => ({
  getId: (value) => dispatch(GetRecipesDetails(value, MealRecipesAPI.getFoodById)),
  getDrinkId: (value, callback) => dispatch(getFoods(value, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetails);
