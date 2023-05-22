import { generateCode } from "./utils";
import binarySearchByCode from "./utils/functions/binary-search-for-products";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.totalSum = 0;
    this.state.totalProductInCartCount = 0;
    this.state.cart = this.state.list.filter(item => item.productCountInCart > 0);
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }]
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list
        .map(item => {
          if (item.code === code) {
            // Смена выделения и подсчёт
            return {
              ...item,
              selected: !item.selected,
              count: item.selected ? item.count : item.count + 1 || 1,
            };
          }
          // Сброс выделения если выделена
          return item.selected ? { ...item, selected: false } : item;
        })
    })
  };


  /**
   * Добавление записи в корзину по коду
   * @param code
   */
  addItemToCart(code) {
    let newTotalProductInCartCount = this.state.totalProductInCartCount;
    let newTotalSum = this.state.totalSum;
    const newList = this.state.list
      .map(item => {

        if (item.code === code) {
          newTotalSum += item.price
          if (binarySearchByCode(item.code, this.state.list).productCountInCart === 0) {
            newTotalProductInCartCount += 1
          }
          return {
            ...item,
            productCountInCart: item.productCountInCart + 1
          }
        }
        return item
      })

    const newCart = newList.filter(item => item.productCountInCart > 0)

    this.setState({
      ...this.state,
      list: newList,
      cart: newCart,
      totalProductInCartCount: newTotalProductInCartCount,
      totalSum: newTotalSum
    })
  };

  /**
 * Удаление записи из корзины по коду
 * @param code
 */
  deleteItemFromCart(code) {
    let newTotalSum = this.state.totalSum;
    let newTotalProductInCartCount = this.state.totalProductInCartCount;
    const listAfterProductRemoved = this.state.list
      .map(item => {
        if (item.code === code) {
          newTotalSum -= item.productCountInCart * item.price
          newTotalProductInCartCount -= 1
          return {
            ...item,
            productCountInCart: 0
          }
        }
        return item
      })

    const productsInCartAfterRemoval = listAfterProductRemoved.filter(item => item.code !== code && item.productCountInCart > 0)

    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: listAfterProductRemoved,
      cart: productsInCartAfterRemoval,
      totalProductInCartCount: newTotalProductInCartCount,
      totalSum: newTotalSum
    })
  };
}

export default Store;
