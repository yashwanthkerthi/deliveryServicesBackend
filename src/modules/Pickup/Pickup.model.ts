import { sequelize } from "@loaders/database";
import { DataTypes, ModelDefined } from "sequelize";
import { IPickupDetailsDTO, CreationIPickupDetailsDTO } from "./Pickup.dto";
import { OrderDetailsModel } from "@modules/OrderDetails/OrderDetails.model";
import { UsersModel } from "@modules/User/User.model";

export const PickupDetailsModel: ModelDefined<
  IPickupDetailsDTO,
  CreationIPickupDetailsDTO
> = sequelize.define(
  "pickupdetails",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    location: {
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
    tableName: "pickupdetails",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

OrderDetailsModel.hasOne(PickupDetailsModel, {
  foreignKey: "order_id",
  as: "orderpickupdetails",
  constraints: false,
});

PickupDetailsModel.belongsTo(OrderDetailsModel, {
  foreignKey: "order_id",
  as: "pickupdetailsoforder",
  constraints: false,
});

UsersModel.hasMany(PickupDetailsModel, {
  foreignKey: "user_id",
  as: "userpickupdetails",
  constraints: false,
});

PickupDetailsModel.belongsTo(UsersModel, {
  foreignKey: "user_id",
  as: "pickupdetailsofuser",
  constraints: false,
});
