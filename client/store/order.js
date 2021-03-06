import axios from "axios";

//ACTION TYPES
const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";

//ACTION CREATORS
const _addToCart = (cart) => {
  return {
    type: ADD_TO_CART,
    cart,
  };
};

const _getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

//THUNKS
export const createCart = (userId) => {
  return async (dispatch) => {
    try {
      const cart = (await axios.post(`/api/cart/${userId}`)).data;
      dispatch(_addToCart(cart));
    } catch (e) {
      console.log(e);
    }
  };
};

export const addToCart = (userId, flower, quantity = 1) => {
  return async (dispatch) => {
    try {
      const data = await axios.post(`/api/cart/${userId}`, {
        productId: flower.id,
        quantity: quantity,
      });

      dispatch(_addToCart(data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const getCart = (userId) => {
  return async (dispatch) => {
    try {
      const cart = (await axios.get(`/api/cart/${userId}`)).data;
      dispatch(_getCart(cart));
    } catch (e) {
      console.log(e);
    }
  };
};

//REDUCER

const order = (state = {}, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_TO_CART:
      return action.cart;
    default:
      return state;
  }
};

export default order;
