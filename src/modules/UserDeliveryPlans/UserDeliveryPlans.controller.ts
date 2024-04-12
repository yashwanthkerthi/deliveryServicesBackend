import { ResponseDto } from "@dtos/reusableDtos";
import Joi from "joi";
import { Response, Request } from "express";
import {
  setErrorResponse,
  getResponseMessage,
  sendResponse,
} from "@services/responseServices";
import * as userDeliveryPlansServices from "./UserDeliveryPlans.services";
import { schemaValidation } from "@utils/helperFunctions";
import { UserPlansDTO } from "./UserDeliveryPlans.dto";

export const submitDeliveryPlan = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    let response: ResponseDto;
    const userAddress: UserPlansDTO = req.body;
    const user_id: number = parseInt(req.params.user_id);
    const order_id: number = parseInt(req.params.order_id);
    const schema = Joi.object().options({}).keys({
      planName: Joi.string().required(),
      planId: Joi.number().required(),
    });
    const validateResult: ResponseDto = await schemaValidation(
      userAddress,
      schema
    );

    response = await userDeliveryPlansServices.submitDeliveryPlan(
      userAddress,
      user_id,
      order_id
    );
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
