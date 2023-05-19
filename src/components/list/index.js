import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import STORE_OF_NAMES from "../../utils/store-of-names";

function List({ list, onAddItemToCart, onDeleteItemFromCart, typeOfList/*  onSelectItem  */ }) {
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
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item typeOfList={typeOfList} buttonName={buttonName} item={item} controlButtonHandler={controlButtonHandler} /* onSelect={onSelectItem} */ />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItemFromCart: PropTypes.func,
  onAddItemToCart: PropTypes.func,
  onSelectItem: PropTypes.func,
  typeOfList: PropTypes.string.isRequired
};

List.defaultProps = {
  onDeleteItem: () => { },
  onSelectItem: () => { },
}

export default React.memo(List);
