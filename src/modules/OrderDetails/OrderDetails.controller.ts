import { ResponseDto } from "@dtos/reusableDtos";
import Joi from "joi";
import { Response, Request } from "express";
import {
  setErrorResponse,
  getResponseMessage,
  sendResponse,
} from "@services/responseServices";
import * as orderDetailsServices from "./OrderDetails.services";
import { schemaValidation } from "@utils/helperFunctions";
import { OrderDetailsDTO } from "./OrderDetails.dto";

export const submitOrderDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    let response: ResponseDto;
    const orderDetails: OrderDetailsDTO = req.body;
    const user_id: number = parseInt(req.params.id);
    const schema = Joi.object().options({}).keys({
      weight: Joi.string().required(),
      content: Joi.string().required(),
      measurement: Joi.string().required(),
      shipmentPrice: Joi.string().required(),
      senderName: Joi.string().required(),
      recipientName: Joi.string().required(),
    });
    const validateResult: ResponseDto = await schemaValidation(
      orderDetails,
      schema
    );

    if (!validateResult.status) {
      response = await orderDetailsServices.submitOrderDetails(
        orderDetails,
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
