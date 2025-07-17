import Cart from "../models/cart-model.js";

export async function getCartBySessionId(sessionId) {
    try {
        const cart = await Cart.findOne({ sessionId });
        return cart;
    } catch (error) {
        console.error("Error in cart-service.getCart --> ", error);
        throw new Error("Failed to fetch Cart");
    }
}

export async function createCart(sessionId, items=[], total=0) {
    try {
        const cart = new Cart({
            sessionId,
            items,
            total
        })
        return cart;
    } catch (error) {
        console.error("Error in cart-service.createCart --> ", error);
        throw new Error("Failed to create Cart");
    }
}

export async function getCartBySessionIdAndUpdate(sessionId, items, total) {
    try {
        const cart = await Cart.findOneAndUpdate(
            { sessionId },
            { $set: { items: items, total: total } },
            { new: true, upsert: true }
        );
        return cart;
    } catch (error) {
        console.error("Error in cart-service.getCartBySessionIdAndUpdate --> ", error);
        throw new Error("Failed to create Cart");
    }
}
