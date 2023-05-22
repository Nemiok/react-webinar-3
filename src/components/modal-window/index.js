import React from 'react'
import PropTypes from "prop-types";
import './styles.css'

function ModalWindow({ onCloseCart, children }) {
  return (
    <div className='Modal__Container_outer' onClick={onCloseCart}>
      <div className='Modal__Container_inner' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

ModalWindow.propTypes = {
  onCloseCart: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default ModalWindow