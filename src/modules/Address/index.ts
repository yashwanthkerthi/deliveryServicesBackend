import { Router } from "express";
import * as addressControllers from "./Address.controller";
import { authentication } from "@middleware/middlewares";
const router = Router();

router.post("/add-address/:id", addressControllers.submitAddress);

export default router;
