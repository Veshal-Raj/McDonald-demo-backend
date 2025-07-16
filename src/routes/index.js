import { Router } from "express";
import productRouter from "./product.js";
import cartRouter from "./cart.js";
import checkoutRouter from "./checkout.js";

const apiRouter = Router();

apiRouter.use("/products", productRouter);
apiRouter.use("/cart", cartRouter);
apiRouter.use("/checkout", checkoutRouter);

export default apiRouter;