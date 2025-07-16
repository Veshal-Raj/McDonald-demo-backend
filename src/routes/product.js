import { Router } from "express";
import * as productController from "../controllers/product-controller.js"

const productRouter = Router();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getProductById);

export default productRouter;