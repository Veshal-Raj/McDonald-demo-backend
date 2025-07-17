import Order from "../models/order-model.js";

export async function createOrder(
    sessionId,
    customerInfo,
    items,
    total,
    status,
    estimatedTime
) {
    try {
        const order = new Order({
            sessionId,
            customerInfo,
            items,
            total,
            status,
            estimatedTime
        });
       
        const savedOrder = await order.save();
        return savedOrder;
    } catch (error) {
        console.error("Error in order-service.createOrder --> ", error);
        throw new Error("Failed to fetch Cart");
    }
}

