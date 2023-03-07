const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const { id: owner } = req.user;

  const { page = 1, limit = 10, favorite = [true, false] } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    { owner, favorite },

    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "name email -_id");

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
