const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(data);
    return contactsList;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const contact = contactsList.find(({ id }) => id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const index = contactsList.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      return null;
    }
    const [deletedContact] = contactsList.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
    return deletedContact;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contactsList = await listContacts();
    const newContact = {
      id: nanoid(4),
      ...body,
    };
    contactsList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactsList = await listContacts();
    const idx = contactsList.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    contactsList[idx] = { id: contactId, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
    return contactsList[idx];
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
