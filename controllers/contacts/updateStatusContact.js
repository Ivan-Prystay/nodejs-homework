const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const statusUpdated = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!statusUpdated) {
    throw new NotFound(`Contact with id ${contactId} not found!`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { result: statusUpdated },
  });
};

module.exports = updateStatusContact;
