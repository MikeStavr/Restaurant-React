"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { get } = require("http");

const app = express();
const PORT = 8080;

const db = database.initdb();

app.use("/public", express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

function getId(req) {
  const id = req.params.id;
  if (/^\d+$/.test(id)) {
    return Number.parseInt(id);
  }
  throw new TypeError("Invalid id");
}

app.get("/all", async (req, res) => {
  const allDishes = await db.models.menu.findAll();
  res.status(200).send(allDishes);
});

app.delete("/delete/:id", async (req, res) => {
  const id = getId(req);
  await db.models.menu
    .destroy({
      where: {
        id,
      },
    })
    .then(() => {
      res.status(200).end();
    })
    .catch((error) => {
      res.status(400).send("Bad request on delete", error);
    });
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
  // console.log(dish);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    console.log("The file: ", file);
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    console.log("The file: ", file);
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimeType && extName) {
      console.log("File uploaded successfully" + file.originalname);
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
