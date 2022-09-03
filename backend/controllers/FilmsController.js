// add
// getAll
// getOne
// update
// remove
const asyncHandler = require("express-async-handler");
const Films = require("../models/filmsModel");

class FilmsController {
  add = asyncHandler(async (req, res) => {
    if (!req.body.title) {
      res.status(400);
      throw new Error("Film title is required!");
    }

    const film = await Films.create({ ...req.body });

    if (!film) {
      res.status(400);
      throw new Error("Film save error!");
    }

    res.status(201).json({ code: 201, message: "Film created!", data: film });
  });

  getAll = asyncHandler(async (req, res) => {
    const films = await Films.find({});

    if (!films) {
      res.status(400);
      throw new Error("Failed to fetch films!");
    }

    res
      .status(200)
      .json({
        code: 200,
        message: "Films fetch success!",
        data: films,
        qty: films.length,
      });
  });

  getOne = asyncHandler(async (req, res) => {
    console.log("getOne");
  });

  update = asyncHandler(async (req, res) => {
    console.log("update");
  });

  remove = asyncHandler(async (req, res) => {
    console.log("remove");
  });
}

module.exports = new FilmsController();
