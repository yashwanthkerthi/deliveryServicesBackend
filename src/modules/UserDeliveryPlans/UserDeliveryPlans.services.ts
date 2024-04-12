import { sequelize } from "@loaders/database";
import { UserDeliveryPlansModel } from "./UserDeliveryPlans.model";
import {
  setErrorResponse,
  getResponseMessage,
  setSuccessResponse,
} from "@services/responseServices";
import { ResponseDto } from "@dtos/reusableDtos";
import { UserPlansDTO } from "./UserDeliveryPlans.dto";

export const submitDeliveryPlan = async (
  userdeliveryPlans: UserPlansDTO,
  order_id: number,
  user_id: number
): Promise<ResponseDto> => {
  try {
    let response: ResponseDto;
    const { planName, planId } = userdeliveryPlans;

    const createCandidateInDb: any = await UserDeliveryPlansModel.create({
      plan_id: planId,
      plan_name: planName,
      user_id,
      order_id,
    });
    if (!createCandidateInDb) {
      return (response = setErrorResponse({
        statusCode: 400,
        message: getResponseMessage("REGISTRATION_FAILED"),
      }));
    }

    return (response = setSuccessResponse({
      statusCode: 200,
      message: getResponseMessage("REGISTRATION_SUCCESS"),
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
