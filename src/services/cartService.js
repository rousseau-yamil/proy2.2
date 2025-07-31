//import Cart from '../dao/models/cartModel.js';
import Cart from '../dao/models/newCartModel.js'

const getCartByUserId = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate('products.productId');
  return cart;
};

const addProductToCart = async (userId, productId, quantity) => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, products: [] });
  }

  const existingProduct = cart.products.find(p => p.productId.toString() === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({ productId, quantity });
  }

  await cart.save();
  return cart;
};

const removeProductFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error('Carrito no encontrado');

  cart.products = cart.products.filter(p => p.productId.toString() !== productId);
  await cart.save();
  return cart;
};

const clearCart = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error('Carrito no encontrado');

  cart.products = [];
  await cart.save();
  return cart;
};

export default {
  getCartByUserId,
  addProductToCart,
  removeProductFromCart,
  clearCart
};
