// src/reducers/index.js

import { combineReducers } from 'redux';
import itemsReducer from './items';

const rootReducer = combineReducers({
  items: itemsReducer,
});

export default rootReducer;
