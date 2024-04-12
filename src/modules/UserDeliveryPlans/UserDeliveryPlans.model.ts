import { sequelize } from "@loaders/database";
import { DataTypes, ModelDefined } from "sequelize";
import { IUserPlans, CreationIUserPlansDTO } from "./UserDeliveryPlans.dto";
import { UsersModel } from "@modules/User/User.model";
import { OrderDetailsModel } from "@modules/OrderDetails/OrderDetails.model";

export const UserDeliveryPlansModel: ModelDefined<
  IUserPlans,
  CreationIUserPlansDTO
> = sequelize.define(
  "shipmentplans",
  {
    plan_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    plan_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: {
        model: {
          tableName: "users",
        },
        key: "id",
      },
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: {
        model: {
          tableName: "orderdetails",
        },
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "shipmentplans",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

UsersModel.hasMany(UserDeliveryPlansModel, {
  foreignKey: "user_id",
  as: "usersdeliveryplans",
  constraints: false,
});

UserDeliveryPlansModel.belongsTo(UsersModel, {
  foreignKey: "user_id",
  as: "usersdeliveryplansofusers",
  constraints: false,
});

UsersModel.hasOne(OrderDetailsModel, {
  foreignKey: "order_id",
  as: "userorderdetailsbyorderid",
  constraints: false,
});

OrderDetailsModel.belongsTo(UsersModel, {
  foreignKey: "order_id",
  as: "orderdetailsbyorderid",
  constraints: false,
});

