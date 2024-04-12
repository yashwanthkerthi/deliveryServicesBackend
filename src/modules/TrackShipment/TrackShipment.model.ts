import { sequelize } from "@loaders/database";
import { UsersModel } from "@modules/User/User.model";
import { DataTypes, ModelDefined } from "sequelize";
import { ITrackShipment, CreationITrackShipmentDTO } from "./TrackShipment.dto";
import { OrderDetailsModel } from "@modules/OrderDetails/OrderDetails.model";

export const TrackShipmentModel: ModelDefined<
  ITrackShipment,
  CreationITrackShipmentDTO
> = sequelize.define(
  "trackingdetails",
  {
    tracking_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: {
        model: {
          tableName: "orderdetails",
        },
        key: "id",
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    tableName: "trackingdetails",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

UsersModel.hasMany(TrackShipmentModel, {
  foreignKey: "user_id",
  as: "usertrackingdetails",
  constraints: false,
});

TrackShipmentModel.belongsTo(UsersModel, {
  as: "trackingdetailsofuser",
  foreignKey: "user_id",
  constraints: false,
});

OrderDetailsModel.hasOne(TrackShipmentModel, {
  as: "orderdetailstrackshipment",
  foreignKey: "order_id",
  constraints: false,
});

TrackShipmentModel.belongsTo(OrderDetailsModel, {
  as: "trackshipmentoforderdetails",
  foreignKey: "order_id",
  constraints: false,
});
