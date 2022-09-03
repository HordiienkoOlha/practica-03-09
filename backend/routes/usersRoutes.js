// registration: save new user in database
// authefication: перевірка даних користувача з тими що у нас в бд
// authorization: перевірка прав доступу
// logout: видалення прав доступу

const router = require("express").Router();
const UsersController = require("../controllers/UsersController");
const authMiddleware = require("../middlewares/authMiddleware");
const { route } = require("./filmsRoutes");

router.post(
  "/register",
  (req, res, next) => {
    console.log("Спрацював Joi");
    next();
  },
  UsersController.register
);

router.post(
  "/login",
  (req, res, next) => {
    console.log("Спрацював Joi");
    next();
  },
  UsersController.login
);

router.get("/logout",authMiddleware, UsersController.logout);

router.get("/info", authMiddleware, UsersController.info);

module.exports = router;
