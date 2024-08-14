import express from "express";

import contactsControllers from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const createContactMiddleware = validateBody(createContactSchema);
const updateContactMiddleware = validateBody(updateContactSchema);
const updateFavoriteMiddleware = validateBody(updateFavoriteSchema);

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", contactsControllers.getOneContact);

contactsRouter.delete("/:id", contactsControllers.deleteContact);

// upload.fields([{name: "poster", maxCount: 1}, {name: "subposter", maxCount: 4}])
// upload.array("poster", 8)
contactsRouter.post(
  "/",
  upload.single("poster"),
  createContactMiddleware,
  contactsControllers.createContact
);
contactsRouter.put(
  "/:id",
  updateContactMiddleware,
  contactsControllers.updateContact
);
contactsRouter.patch(
  "/:contactId/favorite",
  updateFavoriteMiddleware,
  contactsControllers.updateStatusContact
);

export default contactsRouter;
