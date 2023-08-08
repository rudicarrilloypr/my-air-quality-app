// src/actions/index.js

import axios from 'axios';

export const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE';

export const FETCH_COORDINATES_REQUEST = 'FETCH_COORDINATES_REQUEST';
export const FETCH_COORDINATES_SUCCESS = 'FETCH_COORDINATES_SUCCESS';
export const FETCH_COORDINATES_FAILURE = 'FETCH_COORDINATES_FAILURE';

export const APPLY_FILTER = 'APPLY_FILTER';
export const SELECT_STATE = 'SELECT_STATE';

const apiKey = '283367945399f60f0f14ebffe3d3a613';

export const selectState = (stateName) => ({
  type: SELECT_STATE,
  payload: stateName,
});

export const fetchItemsRequest = () => ({
  type: FETCH_ITEMS_REQUEST,
});

export const fetchItemsSuccess = (items) => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: items,
});

export const fetchItemsFailure = (error) => ({
  type: FETCH_ITEMS_FAILURE,
  payload: error,
});

export const applyFilter = (filter) => ({
  type: APPLY_FILTER,
  payload: filter,
});

export const fetchItems = (lat, lon) => (dispatch) => {
  if (lat == null || lon == null) {
    dispatch(fetchItemsFailure('Latitud o longitud no definidas.'));
    return;
  }
  dispatch(fetchItemsRequest());
  axios
    .get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then((response) => {
      dispatch(fetchItemsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchItemsFailure(error.message));
    });
};

export const fetchCoordinatesRequest = () => ({
  type: FETCH_COORDINATES_REQUEST,
});

export const fetchCoordinatesSuccess = (coordinates) => ({
  type: FETCH_COORDINATES_SUCCESS,
  payload: coordinates,
});

export const fetchCoordinatesFailure = (error) => ({
  type: FETCH_COORDINATES_FAILURE,
  payload: error,
});

export const fetchCoordinates = (locationName) => (dispatch) => {
  dispatch(fetchCoordinatesRequest());
  axios
    .get(`https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=5&appid=${apiKey}`)
    .then((response) => {
      const coordinates = {
        lat: response.data[0].lat,
        lon: response.data[0].lon,
      };
      dispatch(fetchCoordinatesSuccess(coordinates));
      // Aquí es donde se dispara la acción para obtener la calidad del aire
      // usando las coordenadas recién obtenidas
      dispatch(fetchItems(coordinates.lat, coordinates.lon));
    })
    .catch((error) => {
      dispatch(fetchCoordinatesFailure(error.message));
    });
};
