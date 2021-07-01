import React from 'react';
import PropTypes from 'prop-types';

class MealCard extends React.Component {
  render() {
    const { meals } = this.props;
    if (meals) {
      console.log(meals);
      return (
        <main>
          {meals.meals.map((meal, index) => {
            if (index < 12) {
              return (
                <div key={ index } data-testid={ `${index}-recipe-card` }>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ meal.strMealThumb }
                    alt="thumb"
                  />
                  <p data-testid={ `${index}-card-name` }>
                    {meal.strMeal}
                  </p>
                </div>
              );
            }
            return null;
          })}
        </main>
      );
    }
    return (<h1>Loading...</h1>);
  }
}

MealCard.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default MealCard;
