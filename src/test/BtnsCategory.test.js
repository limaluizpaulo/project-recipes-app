import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const tempo = 5000;
const funciton = () => {

};

describe('entrar em recipes e cada button existir', () => {
  it('Beef-category-filter, beef', (done) => {
    done();
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');
    const beef = getByTestId('Beef-category-filter');
    fireEvent.click(beef);
  });
});
