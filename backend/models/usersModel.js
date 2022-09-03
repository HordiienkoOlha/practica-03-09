const { model, Schema } = require("mongoose");

const userSchema = Schema(
  {
    userName: {
      type: String,
      default: "John Doe",
    },
    userEmail: {
      type: String,
      required: [true, "Mongoose: User email is required!"],
    },
    userPassword: {
      type: String,
      required: [true, "Mongoose: User password is required!"],
    },
    token: {
      type: String,
    },
    roles: [
      {
        type: String,
        ref: "role",
      },
    ],
  },

  { timestamps: true, versionKey: false }
);

module.exports = model("user", userSchema);
