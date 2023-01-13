"use strict";

const { Sequelize, DataTypes } = require("sequelize");

exports.initdb = () => {
  const sequelize = new Sequelize("menu_db", "root", "", {
    host: "localhost",
    dialect: "mysql",
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("Established connection.");
    })
    .catch((error) => {
      console.log("Error occurred while establishing connection: ", error);
    });
  sequelize.define("menu", {
    dishName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    dishPrice: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  sequelize
    .sync()
    .then(() => {
      console.log('Table "menu" was created successfully.');
    })
    .catch((error) => {
      console.log("Error while creating table: ", error);
    });
  return sequelize;
};
