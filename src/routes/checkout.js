import { Router } from "express";
import * as orderController from "../controllers/order-controller.js";

const checkoutRouter = Router();

checkoutRouter.post('/', orderController.createOrder);

export default checkoutRouter;