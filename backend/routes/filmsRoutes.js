const router = require("express").Router();
const FilmsController = require("../controllers/FilmsController");
const roleMiddleware = require("../middlewares/roleMiddleware.JS");
// add
// getAll
// getOne
// update
// remove

router.post(
  "/films",
  (req, res, next) => {
    console.log("Сработал Joi");
    next();
  },
  FilmsController.add
);
router.get("/films", roleMiddleware(["ADMIN"]), FilmsController.getAll);
router.get(
  "/films/:id",
  roleMiddleware(["ADMIN", "USER"]),
  FilmsController.getOne
);
router.patch("/films/:id", FilmsController.update);
router.delete("/films/:id", FilmsController.remove);

module.exports = router;
