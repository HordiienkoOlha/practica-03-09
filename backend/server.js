const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
require("colors");
const connectDb = require("../config/db");
const app = express();

dotenv.config({
  path: path.join(__dirname, "..", "config", ".env"),
});

// console.log(
//   dotenv.config({
//     path: path.join(__dirname, "..", "config", ".env"),
//   })
// );
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/api/v1", require("./routes/filmsRoutes"));

app.use("/users", require("./routes/usersRoutes"));

app.use(require("./middlewares/badUrlError"));
app.use(require("./middlewares/errorHandler"));

const { PORT } = process.env;

(async () => {
  await connectDb();
})();

app.listen(PORT, () => {
  console.log(`Hello in backend on port ${PORT}`.cyan);
});
