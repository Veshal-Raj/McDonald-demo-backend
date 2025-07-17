import { Router } from "express";
import * as cartController from "../controllers/cart-controller.js"

const cartRouter = Router();

cartRouter.post('/add', cartController.addToCart);

cartRouter.post('/remove', cartController.removeItemFromCart);

cartRouter.post('/update', cartController.updateCartItem);

cartRouter.get('/:sessionId', cartController.getCartContent);

cartRouter.post('/clear', cartController.clearCart);


export default cartRouter;