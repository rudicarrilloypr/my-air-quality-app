/* eslint-disable max-len */
// src/tests/actions.test.js

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios'; // mantenemos esto porque MockAdapter lo necesita
import axiosMock from '../../__mocks__/axiosMock';
import {
  fetchItems, fetchCoordinates, FETCH_ITEMS_REQUEST, FETCH_ITEMS_SUCCESS, FETCH_COORDINATES_REQUEST,
} from '../actions';

const mock = new MockAdapter(axios); // utilizamos axios real aquí porque MockAdapter lo necesita
const middlewares = [thunk.withExtraArgument(axiosMock)]; // aquí pasamos el mock como un argumento extra para thunk
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    mock.reset();
  });

  it('fetchItems should dispatch FETCH_ITEMS_REQUEST and FETCH_ITEMS_SUCCESS', () => {
    const mockData = { list: [] };
    mock.onGet(/https:\/\/api\.openweathermap\.org/).reply(200, mockData);

    const expectedActions = [
      { type: FETCH_ITEMS_REQUEST },
      { type: FETCH_ITEMS_SUCCESS, payload: mockData },
    ];
    const store = mockStore({});

    return store.dispatch(fetchItems(10, 20)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetchCoordinates should dispatch FETCH_COORDINATES_REQUEST and fetchCoordinates', () => {
    const mockData = [{ lat: 10, lon: 20 }];
    mock.onGet(/https:\/\/api\.openweathermap\.org/).reply(200, mockData);

    const expectedActions = [
      { type: FETCH_COORDINATES_REQUEST },
    ];
    const store = mockStore({});

    return store.dispatch(fetchCoordinates('locationName')).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
    });
  });
});
