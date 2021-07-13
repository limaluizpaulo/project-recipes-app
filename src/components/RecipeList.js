import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

function RecipeList({ list, listAll, filterList }) {
  const [object, setObject] = useState(listAll);
  // const [show, setShow] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(list).length > 0) {
      // setShow(true);
      setObject(list);
    }
  }, [list]);

  useEffect(() => {
    console.log(filterList);
    if (Object.keys(filterList).length > 0) {
      if (filterList[Object.keys(filterList)[0]] === null) {
        // setShow(false);
      } else {
        // setShow(true);
        setObject(filterList);
      }
    }
  }, [filterList]);

  const type = Object.keys(object)[0];
  const NUMBER = 12;
  // console.log(object);
  return (
    <div>
      { Object.keys(object).length !== 0 && (
        <div className="show-recipe">
          { object[type].slice(0, NUMBER).map((element, index) => (
            <button
              type="button"
              className="papai"
              key={ index }
              data-testid={ `${index}-recipe-card` }
              onClick={ () => (type === 'meals'
                ? history.push(`/comidas/${element.idMeal}`)
                : history.push(`/bebidas/${element.idDrink}`)) }
            >
              <img
                className="filhinho"
                src={ type === 'meals'
                  ? element.strMealThumb : element.strDrinkThumb }
                data-testid={ `${index}-card-img` }
                alt={ type === 'meals' ? element.strMeal : element.strDrink }
                width="20%"
              />
              <p data-testid={ `${index}-card-name` }>
                { type === 'meals' ? element.strMeal : element.strDrink }
              </p>
            </button>
          ))}
        </div>)}
    </div>
  );
}

RecipeList.propTypes = {
  list: PropTypes.shape,
  listAll: PropTypes.shape,
  filterlist: PropTypes.shape,
}.isRequired;

const mapStateToProps = ({ recipeList: { list, filterList } }) => ({
  list,
  filterList,
});

export default connect(mapStateToProps)(RecipeList);
