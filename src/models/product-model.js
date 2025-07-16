import { Schema, model } from "mongoose";

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        category: { type: String, enum: ["Burgers", "Chicken", "Sides", "Drinks", "Desserts"] },
    }
);

const Product = model("Product", productSchema);

export default Product;