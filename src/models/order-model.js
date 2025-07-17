import { Schema, model } from "mongoose";

const orderItemSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: String,
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }, { _id: false }
);

const customerInfoSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        specialInstructions: String
    }, { _id: false }
);

const orderSchema = new Schema({
        sessionId: {
            type: String,
            required: true,
            index: true
        },
        customerInfo: {
            type: customerInfoSchema,
            required: true
        },
        items: [orderItemSchema],
        total: {
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'],
            default: 'confirmed'
        },
        estimatedTime: {
            type: String,
            default: '15-20 minutes'
        },
        orderDate: {
            type: Date,
            default: Date.now
        }
    }, { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;