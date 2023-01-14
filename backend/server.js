"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = 8080;

const db = database.initdb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/all", async (req, res) => {
  const allDishes = await db.models.menu.findAll();
  res.status(200).send(allDishes);
});

const addDish = async (req, res) => {
  let data = {
    image: req.file.path,
    dishName: req.body.dishName,
    dishPrice: req.body.dishPrice,
    dishDescription: req.body.dishDescription,
  };
  const dish = await db.models.menu.create({
    image: data.image,
    dishName: data.dishName,
    dishPrice: data.dishPrice,
    dishDescription: data.dishDescription,
  });
  res.status(201).send(dish);
  console.log(dish);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb(
        "Error: File upload only supports the following filetypes - " +
          fileTypes
      );
    }
  },
}).single("image");

app.post("/create", upload, addDish);

// app.post("/create", async (req, res) => {
//   console.log(req.body);
//   let dish = await db.models.menu.create(req.body);
//   res.status(201).send(dish);
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
