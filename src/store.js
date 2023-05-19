import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния

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
   * Удаление записи по коду
   * @param code
   */
  deleteItemFromCart(code) {
    const afterVanishedProductCountFromItemArray = this.state.list.map(item => {
      if (item.code === code) {
        return {
          ...item,
          productCountInCart: 0
        }
      }
      return item
    })

    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: afterVanishedProductCountFromItemArray,
      cart: afterVanishedProductCountFromItemArray.filter(item => item.code !== code && item.productCountInCart > 0)
    })


  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
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

  addItemToCart(code) {

    const newCart = [...this.state.list]
      .map(item => {
        if (item.code === code) {
          return {
            ...item,
            productCountInCart: ++item.productCountInCart
          }
        }
        return item
      })
      .filter(item => item.productCountInCart > 0)

    this.setState({
      ...this.state,
      cart: [...newCart]
    })

  };
}

export default Store;
