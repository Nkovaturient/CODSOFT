import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../ContextApi/ContextApi";
import { food_list } from "../../assets/assets";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import {useSnackbar} from 'notistack'

const Cart = () => {
  const { cartItem, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
   



  return (
    <>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItem[item._id] > 0) {
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={item.image} alt="img" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItem[item._id]}</p>
                    <p>${item.price * cartItem[item._id]}</p>
                    <button onClick={() => removeFromCart(item._id)}>
                      <FontAwesomeIcon icon={faDeleteLeft} />
                    </button>
                  </div>
                  <hr />
                </div>
              );
            }
          })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>+${getTotalCartAmount() === 0 ? 0 : 5}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total </b>
                <b>
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}
                </b>
              </div>
            </div>
            <button disabled={getTotalCartAmount() === 0 ? true : false}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
