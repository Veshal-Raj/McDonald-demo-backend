// import { carts } from "../models/index.js";
import * as productService from "../service/product-service.js"
import Cart from "../models/cart-model.js";
import * as cartService from "../service/cart-service.js"

export async function addToCart(req, res) {
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

        // Find or create cart
        let cart = await cartService.getCartBySessionId(sessionId)
        if (!cart) {
            let items = [];
            let total = 0;
            cart = await cartService.createCart(sessionId, items, total)
        }

        // Check existing items
        const itemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId
        );

        if (itemIndex > -1) {
            // Update existing item
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Add new item with product snapshot
            cart.items.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity
            });
        }

        // Recalculate total
        cart.total = cart.items.reduce(
            (sum, item) => sum + (item.price * item.quantity), 
            0
        );

        await cart.save();
        res.status(200).json({
            ok: true,
            msg: "Added to Cart Successfully",
            data: cart
        });
    } catch (error) {
        console.error("Error in cart-controller.addToCard --> ", error);
        return res.status(500).json({ 
            ok: false, 
            msg: "Something went wrong." 
        });
    }
}

export async function removeItemFromCart(req, res) {
  try {
    const { sessionId, productId } = req.body;
    
    if (!sessionId || !productId) {
      return res.status(400).json({
        ok: false,
        msg: "Session ID and Product ID are required"
      });
    }

    const cart = await cartService.getCartBySessionId(sessionId);
    if (!cart) {
      return res.status(404).json({
        ok: false,
        msg: "Cart not found"
      });
    }

    // Find item index
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({
        ok: false,
        msg: "Product not found in cart"
      });
    }

    // Remove item and recalculate total
    cart.items.splice(itemIndex, 1);
    cart.total = cart.items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    await cart.save();
    return res.json({
      ok: true,
      msg: "Removed Item from Cart Successfully",
      data: cart
    });
  } catch (error) {
    console.error("Error in cart-controller.removeItemFromCart: ", error);
    return res.status(500).json({ 
      ok: false, 
      msg: "Internal server error" 
    });
  }
}

export async function updateCartItem(req, res) {
  try {
    const { sessionId, productId, quantity } = req.body;
    
    if (!sessionId || !productId || quantity === undefined) {
      return res.status(400).json({
        ok: false,
        msg: "Session ID, Product ID, and quantity are required"
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        ok: false,
        msg: "Quantity cannot be negative"
      });
    }

    const cart = await cartService.getCartBySessionId(sessionId);
    if (!cart) {
      return res.status(404).json({
        ok: false,
        msg: "Cart not found"
      });
    }

    const item = cart.items.find(
      item => item.productId.toString() === productId
    );
    
    if (!item) {
      return res.status(404).json({
        ok: false,
        msg: "Item not found in cart"
      });
    }

    if (quantity === 0) {
      // Remove item if quantity is zero
      cart.items = cart.items.filter(
        item => item.productId.toString() !== productId
      );
    } else {
      // Update quantity
      item.quantity = quantity;
    }

    // Recalculate total
    cart.total = cart.items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );

    await cart.save();
    return res.json({
      ok: true,
      msg: "Updated Cart Item",
      data: cart
    });
  } catch (error) {
    console.error("Error in cart-controller.updateCartItem: ", error);
    return res.status(500).json({ 
      ok: false, 
      msg: "Internal server error" 
    });
  }
}

export async function getCartContent(req, res) {
  try {
    const { sessionId } = req.params;
    
    const cart = await cartService.getCartBySessionId(sessionId);
    
    if (!cart) {
      // Return empty cart structure if not found
      return res.json({
        ok: true,
        cart: { items: [], total: 0 }
      });
    }

    return res.json({
      ok: true,
      msg: "Cart Content fetched Successfully",
      data: cart
    });
  } catch (error) {
    console.error("Error in cart-controller.getCartContent: ", error);
    return res.status(500).json({ 
      ok: false, 
      msg: "Internal server error" 
    });
  }
}

export async function clearCart(req, res) {
  try {
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({
        ok: false,
        msg: "Session ID is required"
      });
    }

    const items = [];
    const total = 0;
    const cart = await cartService.getCartBySessionIdAndUpdate(sessionId, items, total);

    return res.json({
      ok: true,
      msg: "Cart Cleared Successfully",
      data: cart
    });
  } catch (error) {
    console.error("Error in cart-controller.clearCart: ", error);
    return res.status(500).json({ 
      ok: false, 
      msg: "Internal server error" 
    });
  }
}