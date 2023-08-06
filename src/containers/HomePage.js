import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchItems, fetchCoordinates } from '../actions';
import HomePageComponent from '../components/HomePage';

const HomePage = ({
  fetchItems, fetchCoordinates, items, loading, error, coordinates,
}) => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => fetchCoordinates(position.coords.latitude, position.coords.longitude),
        // Removemos la función setManualLocation ya que ya no la usaremos
      );
    }
  }, [fetchCoordinates]);

  useEffect(() => {
    if (coordinates) {
      fetchItems(coordinates.lat, coordinates.lon);
    }
  }, [coordinates, fetchItems]);

  return <HomePageComponent items={items} loading={loading} error={error} />;
};

HomePage.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  fetchCoordinates: PropTypes.func.isRequired,
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
  fetchCoordinates: (lat, lon) => dispatch(fetchCoordinates(lat, lon)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
