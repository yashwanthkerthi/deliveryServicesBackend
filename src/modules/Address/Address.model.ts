import { sequelize } from "@loaders/database";
import { DataTypes, ModelDefined } from "sequelize";
import { Address, CreationAddressDTO } from "./Address.dto";
import { UsersModel } from "@modules/User/User.model";
import { OrderDetailsModel } from "@modules/OrderDetails/OrderDetails.model";

export const userOrderAddressModel: ModelDefined<Address, CreationAddressDTO> =
  sequelize.define(
    "address",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      from_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      from_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from_mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from_pincode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      to_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      to_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      to_mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      to_pincode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      to_address: {
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
      tableName: "address",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

UsersModel.hasMany(userOrderAddressModel, {
  foreignKey: "user_id",
  as: "userorderaddress",
  constraints: false,
});

userOrderAddressModel.belongsTo(UsersModel, {
  foreignKey: "user_id",
  as: "userorderaddressofusers",
  constraints: false,
});

OrderDetailsModel.hasOne(userOrderAddressModel, {
  foreignKey: "order_id",
  as: "orderdetailsofuserorder",
  constraints: false,
});

userOrderAddressModel.belongsTo(OrderDetailsModel, {
  foreignKey: "order_id",
  as: "userorderaddressorderdetails",
  constraints: false,
});
