module.exports = (err, req, res, next) => {
  // console.log(res.statusCode);
  // console.log(process.env.NODE_ENV);
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  const environment = process.env.NODE_ENV === "production" ? null : err.stack;
  res.json({ message: err.message, stack: environment });
};
