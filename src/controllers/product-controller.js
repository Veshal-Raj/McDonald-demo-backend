import * as productService from "../service/product-service.js"

export async function getAllProducts(req, res) {
    try {
        const products = await productService.getAllProducts();
        res.json({ 
            ok: true, 
            msg: "Products Fetched Successfully", 
            data: products
        });
    } catch (error) {
        console.error("Error in product-controller.getAllProducts --> ", error);
        return res.status(500).json({ 
            ok: false, 
            msg: "Something went wrong." 
        });
    }
}

export async function getProductById(req, res) {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            throw new Error("Product Id is Invalid.")
        }
        
        const product = await productService.getProductById(id);
    
      if (!product) {
        return res.status(404).json({ 
            ok: false, 
            msg: "Product not found" 
        });
      }
        
      res.json(product);
    } catch (error) {
        console.error("Error in product-controller.getProductById --> ", error);
        return res.status(500).json({ 
            ok: false, 
            msg: "Something went wrong." 
        });
    }
}