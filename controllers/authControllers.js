import fs from "node:fs/promises";
import path from "node:path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

import { listContacts } from "../services/contactsServices.js";

const { JWT_SECRET } = process.env;
const avatarsPath = path.resolve("public", "avatars");

const register = async (req, res) => {
  const newUser = await authServices.register(req.body);
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { id, subscription } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  await authServices.updateUser({ id }, { token });

  res.json({
    token,
    email,
    subscription,
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription, id } = req.user;
  const contacts = await listContacts({ owner: id });
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { id } = req.user;
  await authServices.updateUser({ id }, { token: null });

  res.status(204).end();
};

const updateAvatar = async (req, res) => {
  const { id } = req.user;
  const { path: tempPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);

  await fs.rename(tempPath, newPath);

  const avatarURL = path.join("/avatars", filename);

  await authServices.updateUser({ id }, { avatarURL });

  res.json({
    avatarURL,
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
