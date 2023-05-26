import { memo, useCallback, useEffect, useState } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';

function Main() {

  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1);

  let productSkip = 0;

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    pages: state.catalog.pages,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Запросить 10 следующих товаров
    getFirstPage: useCallback(() => {

      setCurrentPage(1)
      productSkip = 0
      store.actions.catalog.load(productSkip)
    }, [store]),

    getNextPage: useCallback(() => {
      productSkip += 10
      setCurrentPage(prev => prev + 1)

      store.actions.catalog.load(productSkip)
    }, [store]),
    // Запросить 10 предыдущих товаров
    getPreviousPage: useCallback(() => {
      productSkip -= 10
      setCurrentPage(prev => prev - 1)
      store.actions.catalog.load(productSkip)
    }, [store]),

    getThirdPage: useCallback(() => {
      setCurrentPage(3)
      productSkip = 30
      store.actions.catalog.load(productSkip)
    }, [store]),

    getLastPage: useCallback((pages) => {
      console.log(pages)
      setCurrentPage(pages)
      productSkip = pages * 10
      store.actions.catalog.load(productSkip)
    }, [store]),

    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} />
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />

      {select.pages && <Pagination
        currentPage={currentPage}
        pages={select.pages}
        getFirstPage={callbacks.getFirstPage}
        getLastPage={callbacks.getLastPage}
        getNextPage={callbacks.getNextPage}
        getPreviousPage={callbacks.getPreviousPage}
        getThirdPage={callbacks.getThirdPage} />}
    </PageLayout>
  );
}

export default memo(Main);
