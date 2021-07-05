import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function RecipeList({ status, list }) {
  console.log(list);
  const type = Object.keys(list)[0];
  const NUMBER = 12;
  console.log(type);
  return (
    <div>
      { status && list[type].slice(0, NUMBER).map((element, index) => (
        <div className="papai" key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            className="filhinho"
            src={ type === 'meals'
              ? element.strMealThumb : element.strDrinkThumb }
            data-testid={ `${index}-card-img` }
            alt={ type === 'meals' ? element.strMeal : element.strDrink }
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
  list: PropTypes.shape.isRequired,
  status: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ recipeList: { status, list } }) => ({
  status,
  list,
});

export default connect(mapStateToProps)(RecipeList);
