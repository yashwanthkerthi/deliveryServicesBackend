import { sequelize } from "@loaders/database";
import {
  setErrorResponse,
  getResponseMessage,
  setSuccessResponse,
} from "@services/responseServices";
import { ResponseDto } from "@dtos/reusableDtos";
import { TrackShipmentDetailsDTO } from "./TrackShipment.dto";
import { TrackShipmentModel } from "./TrackShipment.model";

export const submitDeliveryPlan = async (
  trackShipmentDetails: TrackShipmentDetailsDTO
): Promise<ResponseDto> => {
  try {
    let response: ResponseDto;
    const { trackingId, status } = trackShipmentDetails;

    const isTrackingIdPresentInDb = await TrackShipmentModel.findOne({
      where: { tracking_id: trackingId },
    });

    if (!isTrackingIdPresentInDb) {
      return (response = setErrorResponse({
        statusCode: 400,
        message: getResponseMessage("CANNOT_FIND_TRACKING_ID"),
      }));
    }

    await TrackShipmentModel.update(
      { status: status },
      {
        where: {
          tracking_id: trackingId,
        },
      }
    );

    const data = {
      status: status,
    };

    return (response = setSuccessResponse({
      statusCode: 200,
      message: getResponseMessage("STATUS_UPDATED"),
      data,
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
