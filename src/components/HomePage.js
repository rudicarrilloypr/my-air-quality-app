/* eslint-disable react/prop-types */
// src/components/HomePage.js
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Filter from './Filter';
import { fetchCoordinates, selectState } from '../actions';

const HomePage = ({
  items, loading, error, fetchCoordinates, selectState,
}) => {
  if (loading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error:
        {' '}
        {error}
      </div>
    );
  }

  return (
    <div>
      <Filter fetchCoordinates={fetchCoordinates} selectState={selectState} />
      <ul>
        {Array.isArray(items.list) ? items.list.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={`${item.dt}-${index}`}>{item.dt}</li> // Usar una combinación de item.dt y el índice como key
        )) : null}
      </ul>
    </div>
  );
};

HomePage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  fetchCoordinates: PropTypes.func.isRequired,
  selectState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCoordinates: (state) => dispatch(fetchCoordinates(state)),
  selectState: (state) => dispatch(selectState(state)),
});

HomePage.defaultProps = {
  error: null,
};

export default connect(null, mapDispatchToProps)(HomePage);
