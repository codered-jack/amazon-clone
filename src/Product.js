import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import Noty from "noty";
import '../node_modules/noty/lib/noty.css';
import '../node_modules/noty/lib/themes/mint.css';


function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {

    new Noty({
      theme: 'mint',
      text: `<div class="noty_body"><div class="noty__container"><img src=${image}> ${title}</div></div>`,
      timeout:10000,
      animation: {
        easing: 'swing',
        speed: 500 // opening & closing animation speed
      },
      closeWith: ['click'],
  }).show();
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
