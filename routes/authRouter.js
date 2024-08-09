import { Router } from "express";

import authControllers from "../controllers/authControllers.js";

import validateBody from "../helpers/validateBody.js";

import { authSignupSchema } from "../schemas/authSchemas.js";

const signupMiddleware = validateBody(authSignupSchema);

const authRouter = Router();

authRouter.post("/signup", authControllers.signup);

export default authRouter;

// signupMiddleware
