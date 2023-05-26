import React from 'react'
import processDate from '../../utils/functions/processDate'
import { numberFormat } from '../../utils'
import './style.css'

function ProductContent(props) {

  const product = props.product
  const { DYear } = processDate(product.dateCreate)
  const callbacks = {
    onAdd: (e) => props.onAdd(product._id)
  }


  return (
    <div className='Product__content-wrapper'>
      <div className='Product__description'>{product.description}</div>

      <div className='Product__country'>
        <span>Страна выпуска: </span>
        <span className='Product__field-value'>{`${product.madeIn.title} (${product.madeIn.code})`}</span>
      </div>

      <div className='Product__category'>
        <span>Категория: </span>
        <span className='Product__field-value'>{product.category.title}</span>
      </div>

      <div className='Product__date'>
        <span>Год выпуска: </span>
        <span className='Product__field-value'>{DYear}</span>
      </div>

      <div className='Product__price'>
        <span>Цена: </span>
        <span>{numberFormat(product.price)}</span>
      </div>

      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}

export default ProductContent