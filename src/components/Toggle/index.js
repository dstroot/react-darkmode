import React from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';

/**
  Toggle is a component ...
 */

const Toggle = ({ isOn, handleToggle, onColor }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
        style={{ background: isOn && onColor }}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

Toggle.propTypes = {
  /** Boolean to termine of the toggle is on or off */
  isOn: PropTypes.bool.isRequired,
  /** Function to perform an action due to toggle */
  handleToggle: PropTypes.func.isRequired,
  /** Color for switched on view */
  onColor: PropTypes.string,
};

export default Toggle;
