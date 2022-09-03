// "title",
// "year",
// "rating"
const { model, Schema } = require("mongoose");

const filmSchema = Schema(
  {
    title: { type: String, required: [true, "Title is required!"] },
    year: { type: Number, required: [true, "Year is required!"] },
    rating: { type: Number, default: 0.0 },
    lang: { type: String, enum: ["en", "ua"], default: "en" },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("film", filmSchema);
