// src/components/DetailsPage.js

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa';
import { fetchCoordinates } from '../actions';

const DetailsPage = ({
  fetchCoordinates, data, loading, error,
}) => {
  const { stateName } = useParams();

  useEffect(() => {
    fetchCoordinates(stateName);
  }, [stateName, fetchCoordinates]);

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
      <Link to="/">
        <FaArrowLeft style={{ fontSize: '1.5em', margin: '10px' }} />
      </Link>
      <h1> Air Quality</h1>
      {data.map((item) => (
        <div key={item.dt}>
          <h2>{new Date(item.dt * 1000).toLocaleDateString()}</h2>
          <p>
            AQI:
            {' '}
            {item.main.aqi}
          </p>
          <p>
            CO (Monóxido de Carbono):
            {' '}
            {item.components.co}
            {' '}
            μg/m3
          </p>
          <p>
            NO (Monóxido de Nitrógeno):
            {' '}
            {item.components.no}
            {' '}
            μg/m3
          </p>
          <p>
            NO2 (Dióxido de Nitrógeno):
            {' '}
            {item.components.no2}
            {' '}
            μg/m3
          </p>
          <p>
            O3 (Ozono):
            {' '}
            {item.components.o3}
            {' '}
            μg/m3
          </p>
          <p>
            SO2 (Dióxido de Azufre):
            {' '}
            {item.components.so2}
            {' '}
            μg/m3
          </p>
          <p>
            PM2.5:
            {' '}
            {item.components.pm2_5}
            {' '}
            μg/m3
          </p>
          <p>
            PM10:
            {' '}
            {item.components.pm10}
            {' '}
            μg/m3
          </p>
          <p>
            NH3 (Amoniaco):
            {' '}
            {item.components.nh3}
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
