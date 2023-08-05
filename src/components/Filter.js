// src/components/Filter.js
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { applyFilter } from '../actions';

const Filter = ({ applyFilter }) => {
  const handleFilterChange = (e) => {
    applyFilter(e.target.value);
  };

  return (
    <div>
      <input type="text" onChange={handleFilterChange} placeholder="Filter items..." />
    </div>
  );
};

Filter.propTypes = {
  applyFilter: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  applyFilter: (filter) => dispatch(applyFilter(filter)),
});

export default connect(null, mapDispatchToProps)(Filter);
