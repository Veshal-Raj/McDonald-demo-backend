import { Router } from "express";
import { carts } from "../models/index.js";
import * as cartController from "../controllers/cart-controller.js"

const cartRouter = Router();

cartRouter.post('/add', cartController.addToCard);

cartRouter.post('/remove', cartController.removeItemFromCard);

cartRouter.post('/update', cartController.updateCartItem);


cartRouter.get('/:sessionId', cartController.getCartContent);

cartRouter.post('/clear', cartController.clearCart);


export default cartRouter;