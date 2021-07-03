import React from 'react';
import { Container } from 'react-bootstrap';

export default function Ingredients({ ingredients }) {
  return (
    <Container>
      <h4>Ingredientes</h4>
      <table width="100%">
        <tbody>
        {
          ingredients && ingredients.map(({ingredient, measure}, index) => {
            return <tr key={index} data-testid={`${index}-ingredient-name-and-measure` }>
              <td>{`¤`}</td>
              <td>{ }</td>
              <td>{ ingredient }</td>
              <td align="right">{ measure }</td>
            </tr>
          })
        }
        </tbody>
      </table>
      <br/>
    </Container>
  );
}
