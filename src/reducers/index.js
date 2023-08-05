// src/reducers/index.js

import { combineReducers } from 'redux';
import itemsReducer from './items';

const rootReducer = combineReducers({
  items: itemsReducer,
  // otros reducers aquí
});

export default rootReducer;
