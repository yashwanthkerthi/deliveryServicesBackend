import { ResponseDto } from "@dtos/reusableDtos";
import Joi from "joi";
import { Response, Request } from "express";
import {
  setErrorResponse,
  getResponseMessage,
  sendResponse,
} from "@services/responseServices";
import * as pickupDetailsServices from "./Pickup.services";
import { schemaValidation } from "@utils/helperFunctions";
import { PickupDetailsDTO } from "./Pickup.dto";

export const submitPickupDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    let response: ResponseDto;
    const pickupDetails: PickupDetailsDTO = req.body;
    const order_id: number = parseInt(req.params.order_id);
    const user_id: number = parseInt(req.params.user_id);
    const schema = Joi.object().options({}).keys({
      date: Joi.string().required(),
      time: Joi.string().required(),
      location: Joi.string().required(),
    });
    const validateResult: ResponseDto = await schemaValidation(
      pickupDetails,
      schema
    );

    if (!validateResult.status) {
      response = await pickupDetailsServices.submitPickupDetails(
        pickupDetails,
        order_id,
        user_id
      );
      response = sendResponse(response);
      return res.json(response);
    }
  } catch (error) {
    let result: ResponseDto = setErrorResponse({
      statusCode: 500,
      message: getResponseMessage("SOMETHING_WRONG"),
      error: error,
      details: error,
    });
    result = sendResponse(result);
    return res.json(result);
  }
};
