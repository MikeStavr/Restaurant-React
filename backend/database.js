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
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  const dishModel = sequelize.define("menu", {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dishName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dishPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dishCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dishDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  sequelize
    .sync()
    .then(() => {
      console.log('"Menu" table successfully created.');
    })
    .catch((err) => {
      console.error("Unable to create the table:", err);
    });
  return sequelize;
};
