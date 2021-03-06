import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../store/order";
import { me } from "../store/auth";
import { Link } from "react-router-dom";

const Cart = () => {
  const user = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order) || { products: [] };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart(user.id));
  }, []);

  if (!order.products || order.products.length < 1) {
    return (
      <div>
        <h1>Your cart is empty!</h1>
        <Link to="/checkout">
          <button>Checkout</button>
        </Link>
      </div>
    );
  }

  if (order) {
    let total = order.products.reduce(
      (acc, flower) => (acc += flower.price * flower.lineItem.quantity),
      0
    );

    return (
      <div>
        <h3>Your Cart:</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product) => {
              return (
                <tr>
                  <td>{product.name} </td>
                  <td>{product.price}</td>
                  <td>{product.lineItem.quantity}</td>
                  <td>${product.price * product.lineItem.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h4>Total: ${total}</h4>
      </div>
    );
  }
};

export default Cart;
