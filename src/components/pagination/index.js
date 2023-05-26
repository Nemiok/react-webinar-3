import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import './styles.css'

function Pagination({ getFirstPage, getLastPage, getNextPage, getPreviousPage, getThirdPage, currentPage, pages }) {



  const callbacks = {
    handlePaginationClick: (e) => {
      const paginationEl = document.querySelector('.Pagination')

      paginationEl.querySelectorAll('button').forEach(btn => btn.classList.remove('Pagination__button_active'))


      if (!e.target.className.includes('Pagination__button') || currentPage === 1) return

      else if (e.target.id === 'first-page-btn') {
        document.getElementById('first-page-btn').classList.add('Pagination__button_active')
      }
      document.querySelector('.Pagination__button_current').classList.add('Pagination__button_active')

    }

  }

  return (
    <div onClick={callbacks.handlePaginationClick} className='Pagination'>
      <button className='Pagination__button Pagination__button_active' id='first-page-btn' onClick={getFirstPage}>1</button>
      {currentPage >= 4 && <span>...</span>}
      {currentPage - 1 !== 1 && currentPage - 1 !== 0 && <button className='Pagination__button' id='previous-page-btn' onClick={getPreviousPage}>{currentPage - 1}</button>}
      {currentPage !== 1 && <button className='Pagination__button Pagination__button_current Pagination__button_active'>{currentPage}</button>}
      {currentPage !== pages && <button className='Pagination__button' onClick={getNextPage}>{1 + currentPage}</button>}
      {currentPage === 1 && <button className='Pagination__button' onClick={getThirdPage}>3</button>}
      {currentPage + 1 !== pages && currentPage + 1 !== pages + 1 && <span>...</span>}
      {currentPage + 1 !== pages && currentPage + 1 !== pages + 1 && <button className='Pagination__button' onClick={() => getLastPage(pages)}>{pages}</button>}
    </div>
  )
}

Pagination.propTypes = {
  getFirstPage: PropTypes.func.isRequired,
  getLastPage: PropTypes.func.isRequired,
  getNextPage: PropTypes.func.isRequired,
  getPreviousPage: PropTypes.func.isRequired,
  getThirdPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired
}

export default React.memo(Pagination)