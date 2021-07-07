import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import ShareButton from './Details/ShareButton';
import FavoriteButton from './Details/FavoriteButton';

// *SOURCE* Semantic Value = https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-interactions.md

export default function FavoritesCard({ favorite, index, updateCards, setUpdateCards }) {
  const history = useHistory();

  const generateMealOrDrinkTitle = () => {
    switch (favorite.type) {
    case 'comida':
      return (
        <h5>
          <span data-testid={ `${index}-horizontal-top-text` }>
            { `${favorite.area} - ${favorite.category}` }
          </span>
        </h5>
      );
    case 'bebida':
      return (
        <h5 data-testid={ `${index}-horizontal-top-text` }>
          {`${favorite.alcoholicOrNot}`}
        </h5>
      );
    default:
      break;
    }
  };

  const handleOpenRecipe = () => {
    const route = `${favorite.type}s/${favorite.id}`;
    history.push(route);
  };

  const generateFavoriteTable = () => (
    <table>
      <tbody>
        <tr>
          <td rowSpan="4">
            <img
              role="presentation"
              onClick={ handleOpenRecipe }
              data-testid={ `${index}-horizontal-image` }
              alt={ favorite.name }
              width="140"
              src={ favorite.image }
            />
          </td>
        </tr>
        <tr>
          <td>{ generateMealOrDrinkTitle() }</td>
        </tr>
        <tr>
          <td>
            <h5
              role="presentation"
              onClick={ handleOpenRecipe }
              data-testid={ `${index}-horizontal-name` }
            >
              { favorite.name }
            </h5>
          </td>
        </tr>
        <tr>
          <td>
            <ShareButton
              index={ index }
              id={ favorite.id }
              type={ favorite.type }
            />
            <FavoriteButton
              updateCards={ updateCards }
              setUpdateCards={ setUpdateCards }
              dataTestId={ `${index}-horizontal-favorite-btn` }
              recipe={ favorite }
            />
          </td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <Card>
      { generateFavoriteTable() }
    </Card>
  );
}

FavoritesCard.propTypes = {
  favorite: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    area: PropTypes.string,
    type: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }),
  updateCards: PropTypes.bool,
  setUpdateCards: PropTypes.func,
  index: PropTypes.number,
}.isRequired;
