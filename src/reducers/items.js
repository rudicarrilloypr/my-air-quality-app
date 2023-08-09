// src/reducers/items.js

import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  APPLY_FILTER,
  FETCH_COORDINATES_REQUEST,
  FETCH_COORDINATES_SUCCESS,
  FETCH_COORDINATES_FAILURE,
} from '../actions';

const initialState = {
  loading: false,
  allItems: [], // Aquí agregamos allItems
  items: [],
  error: null,
  filter: '',
  coordinates: null,
};

const filterItemsByName = (items, name) => {
  const lowercasedName = name.toLowerCase();
  return items.filter((item) => item.name.toLowerCase().includes(lowercasedName));
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return { ...state, loading: true };
    case FETCH_COORDINATES_REQUEST:
      return { ...state, loading: true };
    case FETCH_COORDINATES_SUCCESS:
      return { ...state, loading: false, coordinates: action.payload };
    case FETCH_COORDINATES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: Array.isArray(action.payload.list) ? action.payload.list : [],
        allItems: Array.isArray(action.payload.list) ? action.payload.list : [],
      };

      // Aquí se actualiza allItems
    case FETCH_ITEMS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case APPLY_FILTER:
      return {
        ...state,
        filter: action.payload,
        items: filterItemsByName(state.allItems, action.payload),
      };
    default:
      return state;
  }
};

export default itemsReducer;
