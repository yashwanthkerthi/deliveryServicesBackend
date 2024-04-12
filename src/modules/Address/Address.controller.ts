import { ResponseDto } from "@dtos/reusableDtos";
import Joi from "joi";
import { Response, Request } from "express";
import {
  setErrorResponse,
  getResponseMessage,
  sendResponse,
} from "@services/responseServices";
import * as addressServices from "./Address.services";
import { schemaValidation } from "@utils/helperFunctions";
import { UserAddressDTO } from "./Address.dto";

export const submitAddress = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    let response: ResponseDto;
    const userAddress: UserAddressDTO = req.body;
    const schema = Joi.object().options({}).keys({
      from_address: Joi.string().required(),
      from_email: Joi.string().required(),
      from_name: Joi.string().email().required(),
      from_mobile_number: Joi.string().required(),
      from_pincode: Joi.string().required(),
      to_address: Joi.string().required(),
      to_email: Joi.string().required(),
      to_name: Joi.string().email().required(),
      to_mobile_number: Joi.string().required(),
      to_pincode: Joi.string().required(),
      user_id: Joi.number().required(),
    });
    const validateResult: ResponseDto = await schemaValidation(
      userAddress,
      schema
    );

    

    if (!validateResult.status) {
      response = await addressServices.submitAddress(userAddress);
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
