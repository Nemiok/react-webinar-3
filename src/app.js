import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ModalWindow from './components/modal-window';
import Cart from './components/cart';
import STORE_OF_NAMES from './utils/store-of-names';
import CartCounter from './components/cart-counter';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const [isCardOpen, setCardOpen] = useState(false);

  const initialListOfItems = store.getState().list;
  const cartItems = store.getState().cart;
  const totalSum = store.getState().totalSum;
  const productCount = store.getState().totalProductInCartCount;

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
      const body = document.querySelector('body')
      body.classList.add('overflow-y-hidden')
    },

    onCloseCart: () => {
      if (!isCardOpen) return
      setCardOpen(false)
      const body = document.querySelector('body')
      body.classList.remove('overflow-y-hidden')
    }
  }

  return (
    <>
      <PageLayout>
        <Head title='Магазин' />
        <CartCounter totalSum={totalSum} productCount={productCount} cartItems={cartItems} onOpenCart={callbacks.onOpenCart} />
        <List list={initialListOfItems}
          typeOfList={STORE_OF_NAMES.LIST_OF_AVAILABLE_ITEMS}
          onAddItemToCart={callbacks.onAddItemToCart} />

      </PageLayout>
      {isCardOpen &&
        <ModalWindow onCloseCart={callbacks.onCloseCart}>
          <Cart onDeleteItemFromCart={callbacks.onDeleteItemFromCart}
            typeOfList={STORE_OF_NAMES.LIST_OF_CART_ITEMS}
            list={cartItems}
            onCloseCart={callbacks.onCloseCart}
            onAddItemToCart={callbacks.onAddItemToCart} />
        </ModalWindow>}
    </>
  );
}

export default App;
