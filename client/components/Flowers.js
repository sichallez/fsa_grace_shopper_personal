import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/flowers";
import { Link } from "react-router-dom";
import { addToCart } from "../store/order";

const Flowers = () => {
  //Redux hooks
  const flowers = useSelector((state) => state.flowers);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //React Hooks
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  //Helper fucntions
  function handleChange(ev) {
    setName(ev.target.value);
  }

  return (
    <div>
      <div>
        <label htmlFor="flower-category"></label>
        <select name="name" id="flower-category" onChange={handleChange}>
          <option value="rose">Roses</option>
          <option value="tulip">Tulips</option>
          <option value="orchid">Orchids</option>
        </select>
      </div>

      {/* When a category is selected, page renders flowers by the given type */}
      {name ? (
        <div>
          {flowers
            .filter((flower) => flower.category === name)
            .map((flower) => {
              return (
                <div key={flower.id}>
                  {flower.name}
                  <div>
                    <Link to={`/flower/${flower.id}`}>
                      <img src={flower.image_url} />
                    </Link>
                  </div>
                  <button onClick={() => dispatch(addToCart(user.id, flower))}>
                    Add to cart
                  </button>
                </div>
              );
            })}
        </div>
      ) : (
        <div>
          {flowers.map((flower) => {
            return (
              <div key={flower.id}>
                {flower.name}
                <div>
                  <Link to={`/flower/${flower.id}`}>
                    <img src={flower.image_url} />
                  </Link>
                </div>
                <button onClick={() => dispatch(addToCart(user.id, flower))}>
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Flowers;
