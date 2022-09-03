const router = require("express").Router();
const FilmsController = require("../controllers/FilmsController");
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
router.get("/films", FilmsController.getAll);
router.get("/films/:id", FilmsController.getOne);
router.patch("/films/:id", FilmsController.update);
router.delete("/films/:id", FilmsController.remove);

module.exports = router;
