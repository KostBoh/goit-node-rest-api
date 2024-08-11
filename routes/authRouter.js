import { Router } from "express";

import authControllers from "../controllers/authControllers.js";

import authenticate from "../middlewares/authenticate.js";

import validateBody from "../helpers/validateBody.js";

import { authRegisterSchema } from "../schemas/authSchemas.js";

const registerMiddleware = validateBody(authRegisterSchema);

const authRouter = Router();

authRouter.post("/register", authControllers.register);

// authRouter.post("/signup", authControllers.signup);

authRouter.post("/login", registerMiddleware, authControllers.login);

// authRouter.post("/signin", registerMiddleware, authControllers.signin);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.logout);

export default authRouter;

// signupMiddleware
