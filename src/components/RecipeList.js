import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

function RecipeList({ list, listAll, filterList }) {
  const [object, setObject] = useState(list);
  const [show, setShow] = useState(false);
  // console.log(list, listAll);
  useEffect(() => {
    if (Object.keys(listAll).length > 0) {
      setShow(true);
    }
    setObject(listAll);
  }, [listAll]);

  useEffect(() => {
    if (Object.keys(list).length > 0) {
      setShow(true);
    }
    setObject(list);
  }, [list]);

  useEffect(() => {
    // console.log(Object.keys(filterList)[0]);
    if (Object.keys(filterList).length > 0) {
      if (filterList[Object.keys(filterList)[0]] === null) {
        setShow(false);
      } else {
        setShow(true);
      }
    }
    setObject(filterList);
  }, [filterList]);

  const type = Object.keys(object)[0];
  const NUMBER = 12;
  // console.log(type);
  return (
    <div className="show-recipe">
      { show && object[type].slice(0, NUMBER).map((element, index) => (
        <div
          className="papai"
          key={ index }
          data-testid={ `${index}-recipe-card` }
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
        </div>
      ))}
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
