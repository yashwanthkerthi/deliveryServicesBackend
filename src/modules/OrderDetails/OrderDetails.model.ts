import { sequelize } from "@loaders/database";
import { DataTypes, ModelDefined } from "sequelize";
import { CreationIorderDetailsDTO, IOrders } from "./OrderDetails.dto";
import { UsersModel } from "@modules/User/User.model";

export const OrderDetailsModel: ModelDefined<
  IOrders,
  CreationIorderDetailsDTO
> = sequelize.define(
  "orderdetails",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    measurement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sender_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipient_name: {
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
    tableName: "orderdetails",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

UsersModel.hasMany(OrderDetailsModel, {
  foreignKey: "user_id",
  as: "userorderdetails",
  constraints: false,
});

OrderDetailsModel.belongsTo(UsersModel, {
  foreignKey: "user_id",
  as: "orderdetailsofuser",
  constraints: false,
});
