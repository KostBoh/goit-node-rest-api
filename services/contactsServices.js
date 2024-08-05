import Contact from "../db/models/Contact.js";
import HttpError from "../helpers/HttpError.js";

export const listContacts = () => Contact.findAll();

export const getContactById = (id) => Contact.findByPk(id);

export const removeContact = async (id) =>
  Contact.destroy({
    where: {
      id,
    },
  });

export const addContact = (data) => Contact.create(data);

export const updateById = async (id, data) =>
  Contact.update(data, {
    where: {
      id,
    },
  });

export const updateStatusContact = async (id, favorite) => {
  const [update] = await Contact.update(
    { favorite },
    {
      where: { id },
    }
  );
  if (update) {
    const updateContact = await Contact.findByPk(id);
    return updateContact;
  }
  throw HttpError(404);
};
