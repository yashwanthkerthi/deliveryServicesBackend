import jwt from "jsonwebtoken";
import { ResponseDto } from "@dtos/reusableDtos";
import {
  setErrorResponse,
  getResponseMessage,
  setSuccessResponse
} from "@services/responseServices";
import { Roles } from "@dtos/reusableDtos";

export const generateAccessToken = async (userDetails: any) => {
  const { first_name, last_name, email } = userDetails;
  const payload = {
    first_name,
    last_name,
    email,
  };
  const secretKey = process.env.JWT_SECRET_KEY;
  const tokenExpiryTime = process.env.JWT_EXPIRY;
  try {
    const jwtToken = jwt.sign(payload, secretKey, {
      expiresIn: tokenExpiryTime,
    });
    return jwtToken;
  } catch (error) {
    const result: ResponseDto = setErrorResponse({
      statusCode: 500,
      message: getResponseMessage("SOMETHING_WRONG"),
      error,
      details: error,
    });
    return result;
  }
};

export const schemaValidation = async (data: any, schema: any): Promise<ResponseDto> => {
    try {
      const options: any = {
        errors: {
          wrap: {
            label: "",
          },
        },
      };
      const { error } = await schema.validate(data, options);
      let response: ResponseDto;
      if (error && error.details) {
        response = setErrorResponse({
          statusCode: 422,
          message: error.details[0].message || getResponseMessage("VALIDATION_ERROR"),
        });
        return response;
      }
      response = setSuccessResponse({ statusCode: 200, message: getResponseMessage("VALIDATION_SUCCESS") });
      return response;
    } catch (error) {
      const response: ResponseDto = setErrorResponse({
        statusCode: 500,
        message: getResponseMessage("SOMETHING_WRONG"),
        error: error,
        details: error,
      });
      return response;
    }
  };

  export const sendRoleBits = async (role: string): Promise<ResponseDto> => {
    try {
      let response: ResponseDto;
      const admin_bits: number = 2;
      const user_bits: number = 4;
      if (Roles.ADMIN === role) {
        response = setSuccessResponse({ message: getResponseMessage("ROLE_BITS_FOUND"), data: admin_bits });
      } else if (Roles.USER === role) {
        response = setSuccessResponse({ message: getResponseMessage("ROLE_BITS_FOUND"), data: user_bits });
      } else {
        response = setErrorResponse({ message: getResponseMessage("ROlE_TYPE_REQUIRED") });
      }
      return response;
    } catch (error) {
      const result: ResponseDto = setErrorResponse({ message: getResponseMessage("SOMETHING_WRONG"), error: error });
      return result;
    }
  };