import React, { useContext } from 'react'
import { StoreContext } from '../ContextApi/ContextApi';
import { food_list } from '../assets/assets';
import '../pages/Cart/Cart.css'

const CartHistory = () => {
    const { cartItem, getTotalCartAmount } =useContext(StoreContext);

  return (
    <>
    <div className="cart">
    <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Quantity</p>
            <p>Total</p>
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
                    <p>{cartItem[item._id]}</p>
                    <p>${item.price * cartItem[item._id]}</p>
                  </div>
                  <hr />
                </div>
              );
            }
          })}
        </div>
        <div className="order-total">
        <div className="order-amount">
                <b>Total : </b> &nbsp;
                <b>
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}
                </b>
              </div>
        </div>
        </div>
    </>
  )
}

export default CartHistory