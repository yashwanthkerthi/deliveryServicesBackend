import User from "@modules/User/index";
import addAddress from "@modules/Address/index";
import UpdateTrackStatus from "@modules/TrackShipment/index";
import UserDeliveryPlans from "@modules/UserDeliveryPlans/index";
import AddPickupPlans from "@modules/Pickup/index";
import OrderDetails from "@modules/OrderDetails/index";

export const routes = (app: any) => {
  app.use(`/api`, User);
  app.use("/api", addAddress);
  app.use("/api", UpdateTrackStatus);
  app.use("/api", UserDeliveryPlans);
  app.use("/api", AddPickupPlans);
  app.use("/api", OrderDetails);
};
