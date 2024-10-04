import React, { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{
    const[cartItem, setCartItem]=useState({});

    const addToCart=(id)=>{
        if(!cartItem[id]){
          setCartItem((prev) => ({...prev, [id]: 1}))
        } else{
          setCartItem((prev) => ({...prev, [id]: prev[id] + 1  }) );
        }
        }

        const removeFromCart=(id)=>{
            setCartItem((prev) => ({...prev, [id]: prev[id] - 1 }) );
          }

          const getTotalCartAmount=()=>{
            let total=0;
            for(const item in cartItem){
              if(cartItem[item] > 0) {
                let productInfo= food_list.find((product) => product._id === item);
                 total += productInfo.price*cartItem[item];
              }
            }
            return total;
          }

          // useEffect(()=>{
          //   console.log({...cartItem});

          // }, [cartItem]);

    const contextValue={
        setCartItem,
        cartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider