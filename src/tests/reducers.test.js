// src/tests/reducers.test.js

import itemsReducer from '../reducers/items';
import {
  FETCH_ITEMS_REQUEST, FETCH_ITEMS_SUCCESS, APPLY_FILTER,
} from '../actions';

describe('itemsReducer', () => {
  it('should handle FETCH_ITEMS_REQUEST', () => {
    expect(itemsReducer({}, { type: FETCH_ITEMS_REQUEST })).toEqual({
      loading: true,
    });
  });

  it('should handle FETCH_ITEMS_SUCCESS', () => {
    const mockData = { list: [{ id: 1 }] };
    expect(itemsReducer({}, { type: FETCH_ITEMS_SUCCESS, payload: mockData })).toEqual({
      loading: false,
      items: mockData.list,
      allItems: mockData.list,
    });
  });

  it('should handle APPLY_FILTER', () => {
    const initialState = {
      allItems: [{ name: 'clean' }, { name: 'bad' }],
      filter: '',
      items: [],
    };
    expect(itemsReducer(initialState, { type: APPLY_FILTER, payload: 'clean' })).toEqual({
      ...initialState,
      filter: 'clean',
      items: [{ name: 'clean' }],
    });
  });
});
