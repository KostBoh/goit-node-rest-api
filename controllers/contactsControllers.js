import * as contactsService from "../services/contactsServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const result = await contactsService.listContacts({ owner }, { page, limit });
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsService.getContact(id, owner);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsService.removeContact({ id, owner });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({
    message: "Contact delete successfully",
  });
};

const createContact = async (req, res) => {
  const { id: owner } = req.user;
  const result = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const { id: owner } = req.user;

  if (Object.keys(body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }

  const result = await contactsService.updateContact(id, owner, body);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (typeof favorite !== "boolean") {
    throw HttpError(400, "Favorite field must be a boolean");
  }
  try {
    const updateContact = await contactsService.updateStatusContact(
      contactId,
      favorite
    );
    res.status(200).json(updateContact);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
