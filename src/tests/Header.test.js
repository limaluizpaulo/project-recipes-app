import { render } from '@testing-library/react';
import React from 'react';
import Header from '../components/Header';

describe('Checks Header', () => {
  it('Checks if the paga has two buttons', () => {
    render(<Header />);
  });
});
