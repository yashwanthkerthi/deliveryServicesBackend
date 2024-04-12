import { Router } from "express";
import * as pickupControllers from "./Pickup.controller";
import { authentication } from "@middleware/middlewares";
const router = Router();

router.post(
  "/pickupdetails",
  authentication,
  pickupControllers.submitPickupDetails
);

export default router;
