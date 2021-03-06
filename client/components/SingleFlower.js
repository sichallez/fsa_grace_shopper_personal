import React from "react";
import { addToCart } from "../store/order";
import { useSelector, useDispatch } from "react-redux";

const SingleFlower = (props) => {
  const flower = useSelector(({ flowers }) => {
    return flowers.find((flower) => flower.id === props.match.params.id * 1);
  });
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div>
      <div>Name: {flower.name}</div>
      <div>Category: {flower.category}</div>
      <div>Price: {flower.price}</div>
      <img src={flower.image_url} />
      <button onClick={() => dispatch(addToCart(user.id, flower))}>
        Add to cart
      </button>
      <div>Description: {flower.description}</div>
    </div>
  );
};

export default SingleFlower;
