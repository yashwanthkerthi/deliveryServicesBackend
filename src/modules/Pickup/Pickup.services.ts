import { sequelize } from "@loaders/database";
import {
  setErrorResponse,
  getResponseMessage,
  setSuccessResponse,
} from "@services/responseServices";
import { ResponseDto } from "@dtos/reusableDtos";
import { PickupDetailsDTO } from "./Pickup.dto";
import { PickupDetailsModel } from "./Pickup.model";

export const submitPickupDetails = async (
  pickupdetails: PickupDetailsDTO,
  order_id: number,
  user_id: number
): Promise<ResponseDto> => {
  try {
    let response: ResponseDto;
    const { date, time, location } = pickupdetails;
    const addPickupDetailsInDb: any = await PickupDetailsModel.create({
      date,
      time,
      location,
      user_id,
      order_id,
    });
    if (!addPickupDetailsInDb) {
      return (response = setErrorResponse({
        statusCode: 400,
        message: getResponseMessage("PICKUP_DETAILS_ADDED"),
      }));
    }

    return (response = setSuccessResponse({
      statusCode: 200,
      message: getResponseMessage("ADDED_PICKUP_DETAILS"),
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
