module.exports = (_, res) => {
  res.status(404).json({ message: "Not found" });
};
