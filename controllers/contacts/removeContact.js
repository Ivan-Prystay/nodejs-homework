const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contactDeleted = await Contact.findByIdAndRemove(contactId);
  if (!contactDeleted) {
    throw new NotFound(`Contact with id ${contactId} not found!`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: { result: contactDeleted },
  });
};

module.exports = removeContact;
