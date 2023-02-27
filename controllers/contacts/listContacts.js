const Contact = require("../../models");

const listContacts = async (req, res) => {
  const result = await Contact.find();
  if (!result) {
    throw new Error("Server error");
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = listContacts;
