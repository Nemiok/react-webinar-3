import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ModalWindow from './components/modal-window';
import Cart from './components/cart';
import STORE_OF_NAMES from './utils/store-of-names';
import './app.css'
import { plural } from './utils';
import formatNumber from './utils/functions/formatMoney';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const [isCardOpen, setCardOpen] = useState(false);

  const initialListOfItems = store.getState().list;
  const cartItems = store.getState().cart;

  const priceOfSelectedProducts = cartItems.reduce((acc, curr) => acc += curr.productCountInCart * curr.price, 0)

  const callbacks = {
    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),

    onDeleteItemFromCart: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, [store]),

    onOpenCart: () => {
      if (isCardOpen) return
      setCardOpen(true)
    },

    onCloseCart: () => {
      if (!isCardOpen) return
      setCardOpen(false)
    }
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls buttonName='Перейти' controlButtonHandler={callbacks.onOpenCart} >
        <div className='Cart__Description'>В корзине: <span>{cartItems.length > 0 ? `${cartItems.length} ${plural(cartItems.length, { one: 'товар', few: 'товара', many: 'товаров' })} / ${formatNumber(priceOfSelectedProducts)} ₽` : 'пусто'}</span></div>
      </Controls>
      <List list={initialListOfItems}
        typeOfList={STORE_OF_NAMES.LIST_OF_AVAILABLE_ITEMS}
        onAddItemToCart={callbacks.onAddItemToCart} />

      {isCardOpen &&
        <ModalWindow onCloseCart={callbacks.onCloseCart}>
          <Cart onDeleteItemFromCart={callbacks.onDeleteItemFromCart}
            typeOfList={STORE_OF_NAMES.LIST_OF_CART_ITEMS}
            list={cartItems}
            onCloseCart={callbacks.onCloseCart}
            onAddItemToCart={callbacks.onAddItemToCart} />
        </ModalWindow>}
    </PageLayout>
  );
}

export default App;
