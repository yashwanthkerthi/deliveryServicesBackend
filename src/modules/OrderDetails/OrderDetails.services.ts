import { sequelize } from "@loaders/database";
import { OrderDetailsModel } from "./OrderDetails.model";
import {
  setErrorResponse,
  getResponseMessage,
  setSuccessResponse,
} from "@services/responseServices";
import { ResponseDto } from "@dtos/reusableDtos";
import { OrderDetailsDTO } from "./OrderDetails.dto";

export const submitOrderDetails = async (
  orderDetails: OrderDetailsDTO,
  user_id: number
): Promise<ResponseDto> => {
  try {
    let response: ResponseDto;
    const {
      weight,
      content,
      measurement,
      shipmentPrice,
      senderName,
      recipientName,
    } = orderDetails;

    const submitOrderDetailsInDb: any = await OrderDetailsModel.create({
      weight,
      content,
      measurement,
      shipment_price: shipmentPrice,
      sender_name: senderName,
      recipient_name: recipientName,
      user_id,
    });
    if (!submitOrderDetailsInDb) {
      return (response = setErrorResponse({
        statusCode: 400,
        message: getResponseMessage("ORDER_DETAILS_SUBMISSION_FAILED"),
      }));
    }

    return (response = setSuccessResponse({
      statusCode: 200,
      message: getResponseMessage("ORDER_DETAILS_SUBMITTED"),
      // data,
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
