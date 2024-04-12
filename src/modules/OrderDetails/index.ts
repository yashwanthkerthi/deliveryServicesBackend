import { Router } from "express";
import * as orderDetailsControllers from "./OrderDetails.controller";
import { authentication } from "@middleware/middlewares";
const router = Router();

router.post(
  "/addorderdetails/id",
  authentication,
  orderDetailsControllers.submitOrderDetails
);

export default router;
