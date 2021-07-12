import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRoute from './renderWithRoute';
import { requestMeal } from '../services/api';
import meals from './mock/FoodRecipes/data1';

jest.mock('../services/api');
const buttonSearch = 'search-top-btn';
const searchInput = 'search-input';
const radioIngredient = 'ingredient-search-radio';
const radioName = 'name-search-radio';
const radioLetter = 'first-letter-search-radio';
const exeSearch = 'exec-search-btn';

describe('Renders the Search', () => {
  requestMeal.mockResolvedValue(meals);
  it('should render the input type text ', () => {
    const { getByTestId, history } = renderWithRoute(<App />);

    act(() => history.push('/comidas'));

    const search = getByTestId(buttonSearch);
    expect(search).toBeInTheDocument();
  });

  it('should render to inputs type checkbox and button execute filter', () => {
    const { getByTestId, history } = renderWithRoute(<App />);
    act(() => history.push('/comidas'));

    const search = getByTestId(buttonSearch);

    act(() => userEvent.click(search));

    const inputSearch = getByTestId(searchInput);
    const checkboxIngredient = getByTestId(radioIngredient);
    const checkboxName = getByTestId(radioName);
    const checkboxOneLetter = getByTestId(radioLetter);
    const buttonFilter = getByTestId(exeSearch);

    expect(inputSearch).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
    expect(checkboxOneLetter).toBeInTheDocument();
    expect(checkboxName).toBeInTheDocument();
    expect(checkboxIngredient).toBeInTheDocument();
  });

  it('should renders with filter of name on cards', async () => {
    const { getByTestId, history, getByRole } = renderWithRoute(<App />);

    act(() => history.push('/comidas'));

    const search = getByTestId(buttonSearch);

    act(() => userEvent.click(search));

    const inputSearch = getByTestId(searchInput);
    const checkboxName = getByTestId(radioName);
    const buttonFilter = getByTestId(exeSearch);

    act(() => {
      userEvent.type(inputSearch, 'Corba');
      userEvent.click(checkboxName);
      userEvent.click(buttonFilter);
    });

    const h1 = getByRole('heading', {
      level: 1,
    });

    expect(h1).toHaveTextContent('Corba');
  });

  it('should renders with filter of firstLetter on cards', () => {
    const { getByTestId, history, getAllByRole } = renderWithRoute(<App />);

    act(() => history.push('/comidas'));

    const search = getByTestId(buttonSearch);

    act(() => userEvent.click(search));

    const inputSearch = getByTestId(searchInput);
    const checkboxOneLetter = getByTestId(radioLetter);
    const buttonFilter = getByTestId(exeSearch);

    act(() => {
      userEvent.type(inputSearch, 'C');
      userEvent.click(checkboxOneLetter);
      userEvent.click(buttonFilter);
    });

    const card = getAllByRole('div');
  });
});
