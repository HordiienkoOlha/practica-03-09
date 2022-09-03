const { connect } = require("mongoose");

const connectDb = async () => {
  try {
    const db = await connect(process.env.MONGODB_URI);
    console.log(
      `MongoDB connected on port ${db.connection.port}, on host ${db.connection.host}, name: ${db.connection.name}`
        .cyan
    );
  } catch (err) {
    console.log(`${err}`.red);
  }
};

module.exports = connectDb;

// const Cat = mongoose.model("Cat", { name: String });

// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));
