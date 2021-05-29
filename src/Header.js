import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import { PlaceOutlined as PlaceIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const getItems = () => {
    return basket.reduce((total, item) => {
      total += item.quantity;
      return total;
    }, 0);
  };

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  };

  const handleDisplayCart = () => {
    dispatch({
      type: "SHOW_CART",
      showCart: true,
    });
  };

  return (
    <div className="header">
      <div className="header__top">
        <Link to="/">
          <img
            className="header__logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            id="homepage_button"
          />
        </Link>

        <div className="header__search">
          <input className="header__searchInput" type="text" />
          <SearchIcon className="header__searchIcon" />
        </div>

        <div className="header__nav">
          <Link to={!user && "/login"}>
            <div onClick={handleAuthenticaton} className="header__option">
              <span className="header__optionLineOne">
                Hello {!user ? "Guest" : user.email}
              </span>
              <span className="header__optionLineTwo">
                {user ? "Sign Out" : "Sign In"}
              </span>
            </div>
          </Link>

          <Link to="/orders">
            <div className="header__option" id="orders_button">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
          </Link>
          <a href="https://www.primevideo.com/" target="_blank">
            <div className="header__option">
              <span className="header__optionLineOne">Your</span>
              <span className="header__optionLineTwo">Prime</span>
            </div>
          </a>

          <Link to="/checkout">
            <div
              onMouseOver={handleDisplayCart}
              className="header__optionBasket"
              id="checkout_button"
            >
              <ShoppingCartIcon />
              <span className="header__optionLineTwo header__basketCount">
                {getItems()}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="subheader">
        <div className="subheader__left hoverLn">
          <PlaceIcon className="header__optionFeature" />
          <div className="header__option">
            <span className="header__optionLineOne">Deliver to</span>
            <span className="header__optionLineTwo">India</span>
          </div>
        </div>
        <div className="subheader__right">
          <p>Today's Deals</p>
          <p>Customer Service</p>
          <p>Gift Cards</p>
          <p>Registry</p>
          <p>Sell</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
