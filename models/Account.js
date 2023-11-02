"use strict";
const { Model, UUID, UUIDV1 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "users",
      });
      Account.belongsToMany(models.Transaction, {
        as: "acount_details",
        through: "Transaction",
      });
    }
  }
  Account.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV1,
      },
      account_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Account",
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: "accounts",
    }
  );
  return Account;
};
