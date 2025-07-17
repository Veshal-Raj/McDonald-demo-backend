import * as cartService from "../service/cart-service.js"
import * as orderService from "../service/order-service.js"

export async function createOrder(req, res) {
    try {
        const { sessionId, customerInfo } = req.body;
            
        if (!sessionId || !customerInfo) {
            return res.status(400).json({
                ok: false,
                msg: "Session ID and customer info are required"
            });
        }
        
        if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
            return res.status(400).json({
                ok: false,
                msg: "Name, email, phone, and address are required in customer info"
            });
        }
        
        const cart = await cartService.getCartBySessionId(sessionId);
            
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: "Cart is empty"
            });
        }
        
        let items = cart.items.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity
        }))
    
        const savedOrder = await orderService.createOrder(
            sessionId,
            customerInfo,
            items,
            cart.total,
            'confirmed',
            '15-20 minutes'
        );
    
        // Clear cart after successful order creation
        cart.items = [];
        cart.total = 0;
        await cart.save();
    
        return res.json({
            ok: true,
            msg: "Order Created Successfully",
            data: savedOrder
        });
    } catch (error) {
        console.error("Error in checkout process:", error);
        return res.status(500).json({
            ok: false,
            msg: "Internal server error"
        });
    }
}

