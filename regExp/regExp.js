const phoneRegExp = /^\(\d{3}\) \d{3}-\d{4}$/;
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

module.exports = { phoneRegExp, emailRegExp };
