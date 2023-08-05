// src/containers/HomePage.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchItems } from '../actions';
import HomePageComponent from '../components/HomePage';

const HomePage = ({
  fetchItems, items, loading, error,
}) => {
  const [manualLocation, setManualLocation] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleFetchItems = () => {
    if (latitude && longitude) {
      fetchItems(parseFloat(latitude), parseFloat(longitude));
    }
  };

  const handleGeoError = () => {
    setManualLocation(true);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => fetchItems(position.coords.latitude, position.coords.longitude),
        handleGeoError,
      );
    } else {
      setManualLocation(true);
    }
  }, [fetchItems]);

  if (manualLocation) {
    return (
      <div>
        <label htmlFor="latitude">
          Latitud:
          <input
            id="latitude"
            type="number"
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>
        <label htmlFor="longitude">
          Longitud:
          <input
            id="longitude"
            type="number"
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleFetchItems}>
          Obtener datos
        </button>
        <HomePageComponent items={items} loading={loading} error={error} />
      </div>
    );
  }

  return <HomePageComponent items={items} loading={loading} error={error} />;
};

// Define las validaciones de las props
HomePage.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  // Define la forma exacta del objeto esperado
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    // otros campos según sea necesario
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

// Define los valores predeterminados para las props no requeridas
HomePage.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => ({
  items: state.items.items,
  loading: state.items.loading,
  error: state.items.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchItems: (lat, lon) => dispatch(fetchItems(lat, lon)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
