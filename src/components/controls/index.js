import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({ controlButtonHandler, buttonName, children }) {
  return (
    <div className='Controls'>
      {children}
      <button onClick={controlButtonHandler}>{buttonName}</button>
    </div>
  )
}

Controls.propTypes = {
  buttonName: PropTypes.string.isRequired,
  controlButtonHandler: PropTypes.func.isRequired
};

export default React.memo(Controls);
