import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();

  const getItems = () => {
    return basket.reduce((total, item) => {
      total += item.quantity;
      return total;
    }, 0);
  };
  const getTotal = () => {
    return basket.reduce(
      (total, item) => total + item.price?.toFixed(2) * item.quantity,
      0
    );
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({getItems()} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />

      <button onClick={(e) => history.push("/payment")}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
