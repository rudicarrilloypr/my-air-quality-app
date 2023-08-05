// src/actions/index.js

import axios from 'axios';

export const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE';
export const APPLY_FILTER = 'APPLY_FILTER';

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
    .get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=283367945399f60f0f14ebffe3d3a613`)
    .then((response) => {
      // eslint-disable-next-line no-console
      console.log(response.data);
      dispatch(fetchItemsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchItemsFailure(error.message));
    });
};
