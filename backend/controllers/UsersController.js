const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const Role = require("../models/rolesModel");

class UsersController {
  // 1. Робимо валідацію данних
  // 2. Шукаємо, перевіряємо чи є такий користувач в БД
  // 3. Якщо є користувач, то видаємо помилку що є
  // 4. Якщо немає, то хешуємо пароль
  // 5. Зберігаємо користувача в БД
  // 6. Якщо не можемо зберегти - видаємо помилку
  // 7. Якщо можемо зберегти - відповідаємо json з успіхом

  register = asyncHandler(async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const isExits = await User.findOne({ userEmail });
    if (isExits) {
      res.status(400);
      throw new Error("User already exists");
    }
    const hashPassword = await bcryptjs.hash(userPassword, 10);

    const userRole = await Role.findOne({ value: "USER" });

    const candidate = await User.create({
      userName,
      userEmail,
      userPassword: hashPassword,
      roles: [userRole.value],
    });
    if (!candidate) {
      res.status(400);
      throw new Error("Unable save in BD");
    }
    res.status(201).json({
      code: 201,
      data: {
        candidate,
      },
    });
  });

  login = asyncHandler(async (req, res) => {
    // 1. Робимо валідацію данних
    // 2. Шукаємо, перевіряємо чи є такий користувач в БД
    // 3. Якщо немає, пишемо що треба зареєструватися
    // 4. Розшифровуємо пароль
    // 5. Якщо логіг і пароль валідні - генеруємо токен
    // 6. Зберігаємо користувача з токеном
    // 7. Якщо не можемо зберегти - видаємо помилку
    // 8. Якщо можемо зберегти - відповідаємо json з успіхом
    const { userName, userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const user = await User.findOne({ userEmail });
    if (!user) {
      res.status(400);
      throw new Error("You need to register");
    }
    const validPassword = await bcryptjs.compare(
      userPassword,
      user.userPassword
    );
    if (!validPassword || !user) {
      res.status(400);
      throw new Error("Invalid login or password");
    }
    const payload = {
      id: user._id,
      roles: user.roles,
    };
    const token = this.generateToken(payload);
    user.token = token;
    const userWithToken = await user.save();
    if (!userWithToken) {
      res.status(400);
      throw new Error("Can't save token");
    }
    res.status(200).json({
      code: 201,
      data: {
        user: userWithToken,
      },
    });
  });

  logout = asyncHandler(async (req, res) => {
    // 1. Знайти користувача по id з токену
    // 2.Якщо валідний токен, то користувачу ставимо токен null

    const id = req.user._id;
    const user = await User.findById(id);
    user.token = null;
    await user.save();
    res.status(200).json({
      code: 200,
      message: "Log out succsses",
    });
  });

  info = asyncHandler(async (req, res) => {
    res.send(req.user);
  });

    generateToken = (payload) => {
        const { id, roles } = payload;
    return jwt.sign({id, roles}, process.env.JWT_SECRET, { expiresIn: "8h" });
  };
}

module.exports = new UsersController();
