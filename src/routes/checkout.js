import { Router } from "express";
import { carts } from "../models/index.js";


const checkoutRouter = Router();


checkoutRouter.post('/', (req, res) => {
  const { sessionId, customerInfo } = req.body;
  
  if (!sessionId || !customerInfo) {
    return res.status(400).json({ error: 'Session ID and customer info are required' });
  }

  const cart = carts[sessionId];
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  // Mock order creation
  const order = {
    id: Date.now(),
    sessionId,
    customerInfo,
    items: cart.items,
    total: cart.total,
    status: 'confirmed',
    estimatedTime: '15-20 minutes',
    orderDate: new Date().toISOString()
  };

  // Clear cart after checkout
  carts[sessionId] = { items: [], total: 0 };

  res.json(order);
});


export default checkoutRouter;