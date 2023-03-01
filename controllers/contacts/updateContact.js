const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const contactUpdated = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contactUpdated) {
    throw new NotFound(`Contact with id ${contactId} not found!`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { result: contactUpdated },
  });
};

module.exports = updateContact;
