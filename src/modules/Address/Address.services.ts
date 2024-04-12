import { sequelize } from "@loaders/database";
import { userOrderAddressModel } from "./Address.model";
import {
  setErrorResponse,
  getResponseMessage,
  setSuccessResponse,
} from "@services/responseServices";

import { ResponseDto } from "@dtos/reusableDtos";
import { UserAddressDTO } from "./Address.dto";

export const submitAddress = async (
  userAddress: UserAddressDTO,
): Promise<ResponseDto> => {
  try {
    let response: ResponseDto;
    const {
      from_address,
      from_email,
      from_name,
      from_mobile_number,
      from_pincode,
      to_address ,
      to_email ,
      to_name,
      to_mobile_number,
      to_pincode,
      user_id,
    } = userAddress;

    

    const addOrderAddressInDb: any = await userOrderAddressModel.create({
      from_address,
      from_email,
      from_name,
      from_mobile_number,
      from_pincode,
      to_address,
      to_email,
      to_name,
      to_mobile_number,
      to_pincode,
      user_id,
    });
    if (!addOrderAddressInDb) {
      return (response = setErrorResponse({
        statusCode: 400,
        message: getResponseMessage("ORDER_ADDRESS_NOT_ADDED"),
      }));
    }

    return (response = setSuccessResponse({
      statusCode: 200,
      message: getResponseMessage("ORDER_ADDRESS_ADDED"),
    }));
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
