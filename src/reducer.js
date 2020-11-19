export const initialState = {
  basket: [],
  user: null,
  showCart: false,
};

// Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      const item = [...state.basket].find((item) => item.id === action.item.id);

      const new_array = item
        ? [...state.basket].map((element) =>
            element.id === action.item.id
              ? { ...element, quantity: action.item.quantity }
              : element
          )
        : [...state.basket, action.item];
      return {
        ...state,
        basket: item ? [...new_array] : [...state.basket, action.item],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SHOW_CART":
      return {
        ...state,
        showCart: action.showCart,
      };

    default:
      return state;
  }
};

export default reducer;
