import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchCoordinates } from '../actions';

const Filter = ({ fetchCoordinates }) => {
  const statesOfMexico = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chihuahua', 'Chiapas', 'Coahuila', 'Colima', 'Durango',
    'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Estado de México', 'Ciudad de México', 'Michoacán', 'Morelos', 'Nayarit',
    'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas',
    'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas',
  ];

  const handleStateChange = (state) => {
    fetchCoordinates(state);
  };

  return (
    <div>
      {statesOfMexico.map((state) => (
        <Link to={`/details/${state}`} key={state} onClick={() => handleStateChange(state)}>
          <button type="button">
            {state}
          </button>
        </Link>
      ))}
    </div>
  );
};

Filter.propTypes = {
  fetchCoordinates: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCoordinates: (state) => dispatch(fetchCoordinates(state)),
});

export default connect(null, mapDispatchToProps)(Filter);
