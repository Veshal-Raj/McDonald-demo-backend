import mongoose, { Schema, model } from "mongoose";

const cartItemSchema = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        name: String, 
        price: Number,
        image: String,
        quantity: {
            type: Number,
            default: 1,
            min: 1
        }
    },
    { _id: false }
);

const cartSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const Cart = model("Cart", cartSchema);

export default Cart;