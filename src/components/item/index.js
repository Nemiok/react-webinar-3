import React from "react";
import PropTypes from "prop-types";
import './style.css';
import formatNumber from "../../utils/functions/format-money";
import STORE_OF_NAMES from "../../utils/store-of-names";

function Item(props) {

  const callbacks = {
    onClickControlButton: (e) => {
      e.stopPropagation();
      props.controlButtonHandler(props.item.code);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>

      <div className='Item-title'>
        {props.item.title}
      </div>

      <div className="Item-price">
        <span>{formatNumber(props.item.price)}</span> <span>&#8381;</span>
      </div>

      {props.typeOfList === STORE_OF_NAMES.LIST_OF_CART_ITEMS &&
        <div className="Item-ProductCount">
          <span>{props.item.productCountInCart}</span><span> шт</span>
        </div>}

      <div className='Item-actions'>
        <button onClick={callbacks.onClickControlButton}>
          {props.buttonName}
        </button>
      </div>

    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  controlButtonHandler: PropTypes.func.isRequired,
  typeOfList: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired
};

Item.defaultProps = {
  onDelete: () => { },
  onSelect: () => { },
}

export default React.memo(Item);
