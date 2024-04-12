import { ResponseDto } from "@dtos/reusableDtos";
import Joi from "joi";
import { Response, Request } from "express";
import {
  setErrorResponse,
  getResponseMessage,
  sendResponse,
} from "@services/responseServices";
import * as trackShipmentServices from "./TrackShipment.services";
import { schemaValidation } from "@utils/helperFunctions";
import { TrackShipmentDetailsDTO } from "./TrackShipment.dto";

export const submitTrackingDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    let response: ResponseDto;
    const trackingdetails: TrackShipmentDetailsDTO = req.body;
    const schema = Joi.object().options({}).keys({
      trackingId: Joi.string().required(),
      status: Joi.string().required(),
    });
    const validateResult: ResponseDto = await schemaValidation(
      trackingdetails,
      schema
    );

    if (!validateResult.status) {
      response = sendResponse(validateResult);
      return res.json(response);
    }
    response = await trackShipmentServices.submitDeliveryPlan(trackingdetails);
    response = sendResponse(response);
    return res.json(response);
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
