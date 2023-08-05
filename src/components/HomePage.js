/* eslint-disable react/prop-types */
// src/components/HomePage.js
import React from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';

const HomePage = ({ items, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error:
        {' '}
        {error}
      </div>
    );
  }

  return (
    <div>
      <Filter />
      <ul>
        {Array.isArray(items.list) ? items.list.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{item.dt}</li> // Using index as the key
        )) : null}
      </ul>

    </div>
  );
};

HomePage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

HomePage.defaultProps = {
  error: null,
};

export default HomePage;
