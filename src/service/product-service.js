import Product from "../models/product-model.js";


export async function getAllProducts() {
    try {
        const products = await Product.find();
        return products;
    } catch (error) {
        console.error("Error in product-service.getAllProducts --> ", error);
        throw new Error("Failed to fetch Products");
    }
}

export async function getProductById(productId) {
    try {
        
        if (!productId) {
            throw new Error("Product Id is Invalid.")
        }
        const product = await Product.findById(productId);
    
      if (!product) {
        throw new Error("Product not found");
      }
        
      return product;
    } catch (error) {
        console.error("Error in product-service.getProductById --> ", error);
        throw new Error("Failed to get product by Id");
    }
}