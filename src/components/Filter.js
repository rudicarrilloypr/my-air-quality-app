/* eslint-disable max-len */
/* eslint-disable no-alert */
// src/ components/Filter.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiSettings, FiArrowRightCircle } from 'react-icons/fi';
import { FaBell, FaSearch, FaUserFriends } from 'react-icons/fa';
import { fetchCoordinates, selectState } from '../actions';
import statesImages from '../data/mexico.json';
import airPurityIcon from '../assets/air-purity.PNG';
import bannerImage from '../assets/banner-aquality.PNG';
import '../styles/filter.css';

const Filter = ({ fetchCoordinates, selectState }) => {
  const [isSearchBarVisible, setSearchBarVisibility] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleStateChange = (state) => {
    selectState(state);
    fetchCoordinates(state);
  };

  const filteredStates = statesImages.filter(({ estado }) => estado.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div>
      <FaSearch
        className="icon"
        style={{
          fontSize: '1.5em', margin: '6px', marginTop: '8px', color: 'white',
        }}
        onClick={() => setSearchBarVisibility(!isSearchBarVisible)}
      />

      <div
        className={isSearchBarVisible ? 'search-bar-visible' : 'search-bar-hidden'}
        style={{
          display: 'flex', justifyContent: 'left', alignItems: 'center', margin: '10px', marginTop: '27.9px', position: 'absolute', zIndex: '100',
        }}
      >
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="what State are you looking for"
          style={{ padding: '5px', borderRadius: '5px' }}
        />
      </div>

      <div className="nav-bar" />
      <div className="icons-homepage">
        <FaBell className="icon" />
        <FiSettings className="icon" />
      </div>

      <div className="logo-container">
        <img src={airPurityIcon} alt="Air Purity Logo" className="app-logo" />
      </div>

      <img src={bannerImage} alt="Aquality Banner" className="banner-image" />

      <div className="divider-bar">
        <span className="divider-text">MÉXICO&apos;s STATES</span>
      </div>

      <div className="states-grid">
        {filteredStates.map(({
          id, estado, url, poblacion,
        }) => (
          <Link to={`/details/${estado}`} key={id} onClick={() => handleStateChange(estado)}>
            <div className="state-container">
              <img src={url} alt={estado} className="state-image" />
              <div className="state-title">{estado}</div>
              <div className="state-population">
                {poblacion}
                <FaUserFriends />
                {' '}
              </div>
              <div className="state-arrow">
                <FiArrowRightCircle color="white" size="20px" />
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
