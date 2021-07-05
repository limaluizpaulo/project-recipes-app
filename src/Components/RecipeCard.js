import React from 'react';
import PropTypes from 'prop-types';

class RecipeCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      typeMemory: props.recipetype,
    };
  }

  render() {
    const { recipes, recipetype } = this.props;
    const numeroMaximoDeReceitas = 12;
    const { typeMemory } = this.state;

    const seletorComidaOuBebidas = {
      comidas: {
        thumb: 'strMealThumb',
        name: 'strMeal',
      },
      bebidas: {
        thumb: 'strDrinkThumb',
        name: 'strDrink',
      },
    };

    return (
      <main>
        {Object.values(recipes[typeMemory]).map((item, index) => {
          if (index < numeroMaximoDeReceitas) {
            return (
              <div key={ index } data-testid={ `${index}-recipe-card` }>
                <img
                  width="40px"
                  data-testid={ `${index}-card-img` }
                  src={ item[seletorComidaOuBebidas[recipetype].thumb] }
                  alt="thumb"
                />
                <p data-testid={ `${index}-card-name` }>
                  {item[seletorComidaOuBebidas[recipetype].name]}
                  {/* {item[seletorComidaOuBebidas].name} */}
                </p>
              </div>
            );
          }
          return null;
        })}
      </main>
    );
  }
}

RecipeCard.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  recipetype: PropTypes.string.isRequired,
};

export default RecipeCard;
