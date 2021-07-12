import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { VscCircleOutline } from 'react-icons/vsc';
import Table from 'react-bootstrap/Table';
import identification from '../helper/dictionaryApi';

class Ingredients extends Component {
  checkIngredient(param, index) {
    const { func, state } = this.props;
    const ourState = state || [];
    const element = document.getElementById(`input-${index}`);
    if (ourState.includes(param)) {
      return (
        // <label htmlFor={ `checkbox-${index}` }>
        <input
          checked
          id={ `checkbox-${index}` }
          onChange={ () => func(param, element, 'checked') }
          type="checkbox"
        />
        // </label>
      );
    }
    return (
      <label htmlFor={ `checkbox-${index}` }>
        <input
          onChange={ () => func(param, element, '') }
          type="checkbox"
          id={ `checkbox-${index}` }

        />
      </label>);
  }

  render() {
    const { data, isStart } = this.props;
    const dictionary = identification(data);
    return (
      <section>
        <Table responsive="sm">
          <tbody>
            {
              dictionary.Ingredients.map((ingredient, index) => (
                (data[ingredient[0]] !== null && data[ingredient[0]] !== '') ? (
                  <tr
                    id={ `input-${index}` }
                    key={ index }
                    data-testid={
                      isStart === true
                        ? `${index}-ingredient-step`
                        : `${index}-ingredient-name-and-measure`
                    }
                  >
                    {/* <div width="500px" id={ `input-${index}` }> */}
                    <td>
                      {isStart === true
                        ? this.checkIngredient(data[ingredient[0]], index)
                        : <VscCircleOutline />}

                    </td>
                    <td id={ `ingredient-${index}` } width="50%">
                      {data[ingredient[0]]}
                    </td>
                    <td>{data[ingredient[1]]}</td>
                    {/* </div> */}
                  </tr>
                ) : null
              ))
            }
          </tbody>
        </Table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  isStart: state.recipeDetails.isStart,
});

Ingredients.propTypes = {
  data: PropTypes.shape.isRequired,
  isStart: PropTypes.bool.isRequired,

  state: PropTypes.shape.isRequired,

  func: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Ingredients);
