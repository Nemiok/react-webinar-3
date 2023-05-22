function binarySearchByCode(code, productList) {
  let start = 0;
  let end = productList.length - 1;

  while (start <= end) {
    let middle = Math.floor((start + end) / 2);

    if (productList[middle].code === code) {
      return productList[middle];
    } else if (productList[middle].code < code) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }
  return -1;
}

export default binarySearchByCode