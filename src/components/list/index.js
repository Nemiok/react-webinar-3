import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import STORE_OF_NAMES from "../../utils/store-of-names";

function List({ list, onAddItemToCart, onDeleteItemFromCart, typeOfList }) {
  let buttonName;
  let controlButtonHandler;

  switch (typeOfList) {
    case STORE_OF_NAMES.LIST_OF_AVAILABLE_ITEMS:
      buttonName = 'Добавить'
      controlButtonHandler = onAddItemToCart
      break
    case STORE_OF_NAMES.LIST_OF_CART_ITEMS:
      buttonName = 'Удалить'
      controlButtonHandler = onDeleteItemFromCart
      break
  }

  return (
    <ul className='List'>{
      list.map(item =>
        <li key={item.code} className='List-item'>
          <Item typeOfList={typeOfList} buttonName={buttonName} item={item} controlButtonHandler={controlButtonHandler} />
        </li>
      )}
    </ul>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItemFromCart: PropTypes.func,
  onAddItemToCart: PropTypes.func,
  typeOfList: PropTypes.string.isRequired
};

List.defaultProps = {
  onDeleteItem: () => { },
  onSelectItem: () => { },
}

export default React.memo(List);
