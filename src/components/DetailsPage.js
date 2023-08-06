// src/components/DetailsPage.js

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoordinates } from '../actions';

const DetailsPage = ({
  fetchCoordinates, data, loading, error,
}) => {
  const { lat, lon } = useParams(); // Aquí usamos lat y lon en lugar de id

  useEffect(() => {
    fetchCoordinates(lat, lon);
  }, [lat, lon, fetchCoordinates]);

  // Ahora se puede renderizar la información de la API como se prefiera.
  // Aquí se muestra un ejemplo sencillo, pero se puede hacer mucho más con estos datos
  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <p>
        Error:
        {' '}
        {error}
      </p>
    );
  }
  return (
    <div>
      <h1>Calidad del aire</h1>
      {data.map((item) => (
        <div key={item.dt}>
          <h2>{new Date(item.dt * 1000).toLocaleDateString()}</h2>
          <p>
            AQI:
            {' '}
            {item.main.aqi}
          </p>
          <p>
            CO:
            {' '}
            {item.components.co}
            {' '}
            μg/m3
          </p>
        </div>
      ))}
    </div>
  );
};

DetailsPage.propTypes = {
  fetchCoordinates: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

DetailsPage.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => ({
  data: state.items.items,
  loading: state.items.loading,
  error: state.items.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoordinates: (lat, lon) => dispatch(fetchCoordinates(lat, lon)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
