// src/components/Filter.js
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchCoordinates, selectState } from '../actions';
import statesImages from '../data/mexico.json';
import '../styles/filter.css';

const Filter = ({ fetchCoordinates, selectState }) => {
  const handleStateChange = (state) => {
    selectState(state);
    fetchCoordinates(state);
  };

  return (
    <div className="states-grid">
      {statesImages.map(({ id, estado, url }) => (
        <Link to={`/details/${estado}`} key={id} onClick={() => handleStateChange(estado)}>
          <div className="state-container">
            <img src={url} alt={estado} className="state-image" />
            <div className="state-title">{estado}</div>
          </div>
        </Link>
      ))}
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
