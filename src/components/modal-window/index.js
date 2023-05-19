import React from 'react'
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

export default ModalWindow