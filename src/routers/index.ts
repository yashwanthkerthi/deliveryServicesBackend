import { authentication } from "../middlewares/middlewares";
import User from "@modules/User/index";

export const routes = (app: any) => {
  app.use(`/api`, User);
};
