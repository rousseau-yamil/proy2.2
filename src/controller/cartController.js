import cartService from '../services/cartService.js';

export const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const cart = await cartService.getCartByUserId(userId);
    console.log({cart})
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await cartService.addProductToCart(userId, productId, quantity);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await cartService.removeProductFromCart(userId, productId);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await cartService.clearCart(userId);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
