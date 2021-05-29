import React, { useState, useCallback, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useStateValue } from './StateProvider';
import storeProducts from './items.json';
import { getBasketTotal } from './reducer';
import { Link, useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { Redirect } from 'react-router-dom';

const COMMANDS = {
  OPEN_CART: 'open-cart',
  VIEW_CATALOGUE: 'view-catalogue',
  ADD_ITEM: 'add-item',
  REMOVE_ITEM: 'remove-item',
  CHECKOUT: 'purchase-items',
  CART_SUMMARY: 'cart-summary',
  EMPTY_CART: 'empty-cart',
  SHOW_ORDERS: 'show-orders',
};
function useAlan() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [alanInstance, setAlanInstance] = useState();
  const history = useHistory();

  const addToBasket = ({ id,title, image, price, rating },quantity) => {
    //dispatch item into data layer
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
        quantity: quantity,
      },
    });
  };
  const removeFromBasket = ({ title }) => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      title: title,
    });
  };

  const opencart = useCallback(() => {
    if (basket?.length > 0) {
      if (document.getElementById('cart_button')) {
        alanInstance.playText('Showing your shopping basket');
        document.getElementById('cart_button').click();
      } else alanInstance.playText("Sorry, I can't do it right now");
    } else alanInstance.playText('Your Cart is empty');
  }, [alanInstance, basket]);

  const viewCatalogue = useCallback(() => {
    if (document.getElementById('homepage_button')) {
      alanInstance.playText('Showing the products catalogue');
      document.getElementById('homepage_button').click();
    } else alanInstance.playText('You need to login first');
  }, [alanInstance]);

  const addItem = useCallback(
    ({ detail: { quantity, name, description} }) => {
      const item = storeProducts.find((i) =>
        i.title.toLowerCase().includes(name.toLowerCase())
      );
      // console.log(item);
      if (item == null) {
        alanInstance.playText(`I cannot find the ${name} item`);
      } else {
        var k;
        for (k = 0; k < quantity; k++) addToBasket(item,quantity);
        alanInstance.playText(
          `Added ${quantity} of the ${name} item to your cart`
        );
      }
    },
    [alanInstance, addToBasket, basket]
  );

  const removeItem = useCallback(
    ({ detail: { name } }) => {
      const entry = basket.find(
        (e) => e.title.toLowerCase() === name.toLowerCase()
      );
      if (entry == null) {
        alanInstance.playText(`I cannot find the ${name} item in your cart`);
      } else {
        removeFromBasket(entry);
        alanInstance.playText(`Removed one  ${name} item from your cart`);
      }
    },
    [alanInstance, removeFromBasket, basket]
  );

  const checkout = useCallback(() => {
    if (basket?.length > 0) {
      if (document.getElementById('checkout_button')) {
        document.getElementById('checkout_button').click();
        if (!user) alanInstance.playText('You first need to login');
        else alanInstance.playText('Proceeding to payment page');
      } else {
        opencart();
      }
    } else alanInstance.playText('Your Cart is empty');
  }, [alanInstance, basket, opencart, user]);
  const cartSummary = useCallback(() => {
    if (basket.length > 0) {
      alanInstance.playText(
        `Your cart has ${
          basket.length
        } items and Basket total is rupees ${getBasketTotal(basket)}`
      );
    } else alanInstance.playText('Your Cart is not empty');
  }, [alanInstance, basket]);
  const emptyCart = useCallback(() => {
    dispatch({
      type: 'EMPTY_BASKET',
    });
    alanInstance.playText('Your cart has been cleared');
  }, [alanInstance, basket]);
  const showOrder = useCallback(() => {
    if (document.getElementById('orders_button')) {
      document.getElementById('orders_button').click();
      alanInstance.playText('Showing Your Order History');
    } else alanInstance.playText("Sorry, I can't do it right now");
  }, [alanInstance]);

  useEffect(() => {
    window.addEventListener(COMMANDS.OPEN_CART, opencart);
    window.addEventListener(COMMANDS.VIEW_CATALOGUE, viewCatalogue);
    window.addEventListener(COMMANDS.ADD_ITEM, addItem);
    window.addEventListener(COMMANDS.REMOVE_ITEM, removeItem);
    window.addEventListener(COMMANDS.CHECKOUT, checkout);
    window.addEventListener(COMMANDS.CART_SUMMARY, cartSummary);
    window.addEventListener(COMMANDS.EMPTY_CART, emptyCart);
    window.addEventListener(COMMANDS.SHOW_ORDERS, showOrder);

    return () => {
      window.removeEventListener(COMMANDS.OPEN_CART, opencart);
      window.removeEventListener(COMMANDS.VIEW_CATALOGUE, viewCatalogue);
      window.removeEventListener(COMMANDS.ADD_ITEM, addItem);
      window.removeEventListener(COMMANDS.REMOVE_ITEM, removeItem);
      window.removeEventListener(COMMANDS.CHECKOUT, checkout);
      window.removeEventListener(COMMANDS.CART_SUMMARY, cartSummary);
      window.removeEventListener(COMMANDS.EMPTY_CART, emptyCart);
      window.removeEventListener(COMMANDS.SHOW_ORDERS, showOrder);
    };
  }, [
    opencart,
    viewCatalogue,
    addItem,
    removeItem,
    checkout,
    cartSummary,
    emptyCart,
    showOrder,
  ]);
  useEffect(() => {
    if (alanInstance != null) return;
    setAlanInstance(
      alanBtn({
        right: '30px',
        bottom: '20px',

        //key:"e4ad9bfb996c204a8b538471485a6ca52e956eca572e1d8b807a3e2338fdd0dc/stage",
        key: 'e4ad9bfb996c204a8b538471485a6ca52e956eca572e1d8b807a3e2338fdd0dc/prod',
        onCommand: ({ command, payload }) => {
          window.dispatchEvent(new CustomEvent(command, { detail: payload }));
        },
      })
    );
  }, []);
  return null;
}

export default useAlan;
