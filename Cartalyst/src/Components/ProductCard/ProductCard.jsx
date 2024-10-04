import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import './ProductCard.css'
import { StoreContext } from '../../ContextApi/ContextApi'

const ProductCard = ({index, id, image, name, price, description}) => {
   
    const{cartItem, addToCart, removeFromCart}=useContext(StoreContext);  
    
  return (
    <>
     <div className="col" key={index}>
    <div className="card h-100 food-item-img-container">

      <img src={image} className="card-img-top food-item-img" alt={name} />
      {
        !cartItem[id] 
        ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="add" />
        : <div className="food-item-counter">
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="remove" />
            <p>{cartItem[id]}</p> 
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="add" />

        </div>
      }
      <div className="card-body"> 
        <h5 className="card-title">{name}</h5>
        <p className="card-text price">${price}</p>
        <p className="card-text">{description}</p>
      </div>
    </div>
  </div>
    </>
  )
}

export default ProductCard