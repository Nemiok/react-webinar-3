import React from 'react'
import Controls from '../controls'
import PropTypes from 'prop-types';
import './styles.css'
import { plural } from '../../utils';
import formatNumber from '../../utils/functions/format-money';

function CartCounter({ totalSum, onOpenCart, productCount }) {
  return (
    <div className='CartCounter'>
      <div className='CartCounter__Description'>В корзине: <span>{productCount > 0 ? `${productCount} ${plural(productCount, { one: 'товар', few: 'товара', many: 'товаров' })} / ${formatNumber(totalSum)} ₽` : 'пусто'}</span></div>
      <Controls buttonName='Перейти' controlButtonHandler={onOpenCart} />
    </div>
  )
}

CartCounter.propTypes = {
  onOpenCart: PropTypes.func.isRequired,
  totalSum: PropTypes.number.isRequired,
  productCount: PropTypes.number.isRequired
}

export default CartCounter