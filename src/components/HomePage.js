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
        {Array.isArray(items.list) ? items.list.map((item) => (
          <li key={item.dt}>{item.dt}</li> // Usamos sólo item.dt como clave
        )) : null}
      </ul>
    </div>
  );
};

HomePage.propTypes = {
  items: PropTypes.shape({ // Usamos shape para definir la estructura de items
    list: PropTypes.arrayOf(PropTypes.shape({
      dt: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
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
