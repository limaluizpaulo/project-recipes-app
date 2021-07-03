import React from 'react';
import { Container, Button, Image } from 'react-bootstrap';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

export default function Title({ title, subtitle }) {
  return (
    <Container>
      <table>
        <tbody>
          <tr>
            <td width="360" data-testid="recipe-title"><strong>{ title }</strong></td>
            <td data-testid="share-btn" rowSpan="2">
              <Button variant="primary">
                <Image src={ shareIcon } />
              </Button>
            </td>
            <td data-testid="favorite-btn" rowSpan="2">
              <Button variant="success">
                <Image src={ whiteHeartIcon } />
              </Button>
            </td>
          </tr>
          <tr>
            <td data-testid="recipe-category"><i>{ subtitle }</i></td>
          </tr>
        </tbody>
      </table>
      <br/>
    </Container>
  );
}
