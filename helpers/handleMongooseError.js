const handleMongooseError = (error, data, next) => {
  const { code, name } = error;
  console.log("name: ", name);
  console.log("code: ", code);
  /* const status = name === "MongoServerError" && code === 11000 ? 409 : 400; */
  error.status = 400; /* status; */
  next();
};

module.exports = handleMongooseError;
