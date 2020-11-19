import React from "react";
import { useStateValue } from "./StateProvider";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "./CartOverlay.css";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
function CartOverlay() {
  const [{ showCart, basket }, dispatch] = useStateValue();
  const handleDisplayCart = () => {
    dispatch({
      type: "SHOW_CART",
      showCart: false,
    });
  };

  const addQuantity = (item) => {
    const newBasket = [...basket];
    const firtitem = newBasket.find((i) => i.id === item.id);
    if (firtitem) {
      item.quantity += 1;
      dispatch({
        type: "ADD_TO_BASKET",
        item: item,
      });
    }
  };

  const removeQuantity = (item) => {
    console.log(item.id);
    const newBasket = [...basket];
    const firtitem = newBasket.find((i) => i.id === item.id);
    console.log(firtitem);
    if (firtitem && firtitem.quantity > 1) {
      item.quantity -= 1;
      dispatch({
        type: "ADD_TO_BASKET",
        item: item,
      });
    }
  };

  const removeFromBasket = (id) => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  const getTotal = () => {
    return basket.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const clearBasket = () => {
    dispatch({
      type: "EMPTY_BASKET",
    });
  };

  return (
    <div className={`cart__overlay ${showCart ? "showCart" : ""}`}>
      <div className="cart">
        <div className="cart__header">
          <IconButton onClick={handleDisplayCart}>
            <CloseIcon />
          </IconButton>

          <h2>Your Cart </h2>
        </div>

        {basket.map((item, id) => (
          <div key={id} className="cart__body">
            <img src={item.image} alt="" />
            <div className="cart__info">
              <h2>{item.title}</h2>
              <p>₹{item.price}</p>
              <button onClick={() => removeFromBasket(item.id)}>Remove</button>
            </div>
            <div className="cart__right">
              <IconButton onClick={() => addQuantity(item)}>
                <ExpandLessIcon />
              </IconButton>
              <h2>{item.quantity}</h2>
              <IconButton onClick={() => removeQuantity(item)}>
                <ExpandMoreIcon />
              </IconButton>
            </div>
          </div>
        ))}

        {basket.length > 0 && (
          <div className="cart__footer">
            <h2>Your total: ₹{getTotal()}</h2>
            <button onClick={clearBasket}>Clear Basket</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartOverlay;
