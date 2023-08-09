// src/containers/HomePage.js
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchItems } from '../actions';
import HomePageComponent from '../components/HomePage';

const HomePage = ({
  fetchItems, items, loading, error, coordinates,
}) => {
  useEffect(() => {
    if (coordinates) {
      fetchItems(coordinates.lat, coordinates.lon);
    }
  }, [coordinates, fetchItems]);

  return <HomePageComponent items={items} loading={loading} error={error} />;
};

HomePage.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  coordinates: PropTypes.shape({ lat: PropTypes.number, lon: PropTypes.number }),
};

HomePage.defaultProps = {
  error: null,
  coordinates: null,
};

const mapStateToProps = (state) => ({
  items: state.items.items,
  loading: state.items.loading,
  error: state.items.error,
  coordinates: state.items.coordinates,
});

const mapDispatchToProps = (dispatch) => ({
  fetchItems: (lat, lon) => dispatch(fetchItems(lat, lon)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
