// __tests__/Filter.test.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import Filter from '../components/Filter';
import axiosMock from '../../__mocks__/axiosMock';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

describe('Filter component', () => {
  it('should render and handle search functionality', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: {} });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Filter />
        </BrowserRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    const searchBar = screen.getByPlaceholderText(/what State are you looking for/i);
    expect(searchBar).toBeVisible();

    fireEvent.change(searchBar, { target: { value: 'some state' } });
    expect(searchBar.value).toBe('some state');
  });
});
