import { carts } from "../models/index.js";
import * as productService from "../service/product-service.js"

export async function addToCard(req, res) {
    try {
        const { sessionId, productId, quantity = 1 } = req.body;
    
        if (!sessionId || !productId) {
            return res.status(400).json({ 
                ok: false, 
                msg: "Session ID and Product ID are required"
            });
        }

        const product = await productService.getProductById(productId);
        
        if (!product) {
            return res.status(400).json({ 
                ok: false, 
                msg: "Product not found"
            });
        }

        if (!carts[sessionId]) {
            carts[sessionId] = { items: [], total: 0 };
        }

        const existingItem = carts[sessionId].items.find(item => item.productId === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            carts[sessionId].items.push({
            productId,
            quantity,
            product
            });
        }

        // Recalculate total
        carts[sessionId].total = carts[sessionId].items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);

        res.json(carts[sessionId]);
    } catch (error) {
        console.error("Error in cart-controller.addToCard --> ", error);
        return res.status(500).json({ 
            ok: false, 
            msg: "Something went wrong." 
        });
    }
}

export async function removeItemFromCard(req, res) {
    try {
        const { sessionId, productId } = req.body;
        
        if (!sessionId || !productId) {
            return res.status(400).json({ error: 'Session ID and Product ID are required' });
        }

        if (!carts[sessionId]) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        carts[sessionId].items = carts[sessionId].items.filter(item => item.productId !== productId);
        
        // Recalculate total
        carts[sessionId].total = carts[sessionId].items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);

        res.json(carts[sessionId]);
    } catch (error) {
        console.error("Error in cart-controller.addToCard --> ", error);
        return res.status(500).json({ 
            ok: false, 
            msg: "Something went wrong." 
        });
    }
}


export async function updateCartItem(req, res) {
    try {
        const { sessionId, productId, quantity } = req.body;
  
  if (!sessionId || !productId || quantity === undefined) {
    return res.status(400).json({ error: 'Session ID, Product ID, and quantity are required' });
  }

  if (!carts[sessionId]) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const item = carts[sessionId].items.find(item => item.productId === productId);
  if (!item) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }

  if (quantity <= 0) {
    carts[sessionId].items = carts[sessionId].items.filter(item => item.productId !== productId);
  } else {
    item.quantity = quantity;
  }

  // Recalculate total
  carts[sessionId].total = carts[sessionId].items.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);

  res.json(carts[sessionId]);
    } catch (error) {
        console.error("Error in cart-controller.addToCard --> ", error);
        return res.status(500).json({ 
            ok: false, 
            msg: "Something went wrong." 
        });
    }
}

export async function getCartContent(req, res) {
    try {
        const { sessionId } = req.params;
  
  if (!carts[sessionId]) {
    return res.json({ items: [], total: 0 });
  }

  res.json(carts[sessionId]);
    } catch (error) {
        console.error("Error in cart-controller.addToCard --> ", error);
        return res.status(500).json({ 
            ok: false, 
            msg: "Something went wrong." 
        });
    }
}

export async function clearCart(req, res) {
    try {
        const { sessionId } = req.body;
  
  if (!sessionId) {
    return res.status(400).json({ error: 'Session ID is required' });
  }

  carts[sessionId] = { items: [], total: 0 };
  res.json(carts[sessionId]);
    } catch (error) {
        console.error("Error in cart-controller.addToCard --> ", error);
        return res.status(500).json({ 
            ok: false, 
            msg: "Something went wrong." 
        });
    }
}