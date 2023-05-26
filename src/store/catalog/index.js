import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
    }
  }

  /* setCurrentPage(modifier) {


    this.setState({
      ...this.getState(),
      currentPage: this.currentPage + modifier
    }, 'Изменен номер страницы');

    console.log(this.getState(), this.currentPage)
  } */

  async load(pagesCount = 0, limit = 10) {
    if (pagesCount < 0) pagesCount = 0
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${pagesCount}&fields=items(_id, title, price),count`)
    const json = await response.json()
    console.log(json)

    this.setState({
      ...this.getState(),
      list: json.result.items,
      pages: Math.floor(json.result.count / limit)
    }, 'Загружены товары из АПИ');

  }

  /* async load() {
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    console.log(json)
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
  } */
}

export default Catalog;
