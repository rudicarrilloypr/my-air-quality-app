// src/reducers/items.js

import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  APPLY_FILTER,
} from '../actions';

const initialState = {
  loading: false,
  allItems: [], // Aquí agregamos allItems
  items: [],
  error: null,
  filter: '',
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return { ...state, loading: true };
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        // Asegúrate de manejar la respuesta correctamente aquí
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
        // Aquí utilizamos allItems en lugar de initialState.items
        // eslint-disable-next-line max-len
        items: state.allItems.filter((item) => item.name.toLowerCase().includes(action.payload.toLowerCase())),
      };
    default:
      return state;
  }
};

export default itemsReducer;
