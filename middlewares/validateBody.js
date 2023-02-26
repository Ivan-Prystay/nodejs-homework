const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(((error.status = 400), error));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
