import { Router } from "express";
import * as trackShipmentControllers from "./TrackShipment.controller";
import { authentication } from "@middleware/middlewares";
const router = Router();

router.post(
  "/updatetrackstatus",
  authentication,
  trackShipmentControllers.submitTrackingDetails
);

export default router;
