import React, { useCallback, useEffect, useState } from 'react'
import PageLayout from '../../components/page-layout'
import Head from '../../components/head'
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import BasketTool from '../../components/basket-tool';
import { useParams } from 'react-router-dom';
import ProductContent from '../../components/product-content';
import Spinner from '../../components/spinner';
import './styles.css'

function Product() {

  const [loaded, setLoaded] = useState(false)

  const store = useStore();
  const { id } = useParams()

  const product = useSelector(state => state.product.product);

  useEffect(() => {
    console.log(product)
    if (Object.keys(product).length > 0 && product._id === id) setLoaded(true)
  }, [product])

  useEffect(() => {
    // загружаем еще и список товаров, чтобы при обновлении страницы одного товара кнопка добавления в корзину работала
    store.actions.catalog.load();
    store.actions.product.load(id);
    console.log(id)
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      {loaded ? <>
        <Head title={product.title} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum} />
        <ProductContent onAdd={callbacks.addToBasket} product={product} />
      </> :
        <div className='loader-container'>
          <Spinner />
        </div>}
    </PageLayout>
  )
}

export default React.memo(Product)