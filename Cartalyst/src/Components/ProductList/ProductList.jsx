import React, { useState } from "react";
import { assets, food_list } from "../../assets/assets";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const ProductList = () => {
  const [category, setCategory] = useState("All");

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <div className="food-item-container">
        <div className="food-item-heading">
          <div className="food-item-text">
            <h2>Relish the savoury delights of the moment!</h2>
            <p>
              Choose your cravings for the day from a wide range of
              mouth-watering dishes, or a side-snack.
            </p>
          </div>
          <div className="food-item-category">
            <label htmlFor="category">Choose any category</label>
            <select name="category" id="category" onChange={handleCategory}>
              <option value="All">All</option>
              <option value="Body Cleanser">Skin Products</option>
              <option value="Rolls">Rolls</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Cosmetics">Cosmetics</option>
              <option value="Noodles">Noodles</option>
              <option value="Salad">Salad</option>
              <option value="Deserts">Desserts</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Clothes">Clothes</option>
            </select>
          </div>
        </div>
        <div className="row row-cols-3 row-cols-md-3 g-4">
          {food_list.map((item, index) => {
            if (category === "All" || category === item.category)
              return (
                <ProductCard
                  key={index}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  description={item.description}
                />
              );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductList;
