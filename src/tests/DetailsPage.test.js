/* eslint-disable max-len */
// src/tests/DetailsPage.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios'; // <-- Importando directamente axios
import store from '../store';
import DetailsPage from '../components/DetailsPage';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

describe('DetailsPage component', () => {
  // Limpiando los mocks después de cada prueba
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', async () => {
    const stateName = 'someStateName';

    // Mocking the return values for the axios calls
    axios.get.mockResolvedValueOnce({ data: [{ lat: 0, lon: 0 }] }); // <-- Usando axios directamente
    axios.get.mockResolvedValueOnce({ data: {} }); // <-- Usando axios directamente

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/details/${stateName}`]}>
          <Routes>
            <Route path="/details/:stateName" element={<DetailsPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    // Wait for the component to finish all async operations and re-render.
    await waitFor(() => {
      expect(screen.getByRole('img', { name: /Air Purity Logo/i })).toBeInTheDocument();
    });
  });
});
