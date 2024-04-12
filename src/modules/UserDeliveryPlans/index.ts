import { Router } from "express";
import * as UserDeliveryPlansControllers from "./UserDeliveryPlans.controller";
import { authentication } from "@middleware/middlewares";
const router = Router();

router.post(
  "/signup",
  authentication,
  UserDeliveryPlansControllers.submitDeliveryPlan
);

export default router;
