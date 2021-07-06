import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { VscCircleOutline } from 'react-icons/vsc';
import Table from 'react-bootstrap/Table';
import dictionaryFood from '../help/dictionaryApi';

class Ingredients extends Component {
  checkIngredient() {
    return (
      <input />
    );
  }

  render() {
    const { data, isStart } = this.props;
    return (
      <section>
        <Table responsive="sm">
          <tbody>
            {
              dictionaryFood.Ingredients.map((ingredient, index) => (
                data[ingredient[0]] !== '' && (
                  <tr key={ index }>
                    <td>{isStart ? this.checkIngredient() : <VscCircleOutline />}</td>
                    <td>{data[ingredient[0]]}</td>
                    <td>{data[ingredient[1]]}</td>
                  </tr>
                )
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
};

export default connect(mapStateToProps)(Ingredients);
