import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { VscCircleOutline } from 'react-icons/vsc';
import Table from 'react-bootstrap/Table';
import identification from '../helper/dictionaryApi';

class Ingredients extends Component {
  checkIngredient() {
    //  const { count, recipesLength, func } = this.props;
    const { func } = this.props;

    return (
      <input onClick={ func } type="checkbox" />
    );
  }

  render() {
    const { data, isStart } = this.props;
    console.log(data);
    const dictionary = identification(data);
    return (
      <section>
        <Table responsive="sm">
          <tbody>
            {
              dictionary.Ingredients.map((ingredient, index) => (
                (data[ingredient[0]] !== null && data[ingredient[0]] !== '') ? (
                  <tr
                    key={ index }
                    data-testid={
                      isStart
                        ? `${index}-ingredient-step`
                        : `${index}-ingredient-name-and-measure`
                    }
                  >
                    <td>{isStart ? this.checkIngredient() : <VscCircleOutline />}</td>
                    <td>{data[ingredient[0]]}</td>
                    <td>{data[ingredient[1]]}</td>
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
  func: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Ingredients);
