import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const signup = async (req, res) => {
  const newUser = await authServices.signup(req.body);
  res.status(201).json(newUser);
};

export default {
  signup: ctrlWrapper(signup),
};
