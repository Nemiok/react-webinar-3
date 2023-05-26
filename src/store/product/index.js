import StoreModule from "../module";

class Product extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      product: {}
    }
  }

  clear() {
    this.setState({
      ...this.getState(),
      product: {}
    }, 'Товар удалён из Store');
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
    const result = await response.json();
    console.log(result)

    this.setState({
      ...this.getState(),
      product: result.result
    }, 'Загружен товар из АПИ');
  }
}

export default Product;
