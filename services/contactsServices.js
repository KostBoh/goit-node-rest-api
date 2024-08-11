import Contact from "../db/models/Contact.js";
import HttpError from "../helpers/HttpError.js";

export const listContacts = (query = {}, options = {}) => {
  const { page = 1, limit = 10 } = options;
  const normalizedLimit = Number(limit);
  const offset = (Number(page) - 1) * normalizedLimit;
  return Contact.findAll({
    where: query,
    offset,
    limit: normalizedLimit,
  });
};

// export const getContactById = (id) => Contact.findByPk(id);

export const getContact = (query) =>
  Contact.findOne({
    where: query,
  });

export const addContact = (data) => Contact.create(data);

// export const updateById = async (id, data) => {
//   const [update] = await Contact.update(data, {
//     where: {
//       id,
//     },
//     returning: true,
//   });

//   if (update) {
//     const updateContact = await Contact.findByPk(id);
//     return updateContact;
//   }

//   throw HttpError(404, "Not found");
// };

export const updateContact = async (query, data) => {
  const [update] = await Contact.update(data, {
    where: query,
    returning: true,
  });

  if (update) {
    const updateContact = await Contact.findOne({ where: query });
    return updateContact;
  }

  throw HttpError(404, "Not found");
};

export const removeContact = async (query) =>
  Contact.destroy({
    where: query,
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
