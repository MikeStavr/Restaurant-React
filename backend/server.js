"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./database");

const app = express();
const port = 8080;

const db = database.initdb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/upload", async (req, res) => {
  console.log(req.body);
  let menu = await db.models.menu.create(req.body);
  res.status(201).send(menu);
});

app.get("/all", async (req, res) => {
  const wholeMenu = await db.models.menu.findAll();
  res.status(200).send(wholeMenu);
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
