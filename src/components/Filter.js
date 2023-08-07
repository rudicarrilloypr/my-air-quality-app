// src/components/Filter.js
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiSettings, FiChevronRight } from 'react-icons/fi'; // <-- Agrega los iconos que necesitas aquí
import { FaBell, FaCloud } from 'react-icons/fa';
import { fetchCoordinates, selectState } from '../actions';
import statesImages from '../data/mexico.json';
import airPurityIcon from '../assets/air-purity.PNG';
import '../styles/filter.css';

const Filter = ({ fetchCoordinates, selectState }) => {
  const handleStateChange = (state) => {
    selectState(state);
    fetchCoordinates(state);
  };

  return (
    <div>
      <FaCloud
        className="icon"
        style={{
          fontSize: '1.5em', margin: '6px', marginTop: '8px', color: 'white',
        }}
      />
      <div className="nav-bar" />
      <div className="icons-homepage">
        <FaBell className="icon" />
        <FiSettings className="icon" />
      </div>
      <div className="logo-container">
        <img src={airPurityIcon} alt="Air Purity Logo" className="app-logo" />
      </div>
      <div className="states-grid">
        {statesImages.map(({ id, estado, url }) => (
          <Link to={`/details/${estado}`} key={id} onClick={() => handleStateChange(estado)}>
            <div className="state-container">
              <img src={url} alt={estado} className="state-image" />
              <div className="state-title">{estado}</div>
              <div className="state-arrow">
                <FiChevronRight color="white" size="20px" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

Filter.propTypes = {
  fetchCoordinates: PropTypes.func.isRequired,
  selectState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCoordinates: (state) => dispatch(fetchCoordinates(state)),
  selectState: (state) => dispatch(selectState(state)),
});

export default connect(null, mapDispatchToProps)(Filter);
