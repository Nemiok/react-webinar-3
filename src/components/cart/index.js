import React from 'react'
import Head from '../head'
import Controls from '../controls'
import List from '../list'
import formatNumber from '../../utils/functions/format-money'
import PropTypes from 'prop-types';
import './styles.css'

function Cart({ onCloseCart, onAddItemToCart, list, onDeleteItemFromCart, typeOfList }) {
  const totalSum = list.reduce((acc, curr) => acc += curr.productCountInCart * curr.price, 0)

  if (list.length === 0) {
    return (<div className='Cart__Wrapper'>
      <Head title='Корзина'>
        <Controls buttonName='Закрыть' controlButtonHandler={onCloseCart} />
      </Head>
      <div className='Cart__Content_WhenEmpty'>Корзина пуста. Пожалуйста, вернитесь в меню выбора товара.</div>
    </div>)
  }

  return (
    <div className='Cart__Wrapper'>
      <Head title='Корзина'>
        <Controls buttonName='Закрыть' controlButtonHandler={onCloseCart} />
      </Head>
      <List typeOfList={typeOfList} onAddItemToCart={onAddItemToCart} onDeleteItemFromCart={onDeleteItemFromCart} list={list} ></List>
      <div className='Cart__Sum'>
        <span>Итого:</span>
        <span>{formatNumber(totalSum)} ₽</span>
      </div>
    </div>
  )
}

Cart.propTypes = {
  onCloseCart: PropTypes.func.isRequired,
  onAddItemToCart: PropTypes.func.isRequired,
  onDeleteItemFromCart: PropTypes.func.isRequired,
  typeOfList: PropTypes.string
}

export default React.memo(Cart)