import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FiSettings, FiChevronLeft } from 'react-icons/fi';
import { FaBell } from 'react-icons/fa';
import { fetchCoordinates } from '../actions';
import loadingImage from '../assets/banner-apurity-readme.PNG';
import airPurityIcon from '../assets/air-purity.PNG';
import statesImages from '../data/mexico.json';

const determineAirQuality = (aqi) => {
  if (aqi <= 50) {
    return 'clean';
  } if (aqi <= 100) {
    return 'intermediate';
  }
  return 'bad';
};

const getWikipediaLink = (key) => {
  switch (key) {
    case 'AQI': return 'https://en.wikipedia.org/wiki/Air_quality_index';
    case 'CO': return 'https://en.wikipedia.org/wiki/Carbon_monoxide';
    case 'NO': return 'https://en.wikipedia.org/wiki/Nitric_oxide';
    case 'NO2': return 'https://en.wikipedia.org/wiki/Nitrogen_dioxide';
    case 'O3': return 'https://en.wikipedia.org/wiki/Ozone';
    case 'SO2': return 'https://en.wikipedia.org/wiki/Sulfur_dioxide';
    case 'PM2.5': return 'https://en.wikipedia.org/wiki/Particulates#PM2.5';
    case 'PM10': return 'https://en.wikipedia.org/wiki/Particulates#PM10';
    case 'NH3': return 'https://en.wikipedia.org/wiki/Ammonia';
    default: return '';
  }
};

const DetailsPage = ({
  fetchCoordinates, data, loading, error,
}) => {
  const { stateName } = useParams();

  const selectedState = statesImages.find((state) => state.estado === stateName);

  useEffect(() => {
    fetchCoordinates(stateName);
  }, [stateName, fetchCoordinates]);

  if (loading) return <div><img className="loading-image" src={loadingImage} alt="Loading..." /></div>;

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
      <div className="logo-container">
        <img src={airPurityIcon} alt="Air Purity Logo" className="app-logo" />
      </div>

      <div className="icon-container">
        <FaBell className="icon" />
        <FiSettings className="icon" />
      </div>
      <Link to="/">
        <FiChevronLeft style={{ fontSize: '1.5em', margin: '10px', color: 'white' }} />
      </Link>
      {selectedState && (
      <div className="state-details-image-container">
        <img src={selectedState.url} alt={selectedState.estado} className="state-details-image" />
        <div className="state-details-overlay">
          <h1 className="state-details-title">{stateName}</h1>
          {data.length > 0 && (
            <h2 className="state-details-subtitle">
              {new Date(data[0].dt * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </h2>
          )}
        </div>
      </div>
      )}
      <div className="header-container">
        <h2 className="quality-header">
          AIR QUALITY
        </h2>
        {data.length > 0 && (
          <span className={`quality-indicator ${determineAirQuality(data[0].main.aqi)}`} title={determineAirQuality(data[0].main.aqi)} />
        )}
      </div>
      {data.map((item) => (
        <table key={item.dt} className="table air-quality-list">
          <tbody>
            <tr>
              <th><a href={getWikipediaLink('AQI')} target="_blank" rel="noopener noreferrer">AQI</a></th>
              <td>{item.main.aqi}</td>
            </tr>
            <tr>
              <th><a href={getWikipediaLink('CO')} target="_blank" rel="noopener noreferrer">CO</a></th>
              <td>
                {item.components.co}
                {' '}
                μg/m3
              </td>
            </tr>
            <tr>
              <th><a href={getWikipediaLink('NO')} target="_blank" rel="noopener noreferrer">NO</a></th>
              <td>
                {item.components.no}
                {' '}
                μg/m3
              </td>
            </tr>
            <tr>
              <th><a href={getWikipediaLink('NO2')} target="_blank" rel="noopener noreferrer">NO2</a></th>
              <td>
                {item.components.no2}
                {' '}
                μg/m3
              </td>
            </tr>
            <tr>
              <th><a href={getWikipediaLink('O3')} target="_blank" rel="noopener noreferrer">O3</a></th>
              <td>
                {item.components.o3}
                {' '}
                μg/m3
              </td>
            </tr>
            <tr>
              <th><a href={getWikipediaLink('SO2')} target="_blank" rel="noopener noreferrer">SO2</a></th>
              <td>
                {item.components.so2}
                {' '}
                μg/m3
              </td>
            </tr>
            <tr>
              <th><a href={getWikipediaLink('PM2.5')} target="_blank" rel="noopener noreferrer">PM2.5</a></th>
              <td>
                {item.components.pm2_5}
                {' '}
                μg/m3
              </td>
            </tr>
            <tr>
              <th><a href={getWikipediaLink('PM10')} target="_blank" rel="noopener noreferrer">PM10</a></th>
              <td>
                {item.components.pm10}
                {' '}
                μg/m3
              </td>
            </tr>
            <tr>
              <th><a href={getWikipediaLink('NH3')} target="_blank" rel="noopener noreferrer">NH3</a></th>
              <td>
                {item.components.nh3}
                {' '}
                μg/m3
              </td>
            </tr>
          </tbody>
        </table>
      ))}

    </div>
  );
};

DetailsPage.propTypes = {
  fetchCoordinates: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    dt: PropTypes.number.isRequired,
    main: PropTypes.shape({
      aqi: PropTypes.number.isRequired,
    }).isRequired,
  })).isRequired,
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
  fetchCoordinates: (stateName) => dispatch(fetchCoordinates(stateName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
