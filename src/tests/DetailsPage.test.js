// src/tests/DetailsPage.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import store from '../store';
import DetailsPage from '../components/DetailsPage';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

describe('DetailsPage component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', async () => {
    const stateName = 'someStateName';

    axios.get.mockResolvedValueOnce({ data: [{ lat: 0, lon: 0 }] });
    axios.get.mockResolvedValueOnce({ data: {} });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/details/${stateName}`]}>
          <Routes>
            <Route path="/details/:stateName" element={<DetailsPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByRole('img', { name: /Air Purity Logo/i })).toBeInTheDocument();
    });
  });
});
